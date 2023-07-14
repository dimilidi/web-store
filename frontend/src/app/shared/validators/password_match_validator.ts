import { AbstractControl, ValidatorFn } from '@angular/forms';

export const PWMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);
    }
  };
  return validator;
};


/*import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function for checking if values match
const matchValidator: ValidatorFn = (control: AbstractControl) => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) return null;

  return passwordControl.value === confirmPasswordControl.value
    ? null
    : { notMatch: true };
};

// Main validator function for passwords match
export const PasswordsMatchValidator = (): ValidatorFn => {
  return matchValidator;
};
*/ 
