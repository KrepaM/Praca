"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dictionary_1 = require("./dictionary");
const con = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maciej16',
    database: "vin_app",
});
const hashedPassword = "9f01b4bc5b32af8161d79b1363c7e012";
const carsModels = new dictionary_1.Dictionary();
const serverPort = 8080;
const app = express_1.default();
app.use(express_1.default.json());
// Start server
app.listen(serverPort, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${serverPort}`);
});
// Routing
app.get("/", (req, res) => {
    res.send('Hello');
});
app.post("/getInfoByVIN", (req, res) => {
    if (validVINNumber(req.body.vin)) {
        const response = { info: undefined, addInfo: undefined };
        con.query("SELECT * FROM VIN_INFO WHERE VIN = '" + req.body.vin + "'", (err, rows, fields) => {
            if (err)
                throw err;
            response.info = rows;
        });
        con.query("SELECT * FROM OTHER_INFO WHERE VIN = '" + req.body.vin + "'", (err, rows, fields) => {
            if (err)
                throw err;
            response.addInfo = rows;
            res.send(response);
        });
    }
    else {
        const response = { statement: "VIN_NUMBER_NOT_FOUND_WARNING_LABEL" };
        res.send(response);
    }
});
app.post("/sendIdentifier", (req, res) => {
    console.log(req.body.identifier);
    if (req.body.identifier && req.body.identifier.length > 5 && validIdentifier(req.body.identifier)) {
        const response = { auth: true, token: generateToken(req.body.identifier.toString()) };
        res.send(response);
    }
    else {
        const response = { errorDescription: "INCORRECT_IDENTIFIER_ERROR" };
        res.send(response);
    }
});
app.post("/saveNewEntity", (req, res) => {
    if (validToken(req.body.token)) {
        if (validEntity(req.body.car)) {
            console.log("ABC");
        }
        else {
            const response = { errorDescription: "INCORRECT_DATA_DEPLOYED_ERROR" }; // czy nie zwracac listy błedów -> jak starczy czasu i bedzie brakowac stron
            res.send(response);
        }
    }
    else {
        const response = { errorDescription: "INCORRECT_IDENTIFIER_ERROR" };
        res.send(response);
    }
});
app.post("/getCarsName", (req, res) => {
    if (validToken(req.body.token)) {
        const response = { carNames: getAllCarsName() };
        res.send(response);
    }
    else {
        const response = { errorDescription: "INVALID_TOKEN" };
        res.send(response);
    }
});
app.post("/getCarModels", (req, res) => {
    if (validToken(req.body.token)) {
        const response = { carName: req.body.carName, models: getAllCarModels(req.body.carName) };
        res.send(response);
    }
    else {
        const response = { errorDescription: "INVALID_TOKEN" };
        res.send(response);
    }
});
app.post("/correctCarObject", (req, res) => {
    if (validToken(req.body.token)) {
        const response = {
            carDefinition: "car: { \
      VIN: string;\
      carName: string;\
      model: string;\
      yearProduction: string;\
      weekProduction: string;\
      bodyType: string;\
      color: string;\
      engineType: string;\
      gearboxType: string;\
      technicalCondition: string;\
      mileage: string;\
      date: string;}"
        };
        res.send(response);
    }
    else {
        const response = { errorDescription: "INVALID_TOKEN" };
        res.send(response);
    }
});
// Functions
function validToken(token) {
    if (token === undefined || token == null)
        return false;
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, hashedPassword);
    }
    catch (e) {
        return false;
    }
    return true;
}
function validVINNumber(vin) {
    if (vin === undefined || vin === null)
        return false;
    const re = RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
    return vin.match(re);
}
function validIdentifier(id) {
    return true;
}
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ id }, hashedPassword, { expiresIn: 120 });
}
function getAllCarsName() {
    const names = [];
    for (const n of carsModels.carNamesAndModels) {
        names.push(n.carName);
    }
    return names;
}
function getAllCarModels(name) {
    for (const n of carsModels.carNamesAndModels) {
        if (n.carName === name)
            return n.models;
    }
    return [];
}
function validEntity(car) {
    if (validVINNumber(car.VIN)
        && validCarNameModel(car.carName, car.model)
        && validYearProduction(car.yearProduction)
        && validWeekProduction(car.weekProduction)
        && validBodyType(car.bodyType)
        && validEngineType(car.engineType)
        && validGearBox(car.gearboxType)
        && validTechnicalCondition(car.technicalCondition)) {
        return true;
    }
    else {
        return false;
    }
}
function validCarNameModel(name, model) {
    if (name === undefined || name === null || model === undefined || model === null)
        return false;
    for (const n of carsModels.carNamesAndModels) {
        if (n.carName === name) {
            for (const q of n.models) {
                if (q === model)
                    return true;
            }
            return false;
        }
    }
    return false;
}
function validCarName(name) {
    if (name === undefined || name === null)
        return false;
    for (const n of carsModels.carNamesAndModels) {
        if (n.carName === name)
            return true;
    }
    return false;
}
function validModelName(name, models) {
    if (name === undefined || name === null)
        return false;
    for (const n of models) {
        if (n === name)
            return true;
    }
    return false;
}
function validYearProduction(year) {
    if (year === undefined || year === null)
        return false;
    return true;
}
function validWeekProduction(week) {
    if (week === undefined || week === null)
        return false;
    return true;
}
function validBodyType(body) {
    if (body === undefined || body === null)
        return false;
    return true;
}
function validEngineType(engine) {
    if (engine === undefined || engine === null)
        return false;
    return true;
}
function validGearBox(gearbox) {
    if (gearbox === undefined || gearbox === null)
        return false;
    return true;
}
function validTechnicalCondition(condition) {
    if (condition === undefined || condition === null)
        return false;
    return true;
}
class Car {
}
/*SQL TODO:
  -dodać kolumne identyfikator
  -każdy kto będzie chciał dodać nową encję:
    *podaje w pierwszym połączeniu swój identyfikator
    *jeśli jest prawidłowy system zwraca token
    *użytkownik wysyła dane
    *weryfikacja VIN
    *weryfikacja danych
    *potwierdzenie danych
    *koniec


*/
// npm run start
// https://en.it1352.com/article/377cb1a815894df69e8143a45246ce0f.html
//# sourceMappingURL=index.js.map