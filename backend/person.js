var Person = /** @class */ (function() {
  function Person(id, active, date, type, hash, previousHash) {
    this.id = id;
    this.active = active;
    this.date = date;
    this.type = type;
    this.hash = hash;
    this.previousHash = previousHash;
  }
  Person.prototype.isEqual = function(person) {
    if (
      this.id == person.id &&
      this.active == person.active &&
      this.date == person.date &&
      this.type == person.type
    )
      return true;
    else return false;
  };
  return Person;
})();
