import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { RemoteModuleLoader } from './shared/remote-modules';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => HomeModule
  }, {
    path: 'contact',
    loadChildren: () => RemoteModuleLoader.loadRemoteModule('mf1/Contact', {
      manifest: 'http://localhost:4300/manifest.json',
      file: 'mf1.js'
    }).then(m => m.ContactModule)
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
