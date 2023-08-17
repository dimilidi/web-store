import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { phoneNumberValidator } from '../../../shared/validators/phone_number_validator'; 

const VALIDATORS_MESSAGES:any = {
  required: 'Input required.',
  email: 'Email is not valid.',
  minlength: 'Input is too short.',
  notMatch: 'Confirm Password does not match.',
  phone: 'Invalid format.'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges{
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=> {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation(): void {
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}
