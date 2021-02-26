import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Commonly used modules that are likely required in most feature modules, e.g. i18n or routing. */
const modules = [
  CommonModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule { }
