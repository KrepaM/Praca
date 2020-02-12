import { Car } from './../classes';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-instance',
  templateUrl: './info-instance.component.html',
})

export class InfoInstance {

  //Variables
  @Input() car: Car;
  showDetails = false;

  //Functions
  changeShowStatus() {
    this.showDetails = !this.showDetails;
  }
}
