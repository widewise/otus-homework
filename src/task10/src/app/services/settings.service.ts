import { Injectable } from '@angular/core';
import { ISettings } from "../models/settings";

const settingsStoreKey = "SETTINGS";

const defaultSettings: ISettings = {
  fromLang: "ru",
  toLang: "en",
  readTranslatesCount: 5,
  goWordsCount: 3,
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: ISettings = JSON.parse(localStorage.getItem(settingsStoreKey) as string) as ISettings ?? defaultSettings;

  constructor() { }

  get fromLang() { return this.settings.fromLang; }
  set fromLang(value: string) {
    if(!value) return;
    this.settings.fromLang = value;
    this.updateStore()
  }

  get toLang() { return this.settings.toLang; }
  set toLang(value: string) {
    if(!value) return;
    this.settings.toLang = value;
    this.updateStore()
  }

  get readTranslatesCount() { return this.settings.readTranslatesCount; }
  set readTranslatesCount(value: number) {
    if(!value) return;
    this.settings.readTranslatesCount = value;
    this.updateStore()
  }

  get goWordsCount() { return this.settings.goWordsCount; }
  set goWordsCount(value: number) {
    if(!value) return;
    this.settings.goWordsCount = value;
    this.updateStore()
  }

  private updateStore(){
    localStorage.setItem(settingsStoreKey, JSON.stringify(this.settings));
  }
}
