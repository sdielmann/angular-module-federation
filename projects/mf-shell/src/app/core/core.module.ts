import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared';

/**
 * It is good practice to keep a CoreModule that is responsible for all one-time imports (e.g. with forRoot() calls).
 * The AppModule should only be responsible for bootstrapping the application.
 */
@NgModule({
  exports: [
    BrowserModule,
    SharedModule
  ]
})
export class CoreModule { }
