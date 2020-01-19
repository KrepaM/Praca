import { Car } from './../classes';
import { Component } from '@angular/core';

@Component({
  selector: 'info-instance',
  templateUrl: './info-instance.component.html',
})

export class InfoInstance {
  car: Car;
}
