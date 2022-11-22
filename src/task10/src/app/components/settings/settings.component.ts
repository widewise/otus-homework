import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings.service";
import { FormControl } from "@angular/forms";
import {
  debounce,
  filter,
  interval,
} from "rxjs";
import { langValidator } from "./lang.validator";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  fromLang = new FormControl(this.settingsService.fromLang);
  toLang = new FormControl(this.settingsService.toLang);
  readTranslatesCount = new FormControl(this.settingsService.readTranslatesCount);
  goWordsCount = new FormControl(this.settingsService.goWordsCount);

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.fromLang.addValidators(langValidator(this.toLang));
    this.toLang.addValidators(langValidator(this.fromLang));

    this.fromLang.valueChanges
      .pipe(
        debounce(_ => interval(3000)),
        filter(value => value !== "" && value !== this.toLang.value)
      )
      .subscribe(value => {
        this.settingsService.fromLang = value!;
      });

    this.toLang.valueChanges
      .pipe(
        debounce(_ => interval(3000)),
        filter(value => value !== "" && value !== this.fromLang.value)
      )
      .subscribe(value => {
          this.settingsService.toLang = value!;
      });

    this.readTranslatesCount.valueChanges
      .pipe(debounce(_ => interval(1000)))
      .subscribe(value => {
        if(value) {
          this.settingsService.readTranslatesCount = value;
        }
      });

    this.goWordsCount.valueChanges
      .pipe(debounce(_ => interval(1000)))
      .subscribe(value => {
        if(value) {
          this.settingsService.goWordsCount = value;
        }
      });
  }
}
