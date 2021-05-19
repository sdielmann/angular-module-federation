import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => HomeModule
  }, {
    path: 'contact',
    loadChildren: () => import('mf1/Contact').then(m => m.ContactModule)
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
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
