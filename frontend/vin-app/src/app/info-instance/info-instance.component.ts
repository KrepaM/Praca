import { Translator } from './../translator.service';
import { Car } from './../classes';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'info-instance',
  templateUrl: './info-instance.component.html',
})

export class InfoInstance implements OnChanges {

  constructor(private translator: Translator) { }

  ngOnChanges(): void {
    this.updateLabels();
  }

  //Variables
  @Input() languageIndex;
  @Input() car: Car;
  showDetails = false;

  //Labels
  carNameLabel = this.translator.translate('CAR_NAME_LABEL');
  carModelLabel = this.translator.translate('CAR_MODEL_LABEL');
  carYearProductionLabel = this.translator.translate('CAR_PRODUCTION_YEAR_LABEL');
  carWeekProductionLabel = this.translator.translate('CAR_PRODUCTION_WEEK_LABEL');
  carBodyStyleLabel = this.translator.translate('CAR_BODY_STYLE_LABEL');
  carColorLabel = this.translator.translate('CAR_COLOR_LABEL');
  carEngineTypeLabel = this.translator.translate('CAR_ENGINE_TYPE');
  carGearboxTypeLabel = this.translator.translate('CAR_GEARBOX_TYPE');
  carTechnicalConditionLabel = this.translator.translate('CAR_CONDITION_LABEL');
  carMileageLabel = this.translator.translate('CAR_MILEAGE_LABEL');
  carAddingDateLabel = this.translator.translate('CAR_ADDING_DATE');
  showDetailsLabel;


  //Functions
  changeShowStatus() {
    this.showDetails = !this.showDetails;
    this.showDetailsLabel = (this.showDetailsLabel === this.translator.translate('SHOW_DETAILS_LABEL')) ? this.translator.translate('HIDE_DETAILS_LABEL') : this.translator.translate('SHOW_DETAILS_LABEL');
  }

  updateLabels() {
    this.carNameLabel = this.translator.translate('CAR_NAME_LABEL');
    this.carModelLabel = this.translator.translate('CAR_MODEL_LABEL');
    this.carYearProductionLabel = this.translator.translate('CAR_PRODUCTION_YEAR_LABEL');
    this.carWeekProductionLabel = this.translator.translate('CAR_PRODUCTION_WEEK_LABEL');
    this.carBodyStyleLabel = this.translator.translate('CAR_BODY_STYLE_LABEL');
    this.carColorLabel = this.translator.translate('CAR_COLOR_LABEL');
    this.carEngineTypeLabel = this.translator.translate('CAR_ENGINE_TYPE');
    this.carGearboxTypeLabel = this.translator.translate('CAR_GEARBOX_TYPE');
    this.carTechnicalConditionLabel = this.translator.translate('CAR_CONDITION_LABEL');
    this.carMileageLabel = this.translator.translate('CAR_MILEAGE_LABEL');
    this.carAddingDateLabel = this.translator.translate('CAR_ADDING_DATE');
    this.showDetailsLabel = this.translator.translate('SHOW_DETAILS_LABEL');
  }
}
