import { AfterViewInit, Compiler, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'mf-shell';

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  constructor(private compiler: Compiler,
              private injector: Injector) {}

  ngAfterViewInit() {
    this.loadComponent().then();
  }

  async loadComponent() {
    try {
      const module = await import('mf1/Clock');
      console.log(module);
      console.log(module.ClockModule);
      const moduleFactory = await this.compiler.compileModuleAsync(module.ClockModule);
      console.log(moduleFactory);
      const moduleRef = moduleFactory.create(this.injector);
      // @ts-ignore
      const componentFactory = moduleRef.instance.resolveClockComponent();
      console.log(componentFactory);
      this.vc.createComponent(componentFactory, undefined, this.injector);
    } catch (e) {
      console.error(e);
    }
  }
}
