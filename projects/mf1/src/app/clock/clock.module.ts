import { Component, ComponentFactory, ComponentFactoryResolver, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock.component';



@NgModule({
  declarations: [ClockComponent],
  exports: [
    ClockComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClockModule {

  public readonly componentClassMap: Record<string, Type<any>> = {
    'app-clock': ClockComponent
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public getComponentFactory(tag: string): ComponentFactory<unknown> {
    const cType = this.componentClassMap[tag];

    if (!cType) {
      console.warn(`ClockModule: Class type for Tag ${tag} not found!`);
      return null;
    }

    return this.componentFactoryResolver.resolveComponentFactory(cType);
  }

  createComponent() {

  }
}
