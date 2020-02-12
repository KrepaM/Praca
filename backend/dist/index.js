"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const cors = require('cors');
// import path from "path";
// import * as routes from "./routes";
// import bodyParser from "body-parser";
const port = 8080;
const app = express_1.default();
// Configure Express to parse JSON
app.use(express_1.default.json());
// app.use(bodyParser);
// Configure Express to serve static files in the public folder
// app.use(express.static(path.join(__dirname, "public")));
// Configure routes
// routes.register( app );
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
app.get("/", (req, res) => {
    // res.render("index");
    res.send('Hello');
});
app.post("/saveNewInfo", (req, res) => {
    if (verifyVINNumber(req.body.vin)) {
        res.send({ response: "Added new info" });
    }
    else {
        res.send({ response: "Incorrect VIN number" });
    }
});
app.post("/getInfoByVIN", (req, res) => {
    console.log('body: ' + JSON.stringify(req.body));
    console.log('body.vin: ' + JSON.stringify(req.body.vin));
    if (verifyVINNumber(req.body.vin)) {
        const response = [
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
    }
    else {
        res.send({ response: "Incorrect VIN number" });
    }
});
function verifyVINNumber(VIN) {
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
function verifyVIN(vin) {
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
            // value = values[c - "A"];
            value = values[returnIndex(c, "A")];
            if (value === 0) {
                return false;
            }
        }
        else if (c >= "0" && c <= "9") {
            // value = c - "0";
            value = returnIndex(c, "0");
        }
        else {
            return false;
        }
        sum += weigth * value;
    }
    sum = sum % 11;
    const check = vin[8];
    if (sum === 10 && check === "X") {
        return true;
    }
    else if (sum === transliterate(check)) {
        return true;
    }
    else {
        return false;
    }
}
function returnIndex(char1, char2) {
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
function transliterate(check) {
    if (check === "A" || check === "J")
        return 1;
    if (check === "B" || check === "K" || check === "S")
        return 2;
    if (check === "C" || check === "L" || check === "T")
        return 3;
    if (check === "D" || check === "M" || check === "U")
        return 4;
    if (check === "E" || check === "N" || check === "V")
        return 5;
    if (check === "F" || check === "W")
        return 6;
    if (check === "G" || check === "P" || check === "X")
        return 7;
    if (check === "H" || check === "Y")
        return 8;
    if (check === "R" || check === "Z")
        return 9;
    return -1;
}
class Car {
}
//# sourceMappingURL=index.js.map