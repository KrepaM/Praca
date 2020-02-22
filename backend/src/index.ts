import express from "express";
// import web3 from "web3";
// import tx from "ethereumjs-tx";
import mysql from "mysql";

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maciej16',
  database: "vin_app",
});

// con.connect(function(err) {
//   if(err) throw err;
//   con.query("")
// });

function getInfoByVIN(VIN: string) {
  // con.connect((err) => {
  //   if (err) console.log(err);
  //   con.query("SELECT * FROM VIN_INFO WHERE VIN = '" + VIN + "'", (Err, rows, fields) => {
  //     if (Err) throw err;
  //     return rows;
  //   });
  // })
  con.query("SELECT * FROM VIN_INFO WHERE VIN = '" + VIN + "'", (Err, rows, fields) => {
    if (Err) throw Err;
    return rows;
  });
}

// const web3js = new web3('http://localhost:7545');

// const address = '0x59F35f4A874AC0184B99a34310870866cbCFd5e2';

const serverPort = 8080;
const app = express();

app.use(express.json());

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${serverPort}`);
  // web3js.eth.
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
  /*
  if (verifyVINNumber(req.body.vin)) {
    const response: Car[] = [
      {
        VIN: req.body.vin,
        carName: 'Audi',
        model: 'A4',
        yearProduction: '2004',
        weekProduction: '22',
        bodyType: 'sedan',
        color: 'red',
        engineType: 'petrol',
        gearboxType: 'manual',
        technicalCondition: 'good',
        mileage: '178000',
        date: '2011-05-06'
      },
      {
        VIN: req.body.vin,
        carName: 'Audi',
        model: 'A4',
        yearProduction: '2004',
        weekProduction: '22',
        bodyType: 'sedan',
        color: 'red',
        engineType: 'petrol',
        gearboxType: 'manual',
        technicalCondition: 'good',
        mileage: '223000',
        date: '2012-06-07'
      },
      {
        VIN: req.body.vin,
        carName: 'Audi',
        model: 'A4',
        yearProduction: '2004',
        weekProduction: '22',
        bodyType: 'sedan',
        color: 'red',
        engineType: 'petrol',
        gearboxType: 'manual',
        technicalCondition: 'good',
        mileage: '293000',
        date: '2013-12-12'
      }
    ];
    res.send(response);
  } else {
    res.send({ response: "Incorrect VIN number" });
  }
  */
  con.query("SELECT * FROM VIN_INFO WHERE VIN = '" + req.body.vin + "'", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

function verifyVINNumber(VIN: string): boolean {
  if (VIN === '0123456789QWERTYU' || VIN === undefined) {
    return false;
  }
  return true;
}
/*
function returnDictionaryValue(key: string) {
    const dictionary = {
        INCORRECT_VIN_NUMBER: "Incorrect VIN number",
        abd: "abc"
    }
    return dictionary;
}
*/


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