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


function returnAddInfo(num: number) {
  if (num === 1) {
    return 'STOLEN_CAR_LABEL';
  } else if (num === 2) {
    return 'SCRAP_CAR_LABEL';
  } else if (num === 3) {
    return 'NEW_OWNER_LABEL';
  } else return 'INTERNAL_ERROR';
}

//info: 1 - stolen, 2 - scraped, 3 - new owner

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
