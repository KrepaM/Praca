import { Translator } from './translator.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void {
    this.updateLabels();
  }

  // Services
  translator = new Translator;

  // Main
  search = true;
  vin = '';
  numebrOfRecords = 0;
  flagsPath = [
    '../assets/icons/PL.png',
    '../assets/icons/SH.png'
  ];

  // CSS
  defaultInputClass = 'defaultInputClass';
  errorInputClass = 'errorInputClass';
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
      this.search = false;
      this.szukajInformacjiPoVIN();
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
    this.vin = this.vin.replace('-', '');
    this.vin = this.vin.replace(' ', '');
    this.vin = this.vin.toUpperCase();
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const c = this.vin[i];
      let value = 0;
      const weigth = weights[i];
      if (c >= 'A' && c <= 'Z') {
        // value = values[c - "A"];
        value = values[this.returnIndex(c, 'A')];
        if (value === 0) {
          return false;
        }
      } else if (c >= '0' && c <= '9') {
        // value = c - "0";
        value = this.returnIndex(c, '0');
      } else {
        return false;
      }
      sum += weigth * value;
    }
    sum = sum % 11;
    const check = this.vin[8];
    if (sum === 10 && check === 'X') {
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
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] == char1) {
        firstIndex = i;
      }
      if (letters[i] == char2) {
        secondIndex = i;
      }
    }
    return firstIndex - secondIndex;
  }

  transliterate(check: string) {
    if (check == 'A' || check == 'J') return 1;
    if (check == 'B' || check == 'K' || check == 'S') return 2;
    if (check == 'C' || check == 'L' || check == 'T') return 3;
    if (check == 'D' || check == 'M' || check == 'U') return 4;
    if (check == 'E' || check == 'N' || check == 'V') return 5;
    if (check == 'F' || check == 'W') return 6;
    if (check == 'G' || check == 'P' || check == 'X') return 7;
    if (check == 'H' || check == 'Y') return 8;
    if (check == 'R' || check == 'Z') return 9;
    return -1;
  }

  szukajInformacjiPoVIN() {
    if (this.verifyVIN()) {
      this.search = !this.search;
    } else {
    }
  }

  return() {
    this.search = true;
  };

  generatePDFFile() { }

  clearInput() {
    this.vin = '';
  }

  changeLanguage(index: number) {
    this.translator.languageIndex = index;
    this.updateLabels();
  }

  updateLabels() {
    this.returnLabel = this.translator.translate('RETURN_LABEL');
    this.searchLabel = this.translator.translate('SEARCH_LABEL');
    this.clearLabel = this.translator.translate('CLEAR_INPUT_LABEL');
    this.generateRaport = this.translator.translate('GENERATE_RAPORT_LABEL');
    this.mainPageLabel = this.translator.translate('MAIN_PAGE_LABEL');
    this.insertVinNumber = this.translator.translate('INSERT_VIN_NUMBER_LABEL');
    this.carName = this.translator.translate('CAR_NAME_LABEL');
    this.carModel = this.translator.translate('CAR_MODEL_LABEL');
    this.carYear = this.translator.translate('CAR_PRODUCTION_YEAR_LABEL');
    this.carColor = this.translator.translate('CAR_COLOR_LABEL');
  }

}

// https://gist.github.com/ubergesundheit/5626679
// https://www.whoishostingthis.com/resources/flag-icons/
