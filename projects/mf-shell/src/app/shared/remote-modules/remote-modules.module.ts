import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteComponentRenderer } from './component-renderer/remote-component-renderer.directive';



@NgModule({
  declarations: [
    RemoteComponentRenderer
  ],
  exports: [
    RemoteComponentRenderer
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class RemoteModulesModule { }
