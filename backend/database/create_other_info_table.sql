CREATE TABLE VIN_APP.OTHER_INFO (
    vin VARCHAR(17) NOT NULL,
    info TINYINT NOT NULL,
    date DATE NOT NULL,
    place VARCHAR(100)
);

--info: 1 - stolen, 2 - scraped, 3 - new owner