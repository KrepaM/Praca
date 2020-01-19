var Car = /** @class */ (function() {
  function Car(
    vin,
    carName,
    model,
    yearProduction,
    weekProduction,
    bodyType,
    color,
    engineType,
    gearboxType,
    technicalCondition,
    mileage,
    date,
    responsiblePerson,
    hash,
    previousHash
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
  Car.prototype.isEqual = function(car) {
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
  };
  return Car;
})();
