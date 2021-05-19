import { Directive, Injector, Input, OnInit, ViewContainerRef } from '@angular/core';
import { RemoteModuleLoader } from '../loader-service/remote-module-loader.service';


type RemoteModule = 'mf1/Clock' | 'mf1/Contact';

@Directive({
  selector: '[remoteComponentRenderer]'
})
export class RemoteComponentRenderer implements OnInit {

  @Input()
  set remoteComponentRenderer(componentName: string) {
    this._componentName = componentName;
  }

  @Input()
  set remoteComponentRendererModule(moduleName: RemoteModule) {
    this._moduleName = moduleName;
  }

  private _componentName: string;
  private _moduleName: RemoteModule;

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
      const module = await this.remoteModuleLoaderService.loadRemoteModule(this._moduleName);
      const componentFactory = this.remoteModuleLoaderService.getComponentFactory(module.ClockComponent);
      this.viewContainerRef.createComponent(componentFactory, undefined, this.injector);
    } catch (e) {
      console.error(e);
    }
  }
}
