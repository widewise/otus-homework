import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from "rxjs";
import { ITranslate } from "../../../models/translate";
import { DictionaryService } from "../../../services/dictionary.service";

@Component({
  selector: 'app-translate-list',
  templateUrl: './translate-list.component.html',
  styleUrls: ['./translate-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateListComponent implements OnInit, AfterViewInit {
  translates$!: Observable<Array<ITranslate>>;
  translateAdded$: Observable<ITranslate>;

  constructor(
    private dictionaryService: DictionaryService) {
    this.translateAdded$ = dictionaryService.translateAdded$;
  }

  ngOnInit(): void {
    this.translates$ = this.dictionaryService.getTranslates();
  }

  ngAfterViewInit(): void {
    this.dictionaryService.translateAdded$.subscribe(_ => {
      this.translates$ = this.dictionaryService.getTranslates();
    });
  }
}
