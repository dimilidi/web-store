import { AbstractControl, ValidatorFn } from '@angular/forms';


export function phoneNumberValidator(): any | string {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const phonePattern = /^00\d{1,3}\d{9,13}$/;

    if (!phonePattern.test(value)) {
     console.log(phonePattern.test(value));

      return { phone: 'Invalid phone number format.' };
    }
    return null;
  };
}









