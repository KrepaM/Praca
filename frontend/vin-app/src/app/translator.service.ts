import { Injectable } from '@angular/core';
import { Languages } from './dictionary';

@Injectable({
  providedIn: 'root',
})

export class Translator {
  languageIndex = 0;
  languagesModule = new Languages;

  translate(value: string) {
    return this.languagesModule.languages[this.languageIndex].values[value];
  }
}
