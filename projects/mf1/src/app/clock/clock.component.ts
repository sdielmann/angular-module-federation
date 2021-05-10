import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnDestroy {

  time: string;

  private readonly interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.setTime();
    }, 1000)

    this.setTime();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private setTime() {
    const d = new Date();
    this.time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }
}
