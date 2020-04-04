import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Dictionary } from "./dictionary";

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maciej16',
  database: "vin_app",
});

const hashedPassword = "9f01b4bc5b32af8161d79b1363c7e012";

const carsModels = new Dictionary();

const serverPort = 8080;
const app = express();

app.use(express.json());

// Start server

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${serverPort}`);
});

// Routing

app.get("/", (req: any, res) => {
  res.send('Hello');
});

app.post("/getInfoByVIN", (req, res) => {
  if (validVINNumber(req.body.vin)) {
    const response: { info: any[], addInfo: any[] } = { info: undefined, addInfo: undefined };
    con.query("SELECT * FROM VIN_INFO WHERE VIN = '" + req.body.vin + "'", (err, rows, fields) => {
      if (err) throw err;
      response.info = rows;
    });
    con.query("SELECT * FROM OTHER_INFO WHERE VIN = '" + req.body.vin + "'", (err, rows, fields) => {
      if (err) throw err;
      response.addInfo = rows;
      res.send(response);
    });
  } else {
    const response: { statement: string } = { statement: "VIN_NUMBER_NOT_FOUND_WARNING_LABEL" };
    res.send(response);
  }
});

app.post("/sendIdentifier", (req, res) => {
  if (req.body.identifier && req.body.identifier.length > 5 && validIdentifier(req.body.identifier)) {
    const response: { auth: boolean, token: any } = { auth: true, token: generateToken(req.body.identifier.toString()) };
    res.send(response);
  } else {
    const response = { errorDescription: "INCORRECT_IDENTIFIER_ERROR" };
    res.send(response);
  }
});

app.post("/saveNewEntity", (req, res) => {
  if (validToken(req.body.token)) {
    if (validEntity(req.body.car)) {
      console.log("ABC");
    } else {
      const response = { errorDescription: "INCORRECT_DATA_DEPLOYED_ERROR" }; // czy nie zwracac listy błedów -> jak starczy czasu i bedzie brakowac stron
      res.send(response);
    }
  } else {
    const response = { errorDescription: "INCORRECT_IDENTIFIER_ERROR" };
    res.send(response);
  }
});

app.post("/getCarsName", (req, res) => {
  if (validToken(req.body.token)) {
    const response = { carNames: getAllCarsName() };
    res.send(response);
  } else {
    const response = { errorDescription: "INVALID_TOKEN" };
    res.send(response);
  }
});

app.post("/getCarModels", (req, res) => {
  if (validToken(req.body.token)) {
    const response = { carName: req.body.carName, models: getAllCarModels(req.body.carName) };
    res.send(response);
  } else {
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
      date: string;}"};
    res.send(response);
  } else {
    const response = { errorDescription: "INVALID_TOKEN" };
    res.send(response);
  }
});

// Functions

function validToken(token: any) {
  if (token === undefined || token == null) return false;
  let payload;
  try {
    payload = jwt.verify(token, hashedPassword);
  } catch (e) {
    return false;
  }
  return true;
}

function validVINNumber(vin: string) { // nie sprawdza sumy kontrolnej
  if (vin === undefined || vin === null) return false;
  const re = RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
  return vin.match(re);
}

function validIdentifier(id: string) {
  return true;
}

function generateToken(id: string) {
  return jwt.sign({ id }, hashedPassword, { expiresIn: 1200 });
}

function getAllCarsName() {
  const names: string[] = [];
  for (const n of carsModels.carNamesAndModels) {
    names.push(n.carName);
  }
  return names;
}

function getAllCarModels(name: string) {
  for (const n of carsModels.carNamesAndModels) {
    if (n.carName === name) return n.models;
  }
  return [];
}

function validEntity(car: Car) {
  if (validVINNumber(car.VIN)
    && validCarNameModel(car.carName, car.model)
    && validYearProduction(car.yearProduction)
    && validWeekProduction(car.weekProduction)
    && validBodyType(car.bodyType)
    && validEngineType(car.engineType)
    && validGearBox(car.gearboxType)
    && validTechnicalCondition(car.technicalCondition)) {
    return true;
  } else {
    return false;
  }
}

function validCarNameModel(name: string, model: string) {
  if (name === undefined || name === null || model === undefined || model === null) return false;
  for (const n of carsModels.carNamesAndModels) {
    if (n.carName === name) {
      for (const q of n.models) {
        if (q === model) return true;
      }
      return false;
    }
  }
  return false;
}

function validCarName(name: string) {
  if (name === undefined || name === null) return false;
  for (const n of carsModels.carNamesAndModels) {
    if (n.carName === name) return true;
  }
  return false;
}

function validModelName(name: string, models: string[]) {
  if (name === undefined || name === null) return false;
  for (const n of models) {
    if (n === name) return true;
  }
  return false;
}

function validYearProduction(year: string) {
  if (year === undefined || year === null) return false;
  return true;
}

function validWeekProduction(week: string) {
  if (week === undefined || week === null) return false;
  return true;
}

function validBodyType(body: string) {
  if (body === undefined || body === null) return false;
  return true;
}

function validEngineType(engine: string) {
  if (engine === undefined || engine === null) return false;
  return true;
}

function validGearBox(gearbox: string) {
  if (gearbox === undefined || gearbox === null) return false;
  return true;
}

function validTechnicalCondition(condition: string) {
  if (condition === undefined || condition === null) return false;
  return true;
}


class Car {
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