import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnDestroy,
  ViewChild
} from '@angular/core';
import { AddToDictionaryService } from "../../services/add-to-dictionary.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements AfterViewInit, OnDestroy {
  constructor(
    private addToDictionaryService: AddToDictionaryService) {
  }

  buttonSubscription!: Subscription;

  @ViewChild('textInput')
  textInputRef!: ElementRef;

  @ViewChild('addDictionaryButton')
  addDictionaryButtonRef!: ElementRef;

  onAddTextToDictionary(text: string) {
    this.addToDictionaryService.addToDictionary(text);
  }

  ngAfterViewInit(): void {
    this.buttonSubscription = fromEvent(this.addDictionaryButtonRef.nativeElement, "click")
      .subscribe(_ =>{
        this.textInputRef.nativeElement.value = "";
      })
  }

  ngOnDestroy(): void {
    this.buttonSubscription.unsubscribe();
  }
}
