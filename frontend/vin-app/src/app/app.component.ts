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
  mainInfo: Car[] = [];
  addInfo: any[] = [];
  languageIndex = 0;
  numberOfOwners = 0;
  stolenInfo: any[] = [];
  scrapInfo: any[] = [];

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
  numberOfOwnersLabel;
  dateLabel;
  carWasStolenLabel;
  carWasScrapedLabel;

  // Functions

  changeInputClass() {
    if (this.inputClassName === this.defaultInputClass) {
      this.inputClassName = this.errorInputClass;
    } else {
      this.inputClassName = this.defaultInputClass;
    }
  }

  searchVIN() {
    this.szukajInformacjiPoVIN();
    this.search = false;
  }

  //info: 1 - stolen, 2 - scraped, 3 - new owner

  szukajInformacjiPoVIN() {
    this.connection.getInfo(this.vin).subscribe((res) => {
      if (res.statement === this.translator.translate("VIN_NUMBER_NOT_FOUND_WARNING_LABEL")) {
        this.changeInputClass()
      } else {
        this.mainInfo = res.info;
        this.addInfo = res.addInfo;
        for (let i = 0; i < this.addInfo.length; i++) {
          if (this.addInfo[i].info === 1) {
            this.stolenInfo.push(this.addInfo[i]);
          } else if (this.addInfo[i].info === 2) {
            this.scrapInfo.push(this.addInfo[i]);
          } else if (this.addInfo[i].info === 3) {
            this.numberOfOwners++;
          }
        }
      }
    });
  }

  return() {
    this.search = true;
  }

  clearInput() {
    this.vin = "";
  }

  changeLanguage(index: number) {
    this.translator.languageIndex = index;
    this.languageIndex = index;
    this.updateLabels();
  }

  translateTechnicalCondition(valueToTranslate: string) {
    for (let obj of this.translator.languagesModule.languages) {
      for (let key of this.translator.languagesModule.keys) {
        if (valueToTranslate === obj.values[key]) return this.translator.languagesModule.languages[this.languageIndex].values[key];
      }
    }
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
    this.numberOfOwnersLabel = this.translator.translate("NUMBER_OF_OWNERS_LABEL");
    this.dateLabel = this.translator.translate('AR_ADDING_DATE');
    this.carWasStolenLabel = this.translator.translate('STOLEN_CAR_LABEL');
    this.carWasScrapedLabel = this.translator.translate('SCRAP_CAR_LABEL');
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
    for (let i = 1; i < this.mainInfo.length; i++) {
      if (!this.isEqual(this.mainInfo[0], this.mainInfo[i])) {
      }
    }
  }

  sortByDate() {
    let arr = [];
    while (this.mainInfo.length > 0) {
      arr.push(this.mainInfo.splice(this.findOldest(), 1));
    }
    this.mainInfo = arr;
  }

  findOldest() {
    let d = this.mainInfo[0].date;
    let index = 0;
    for (let i = 1; i < this.mainInfo.length; i++) {
      if (!this.compareDates(this.mainInfo[i].date, d)) {
        d = this.mainInfo[i].date;
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
