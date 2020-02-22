import { ConnectionService } from './connection.service';
import { Car } from "./classes";
import { InfoInstance } from "./info-instance/info-instance.component";
import { Translator } from "./translator.service";
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private connection: ConnectionService, private translator: Translator) { }

  ngOnInit(): void {
    this.updateLabels();
  }

  // Main
  search = true;
  vin = "WBAAP71050PJ49144";
  numebrOfRecords = 0;
  flagsPath = ["../assets/icons/PL.png", "../assets/icons/SH.png"];
  instances: Car[] = [];
  languageIndex = 0;

  // CSS
  defaultInputClass = "default-input-class";
  errorInputClass = "error-input-class";
  inputClassName = this.defaultInputClass;

  // Names
  returnLabel;
  searchLabel;
  clearLabel;
  generateRaport;
  mainPageLabel;
  insertVinNumber;
  vinLabel = "VIN";
  carName;
  carModel;
  carYear;
  carColor;

  // Functions
  changeInputClass() {
    if (this.inputClassName === this.defaultInputClass) {
      this.inputClassName = this.errorInputClass;
    } else {
      this.inputClassName = this.defaultInputClass;
    }
  }

  searchVIN() {
    if (this.verifyVIN()) {
      this.szukajInformacjiPoVIN();
      this.search = false;
    } else {
      this.changeInputClass();
    }
  }

  verifyVIN(): boolean {
    if (this.vin.length != 17) {
      return false;
    }
    const values = [
      1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 0, 7, 0, 9, 2, 3, 4, 5, 6, 7, 8, 9
    ];
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    this.vin = this.vin.replace("-", "");
    this.vin = this.vin.replace(" ", "");
    this.vin = this.vin.toUpperCase();
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const c = this.vin[i];
      let value = 0;
      const weigth = weights[i];
      if (c >= "A" && c <= "Z") {
        value = values[this.returnIndex(c, "A")];
        if (value === 0) {
          return false;
        }
      } else if (c >= "0" && c <= "9") {
        value = this.returnIndex(c, "0");
      } else {
        return false;
      }
      sum += weigth * value;
      // console.log('loop sum', sum);
    }
    sum = sum % 11;
    const check = this.vin[8];
    console.log('check ', check);
    console.log('sum ', sum);
    if (sum === 10 && check === "X") {
      return true;
    } else if (sum === this.transliterate(check)) {
      return true;
    } else {
      return false;
    }
  }

  returnIndex(char1: string, char2: string) {
    let firstIndex = 0;
    let secondIndex = 0;
    const letters = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
    const numbers = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];
    //Letters
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] == char1) {
        firstIndex = i;
      }
      if (letters[i] == char2) {
        secondIndex = i;
      }
    }
    //Numbers
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] == char1) {
        firstIndex = i;
      }
      if (numbers[i] == char2) {
        secondIndex = i;
      }
    }
    return firstIndex - secondIndex;
  }

  transliterate(check: string) {
    if (check == "A" || check == "J") return 1;
    if (check == "B" || check == "K" || check == "S") return 2;
    if (check == "C" || check == "L" || check == "T") return 3;
    if (check == "D" || check == "M" || check == "U") return 4;
    if (check == "E" || check == "N" || check == "V") return 5;
    if (check == "F" || check == "W") return 6;
    if (check == "G" || check == "P" || check == "X") return 7;
    if (check == "H" || check == "Y") return 8;
    if (check == "R" || check == "Z") return 9;
    if (check >= "0" && check <= "9") return parseInt(check, 10);
    return -1;
  }

  szukajInformacjiPoVIN() {
    this.connection.getInfo(this.vin).subscribe((res: any[]) => {
      // for (let i = 0; i < res.length; i++) {
      //   this.instances.push(res[i]);
      // }
      this.instances = res;
    });
  }

  return() {
    this.search = true;
  }

  generatePDFFile() { }

  clearInput() {
    this.vin = "";
  }

  changeLanguage(index: number) {
    this.translator.languageIndex = index;
    this.languageIndex = index;
    this.updateLabels();
  }

  updateLabels() {
    this.returnLabel = this.translator.translate("RETURN_LABEL");
    this.searchLabel = this.translator.translate("SEARCH_LABEL");
    this.clearLabel = this.translator.translate("CLEAR_INPUT_LABEL");
    this.generateRaport = this.translator.translate("GENERATE_RAPORT_LABEL");
    this.mainPageLabel = this.translator.translate("MAIN_PAGE_LABEL");
    this.insertVinNumber = this.translator.translate("INSERT_VIN_NUMBER_LABEL");
    this.carName = this.translator.translate("CAR_NAME_LABEL");
    this.carModel = this.translator.translate("CAR_MODEL_LABEL");
    this.carYear = this.translator.translate("CAR_PRODUCTION_YEAR_LABEL");
    this.carColor = this.translator.translate("CAR_COLOR_LABEL");
  }

  isEqual(car1: Car, car2: Car): boolean {
    if (
      car1.VIN == car2.VIN &&
      car1.carName == car2.carName &&
      car1.model == car2.model &&
      car1.yearProduction == car2.yearProduction &&
      car1.weekProduction == car2.weekProduction &&
      car1.bodyType == car2.bodyType &&
      car1.color == car2.color &&
      car1.engineType == car2.engineType &&
      car1.gearboxType == car2.gearboxType
    ) {
      return true;
    } else {
      return false;
    }
  }

  isAnyDeparture() {
    for (let i = 1; i < this.instances.length; i++) {
      if (!this.isEqual(this.instances[0], this.instances[i])) {
      }
    }
  }

  sortByDate() {
    let arr = [];
    while (this.instances.length > 0) {
      arr.push(this.instances.splice(this.findOldest(), 1));
    }
    this.instances = arr;
  }

  findOldest() {
    let d = this.instances[0].date;
    let index = 0;
    for (let i = 1; i < this.instances.length; i++) {
      if (!this.compareDates(this.instances[i].date, d)) {
        d = this.instances[i].date;
        index = i;
      }
    }
    return index;
  }

  compareDates(date1: string, date2: string) {
    // true if date1 is younger than date2
    if (new Date(date1) > new Date(date2)) return true;
    else return false;
  }



}

// https://gist.github.com/ubergesundheit/5626679
// https://www.whoishostingthis.com/resources/flag-icons/
