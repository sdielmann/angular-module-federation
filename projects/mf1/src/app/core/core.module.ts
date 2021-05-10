import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * It is good practice to keep a CoreModule that is responsible for all one-time imports (e.g. with forRoot() calls).
 * The AppModule should only be responsible for bootstrapping the application.
 */
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
  ]
})
export class CoreModule { }
