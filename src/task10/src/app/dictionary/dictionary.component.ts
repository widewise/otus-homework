import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { AddToDictionaryService } from "../services/add-to-dictionary.service";
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements AfterViewInit{
  constructor(
    private addToDictionaryService: AddToDictionaryService) {
  }

  @ViewChild('textInput')
  textInputRef!: ElementRef;

  @ViewChild('addDictionaryButton')
  addDictionaryButtonRef!: ElementRef;

  onAddTextToDictionary(text: string) {
    this.addToDictionaryService.addToDictionary(text);
  }

  ngAfterViewInit(): void {
    fromEvent(this.addDictionaryButtonRef.nativeElement, "click")
      .subscribe(_ =>{
        this.textInputRef.nativeElement.value = "";
      })
  }
}
