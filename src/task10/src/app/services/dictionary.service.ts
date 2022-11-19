import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  of,
  map,
} from "rxjs";
import { ITranslate } from "../models/translate";
import { SettingsService } from "./settings.service";
import { IGoWord } from "../models/goWord";

const storeKey = "DICTIONARY";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  translates: Array<ITranslate> = JSON.parse(localStorage.getItem(storeKey) ?? "[]") as Array<ITranslate>;
  translates$: Observable<Array<ITranslate>>;
  translateAdded$: Subject<ITranslate>;

  constructor(private settingsService: SettingsService) {
    this.translates$ = of(this.translates)
    this.translateAdded$ = new Subject<ITranslate>();
  }

  addTranslate(word1: string, word1Lang: string, word2: string, word2Lang: string) {
    const translate: ITranslate = {
      word1,
      lang1: word1Lang,
      word2,
      lang2: word2Lang
    };
    if(this.translates.some((t: ITranslate) => t.word1 === translate.word1 && t.lang1 === translate.lang1 && t.lang2 === translate.lang2)){
      return;
    }
    this.translates.push(translate);
    this.translateAdded$.next(translate);
    this.updateLocalStore();
  }

  getTranslates() : Observable<Array<ITranslate>> {
    return this.translates$
      .pipe(
        map(list =>
          list
            .filter(t => t.lang1 === this.settingsService.fromLang && t.lang2 === this.settingsService.toLang)
            .reverse()
            .slice(0, this.settingsService.readTranslatesCount)
        )
      );
  }

  getGoWords() : Array<IGoWord> {
    const translatesToGo = this.translates
      .filter(t => t.lang1 === this.settingsService.fromLang &&
        t.lang2 === this.settingsService.toLang);
    if(translatesToGo.length < this.settingsService.goWordsCount) {
      return translatesToGo
        .map(t => {
        return {
          word1: t.word1,
          word2: t.word2,
        };
      });
    }

    const result = new Array<IGoWord>();
    const startIndex = this.getRandomIndex(translatesToGo.length);
    for (let i = 0; i < this.settingsService.goWordsCount; i++) {
      const index = (i + startIndex) % translatesToGo.length;
      result.push({
        word1: translatesToGo[index].word1,
        word2: translatesToGo[index].word2,
      });
    }

    return result;
  }

  private getRandomIndex(max: number) : number {
    return Math.floor(Math.random() * max);
  }

  private updateLocalStore() {
    localStorage.setItem(storeKey, JSON.stringify(this.translates));
  }
}
