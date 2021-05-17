import { HttpClient } from '@angular/common/http';
import { Compiler, ComponentFactory, ComponentFactoryResolver, Injectable, Injector, NgModuleRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

type Scope = unknown;
type RemoteModule = any;
type Container = {
  init(shareScope: Scope): void;
  get(module: string): RemoteModule;
};

// These are global constants defined by webpack
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

export interface RemoteModuleLoadConfig {
  manifest: string;
  file: string;
}

@Injectable({
  providedIn: 'root'
})
export class RemoteModuleLoader {

  static get instance(): RemoteModuleLoader {
    return RemoteModuleLoader._instance;
  }

  protected readonly _defaultScopedInitialize: Promise<void>;
  protected _isDefaultScopedInitialized = false;

  private static _instance: RemoteModuleLoader;
  private _manifestRequestCacheMap = new Map<string, Observable<any>>();
  private _scriptLoadCacheMap = new Map<string, Promise<void>>();
  private _containerRegistry = new Map<string, Container>();
  private _moduleRegistry = new Map<string, Promise<RemoteModule>>();
  private _ngModuleRegistry = new Map<Type<unknown>, NgModuleRef<unknown>>();

  constructor(
    private _http: HttpClient,
    private _compiler: Compiler,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    if (RemoteModuleLoader.instance) {
      throw new Error('RemoteModuleLoader has already been created. This class should be a singleton!');
    }
    RemoteModuleLoader._instance = this;
    this._defaultScopedInitialize = this.initWebpackShareScope();
  }

  /**
   * Load and return a remote module instance. Automatically adds the required script to the DOM, initializes the webpack sharing and
   * creates a module instance which is returned. Static method is required for use in Angular Routing.
   *
   * @param module: The module name separated by a slash (as used in import statements, e.g. "remote/module")
   * @param config: Info where to find the module (manifest and file name)
   */
  static async loadRemoteModule(module: string, config: RemoteModuleLoadConfig) {
    return this.instance.loadRemoteModule(module, config);
  }

  /**
   * Load and return a remote module instance. Automatically adds the required script to the DOM, initializes the webpack sharing and
   * creates a module instance which is returned.
   *
   * @param module: The module name separated by a slash (as used in import statements, e.g. "remote/module")
   * @param config: Info where to find the module (manifest and file name)
   */
  async loadRemoteModule(module: string, config: RemoteModuleLoadConfig): Promise<RemoteModule> {

    if (!config || !config.manifest || !config.file || !module) {
      return Promise.reject('RemoteModuleLoader: Load config incomplete. Please make sure all properties are defined.');
    }

    if (this._moduleRegistry.has(module)) {
      return await this._moduleRegistry.get(module);
    }

    const promise = new Promise<RemoteModule>((async (resolve, reject) => {
      console.log(`RemoteModuleLoaderService: Loading remote module "${module}"...`);

      try {
        // Try to resolve the real, hashed URL by using its manifest
        const url = await this.getScriptSrcFromManifest(config.manifest, config.file);

        // Add the script to the DOM
        await this.loadScriptTag(url);

        // Initialize the webpack module container
        const moduleInstance = await this.initRemoteModule(module);
        console.log(`RemoteModuleLoaderService: Module "${module}" successfully created.`);
        return resolve(moduleInstance);
      } catch (e) {
        return reject(e);
      }
    }))

    this._moduleRegistry.set(module, promise);
    return promise;
  }

  /**
   * Compile and create an instance of the Angular module.
   *
   * @param module: A reference to the NgModule type
   * @param injector: The parent injector (optional)
   * @protected
   */
  async getNgModuleInstance(module: Type<unknown>, injector: Injector = null) {
    if (this._ngModuleRegistry.has(module)) {
      return this._ngModuleRegistry.get(module);
    }

    const moduleFactory = await this._compiler.compileModuleAsync(module);
    const moduleInstance = moduleFactory.create(injector);
    this._ngModuleRegistry.set(module, moduleInstance);
    return moduleInstance;
  }

  /**
   * Get the factory for a given component by its type.
   *
   * @param component: The component type.
   */
  getComponentFactory(component: Type<unknown>): ComponentFactory<unknown> {
    return this._componentFactoryResolver.resolveComponentFactory(component);
  }

  /**
   * Initialize the default shared scope for webpack module federation. Only needs to be run once.
   *
   * @protected
   */
  protected async initWebpackShareScope() {
    if (!this._isDefaultScopedInitialized) {
      console.debug('RemoteModuleLoader: Initializing webpack sharing default scope.');
      await __webpack_init_sharing__('default');
      this._isDefaultScopedInitialized = true;
      console.debug('RemoteModuleLoader: Sharing scope initialized.');
    }
  }

  /**
   * Add the script tag with a given src to the DOM if not available yet.
   *
   * @param src: The script source url
   * @protected
   */
  protected async loadScriptTag(src: string): Promise<void> {
    if (!this._scriptLoadCacheMap.has(src)) {
      const p = new Promise<void>(((resolve, reject) => {
        const script = document.createElement('script') as HTMLScriptElement;
        script.onerror = (err) => reject(err);
        script.onload = () => resolve();
        script.src = src;
        document.body.appendChild(script);
        console.log('RemoteModuleLoader: Added remote module script tag to DOM: ', script);
      }));

      this._scriptLoadCacheMap.set(src, p);

      return p;
    } else {
      return this._scriptLoadCacheMap.get(src);
    }
  }

  /**
   * Initialize the remote webpack module dynamically. This has to be done after the script has been loaded in the DOM. Normally, webpack
   * can handle this itself, but not when the script is loaded dynamically into the DOM at runtime.
   *
   * @param module: The webpack remote module, separated by a slash (e.g. 'scope/module')"
   * @protected
   */
  protected async initRemoteModule(module: string): Promise<RemoteModule> {
    let container: Container;
    const scope = module.split('/')[0];
    const moduleName = './' + module.split('/')[1];

    try {
      /* Dynamically initialize remote module container.
       * See https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers for details. */
      await this._defaultScopedInitialize;

      // Get the module container
      if (this._containerRegistry.has(scope)) {
        container = this._containerRegistry.get(scope);
        console.debug(`RemoteModuleLoaderService: Re-using existing container for scope "${scope}".`);

      } else {
        console.debug(`RemoteModuleLoaderService: Initializing container for scope "${scope}"...`);
        container = window[scope] as Container;

        if (!container) {
          return Promise.reject(`RemoteModuleLoaderService: Container for scope ${scope} is not available in the global window \
object. Has the remote script file been loaded already?`)
        }

        this._containerRegistry.set(scope, container);
        container.init(__webpack_share_scopes__.default);
        console.debug(`RemoteModuleLoaderService: Successfully initialized container "${scope}".`);
      }

      const moduleFactory = await container.get(moduleName);
      return Promise.resolve(moduleFactory());
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Load the manifest from the remote server and locate the "real" hashed script url inside the manifest.
   *
   * @param manifestUrl: Where to load the manifest
   * @param file: The (un-hashed) filename
   * @protected
   */
  protected async getScriptSrcFromManifest(manifestUrl: string, file: string): Promise<string | null> {
    if (!manifestUrl || !file) {
      return Promise.reject(new Error('manifestUrl or filename has not been provided!'));
    }

    if (!this._manifestRequestCacheMap.has(manifestUrl)) {
      const req = this._http.get(manifestUrl).pipe(shareReplay({bufferSize: 1, refCount: false}));
      this._manifestRequestCacheMap.set(manifestUrl, req);
    }

    // Try to load manifest and get the real, hashed URL
    try {
      const manifest = await this._manifestRequestCacheMap.get(manifestUrl).toPromise() as { [key: string]: string };

      if (!manifest[file]) {
        return Promise.reject(new Error(`Manifest did not contain information for file ${file}!`));
      }

      return manifest[file];
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
