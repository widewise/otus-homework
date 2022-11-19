import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  filter,
  map,
  Observable
} from "rxjs";
import {SettingsService} from "./settings.service";

const translateServiceApiBaseUrl = "https://api.mymemory.translated.net/get";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(
    private httpClient: HttpClient,
    private settingsService: SettingsService) {
  }

  translate(word: string): Observable<string> {
    const params = new HttpParams({
      fromObject: {
        q: word,
        langpair: `${this.settingsService.fromLang}|${this.settingsService.toLang}`,
      }
    });

    return this.httpClient
      .get(translateServiceApiBaseUrl, { params })
      .pipe(
        // @ts-ignore
        filter(response => response.responseData.match === 1),
        // @ts-ignore
        map(response => response.responseData.translatedText),
      );
  }
}
