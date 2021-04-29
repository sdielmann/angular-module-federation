import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => HomeModule
  }, {
    path: 'contact',
    loadChildren: () => import('contact/Module').then(m => m.ContactModule)
  }, {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
