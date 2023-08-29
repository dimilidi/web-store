import { AbstractControl, ValidatorFn } from '@angular/forms';


export function phoneNumberValidator(): any | string {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const phonePattern = /^\+\d{1,3} [1-9]\d{4,10}$/; 

    if (!phonePattern.test(value)) {
     console.log(phonePattern.test(value));

      return { phone: 'Invalid phone number format.' };
    }
    return null;
  };
}









