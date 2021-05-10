import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClockModule } from '../clock/clock.module';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
]

@NgModule({
  declarations: [
    ContactComponent
  ],
  exports: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ClockModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactModule { }
