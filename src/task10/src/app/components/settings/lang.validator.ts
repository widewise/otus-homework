import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const langValidator = (otherLangControl: AbstractControl): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value === otherLangControl.value) {
      return {
        SameLang: true
      }
    }
    return null;
  }
};
