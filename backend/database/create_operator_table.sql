CREATE TABLE VIN_APP.OPERATOR (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    id_ref VARCHAR(100) NOT NULL,
    active TINYINT NOT NULL,
    startDate DATE NOT NULL,
    FOREIGN KEY (id_ref) REFERENCES VIN_APP.INSTITUTION(id)
);