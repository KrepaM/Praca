import { Car } from './classes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MockService {

  cars: Car[] = [
    {
      VIN: 'JTDJT923885188529',
      carName: 'Audi',
      model: 'A4',
      yearProduction: '2010',
      weekProduction: '34',
      bodyType: 'sedan',
      color: 'green',
      engineType: 'petrol',
      gearboxType: 'manual',
      technicalCondition: 'good',
      mileage: '180956',
      date: '12-06-2017'
    }
  ];

  carBrands: string[] = [
    'Abarth',
    'Acura',
    'Aixam',
    'Alfa Romeo',
    'Alpine',
    'Aro',
    'Asia',
    'Aston Martin',
    'Audi',
    'Austin',
    'Autobianchi',
    'Baic',
    'Bentley',
    'BMW',
    'Brilliance',
    'Buick',
    'Cadillac',
    'Casalini',
    'Caterham',
    'Chatnet',
    'Chevrolet',
    'Chrysler',
    'Citroën',
    'Cupra',
    'Dacia',
    'Daewoo',
    'Daihatsu',
    'De Lorean',
    'DFSK',
    'DKW',
    'Dodge',
    'DS Automobiles',
    'Ferrari',
    'Fiat',
    'Ford',
    'Galloper',
    'Gaz',
    'GMC',
    'Gonow',
    'Grecav',
    'GWM',
    'Hammer',
    'Honda',
    'Hummer',
    'Hyundai',
    'Infiniti',

    'Jaguar',
    'Kia',

    'Opel',

  ];

}
