import { NgModule } from '@angular/core';
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
export class ClockModule {}
