import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';



@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export default class TextInputComponent {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() label!: string;
  @Input() value?: string;
  @Input() border!: string;
  @Input() type: "text"  | "password" | "email" | "file" | "number" = "text";
  

  get formControl() {
    return this.control as FormControl;
  }

}
