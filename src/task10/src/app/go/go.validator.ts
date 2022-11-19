import { AbstractControl } from "@angular/forms";
import { IGoWord } from "../models/goWord";

export const goValidator = (words: Array<IGoWord>) => {
  return (control: AbstractControl) => {
    let result = true;
    for (const word of words) {
      const wordControl = control.get(word.word1);
      if(!wordControl) {
        continue;
      }

      if(wordControl.value !== "" && wordControl.value.toLowerCase() !== word.word2.toLowerCase())
      {
        wordControl.setErrors({ WrongTranslate: true });
        result = false;
      }

      if(wordControl.value === "") {
        result = false;
      }
    }
    const testResultControl = control.get("testResult");
    testResultControl!.setErrors(result ? null : { WrongTranslates: true });
  }
};
