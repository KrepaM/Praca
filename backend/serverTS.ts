class Car {
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
  responsiblePerson: string;
  hash: string;
  previousHash: string;

  constructor(
    vin: string,
    carName: string,
    model: string,
    yearProduction: string,
    weekProduction: string,
    bodyType: string,
    color: string,
    engineType: string,
    gearboxType: string,
    technicalCondition: string,
    mileage: string,
    date: string,
    responsiblePerson: string,
    hash: string,
    previousHash: string
  ) {
    this.vin = vin;
    this.carName = carName;
    this.model = model;
    this.yearProduction = yearProduction;
    this.weekProduction = weekProduction;
    this.bodyType = bodyType;
    this.color = color;
    this.engineType = engineType;
    this.gearboxType = gearboxType;
    this.technicalCondition = technicalCondition;
    this.mileage = mileage;
    this.date = date;
    this.responsiblePerson = responsiblePerson;
    this.hash = hash;
    this.previousHash = previousHash;
  }

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
      this.date == car.date &&
      this.responsiblePerson == car.responsiblePerson
    )
      return true;
    else return false;
  }
}

class Person {
  id: string;
  active: string;
  date: string;
  type: string;
  hash: string;
  previousHash: string;

  constructor(
    id: string,
    active: string,
    date: string,
    type: string,
    hash: string,
    previousHash: string
  ) {
    this.id = id;
    this.active = active;
    this.date = date;
    this.type = type;
    this.hash = hash;
    this.previousHash = previousHash;
  }

  isEqual(person: Person) {
    if (
      this.id == person.id &&
      this.active == person.active &&
      this.date == person.date &&
      this.type == person.type
    )
      return true;
    else return false;
  }
}
