CREATE TABLE VIN_INFO (
    VIN VARCHAR(17) NOT NULL,
    carName VARCHAR(20) NOT NULL,
    model VARCHAR(20) NOT NULL,
    yearProduction VARCHAR(4) NOT NULL,
    weekProduction VARCHAR(2) NOT NULL,
    bodyType VARCHAR(10) NOT NULL,
    color VARCHAR(10) NOT NULL,
    engineType VARCHAR(10) NOT NULL,
    gearboxType VARCHAR(10) NOT NULL,
    technicalCondition VARCHAR(10) NOT NULL,
    mileage VARCHAR(7) NOT NULL,
    date DATE NOT NULL
);