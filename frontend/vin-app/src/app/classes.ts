export class Car {
  vin: string;
  carName: string;
  model: string;
  yearProduction: string;
  weekProduction: string;
  bodyType: string;
  color: string;
  engineType: string;
  gearboxType: string;
  technicalCondition: string;
  mileage: string;
  date: string;

  isEqual(car: Car) {
    if (
      this.vin == car.vin &&
      this.carName == car.carName &&
      this.model == car.model &&
      this.yearProduction == car.yearProduction &&
      this.weekProduction == car.weekProduction &&
      this.bodyType == car.bodyType &&
      this.color == car.color &&
      this.engineType == car.engineType &&
      this.gearboxType == car.gearboxType &&
      this.technicalCondition == car.technicalCondition &&
      this.mileage == car.mileage &&
      this.date == car.date
    ) {
      return true;
    } else {
      return false;
    }
  }
}

/*
export class Person {
  id: string;
  active: string;
  date: string;
  type: string;

  isEqual(person: Person) {
    if (
      this.id == person.id &&
      this.active == person.active &&
      this.date == person.date &&
      this.type == person.type
    ) {
      return true;
    } else {
      return false;
    }
  }
}
*/
