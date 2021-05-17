import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteModulesModule } from './remote-modules';

/** Commonly used modules that are likely required in most feature modules, e.g. i18n or routing. */
const modules = [
  CommonModule,
  RemoteModulesModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule { }
