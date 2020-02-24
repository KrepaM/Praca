import express from "express";
import mysql from "mysql";

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maciej16',
  database: "vin_app",
});

const serverPort = 8080;
const app = express();

app.use(express.json());

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${serverPort}`);
});

app.get("/", (req: any, res) => {
  res.send('Hello');
});

app.post("/saveNewInfo", (req, res) => {
  if (verifyVINNumber(req.body.vin)) {

    res.send({ response: "Added new info" });
  } else {
    res.send({ response: "Incorrect VIN number" });
  }
});

app.post("/getInfoByVIN", (req, res) => {
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
});

function verifyVINNumber(VIN: string): boolean {
  if (VIN === '0123456789QWERTYU' || VIN === undefined) {
    return false;
  }
  return true;
}

function verifyVIN(vin: string): boolean {
  if (vin.length !== 17) {
    return false;
  }
  const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 0, 7, 0, 9, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  vin = vin.replace("-", "");
  vin = vin.replace(" ", "");
  vin = vin.toUpperCase();
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const c = vin[i];
    let value = 0;
    const weigth = weights[i];
    if (c >= "A" && c <= "Z") {
      value = values[returnIndex(c, "A")];
      if (value === 0) {
        return false;
      }
    } else if (c >= "0" && c <= "9") {
      value = returnIndex(c, "0");
    } else {
      return false;
    }
    sum += weigth * value;
  }
  sum = sum % 11;
  const check = vin[8];
  if (sum === 10 && check === "X") {
    return true;
  } else if (sum === transliterate(check)) {
    return true;
  } else {
    return false;
  }
}

function returnIndex(char1: string, char2: string) {
  let firstIndex = 0;
  let secondIndex = 0;
  const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === char1) {
      firstIndex = i;
    }
    if (letters[i] === char2) {
      secondIndex = i;
    }
  }
  return firstIndex - secondIndex;
}

function transliterate(check: string) {
  if (check === "A" || check === "J") return 1;
  if (check === "B" || check === "K" || check === "S") return 2;
  if (check === "C" || check === "L" || check === "T") return 3;
  if (check === "D" || check === "M" || check === "U") return 4;
  if (check === "E" || check === "N" || check === "V") return 5;
  if (check === "F" || check === "W") return 6;
  if (check === "G" || check === "P" || check === "X") return 7;
  if (check === "H" || check === "Y") return 8;
  if (check === "R" || check === "Z") return 9;
  return -1;
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

// npm run start