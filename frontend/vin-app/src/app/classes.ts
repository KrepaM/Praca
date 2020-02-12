export class Car {
  VIN: string;
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
}

export enum BodyType {
  sedan = "sedan",
  estate = "estate",
  coupe = "coupe",
  SUV = "SUV"
}

export enum EngineType {
  petrol = "petrol",
  diesel = "diesel",
  electric = "electric",
  hybrid = "hybrid"
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
