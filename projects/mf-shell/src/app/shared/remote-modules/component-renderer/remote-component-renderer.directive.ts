import { Directive, Injector, Input, OnInit, ViewContainerRef } from '@angular/core';
import { RemoteModuleLoader } from '../loader-service/remote-module-loader.service';


@Directive({
  selector: '[remoteComponentRenderer]'
})
export class RemoteComponentRenderer implements OnInit {

  @Input()
  set remoteComponentRenderer(tag: string) {
    this._componentTag = tag;
  }

  @Input()
  set remoteComponentRendererManifest(manifestUrl: string) {
    this._manifestUrl = manifestUrl;
  }

  @Input()
  set remoteComponentRendererModuleFile(moduleFile: string) {
    this._moduleFile = moduleFile;
  }

  private _componentTag: string;
  private _manifestUrl: string;
  private _moduleFile: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private remoteModuleLoaderService: RemoteModuleLoader
  ) {}

  ngOnInit() {
    return this.renderComponent();
  }

  private async renderComponent() {
    try {
      const module = await this.remoteModuleLoaderService.loadRemoteModule('mf1/Clock', {
        manifest: this._manifestUrl,
        file: this._moduleFile
      });
      const componentFactory = this.remoteModuleLoaderService.getComponentFactory(module.ClockComponent);
      this.viewContainerRef.createComponent(componentFactory, undefined, this.injector);
    } catch (e) {
      console.error(e);
    }
  }
}
