import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RemoteModuleLoader {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  /**
   * Load a remote module. They cannot be imported with a variable like 'await import(variable)' due to webpack restrictions.
   *
   * @param name: The import name, separated by a slash (e.g. 'scope/module');
   */
  async loadRemoteModule(name: string) {
    const scope = name.split('/')[0];
    const moduleName = name.split('/')[1];

    /* This returns the ES6 module factory from the global window object. Webpack has already taken care of loading and initializing the
     module container. We just need to create a module instance by calling the factory.*/
    const moduleFactory = await window[scope].get('./' + moduleName);
    return moduleFactory()
  }

  /**
   * Get the factory for a given component by its type.
   *
   * @param component: The component type.
   */
  getComponentFactory(component: Type<unknown>): ComponentFactory<unknown> {
    return this._componentFactoryResolver.resolveComponentFactory(component);
  }

}
