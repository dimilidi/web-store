import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export default class TextInputComponent {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() placeholder!: string;
  @Input() value?: string;
  @Input() type: 'text' | 'password' | 'email' | 'file' | 'number' | 'tel' = 'text';
  @Input() showPassword!: boolean;
  @Input() isPhone: boolean = false;
  @Input() dialCode: string = '';
  @Output() dialCodeChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();
  isInvalid!: boolean;
  border!: string;
  selectedDialCode: string = '';




  private updateisInvalidState() {
    this.isInvalid = this.control.touched && this.control.invalid;
  }

  iconClickTrigger() {
    this.iconClick.emit();
  }


  countryCodeChanged(code:any)  {
    this.dialCode = code;
    this.dialCodeChange.emit(code);
  }

  get formControl() {
    this.updateisInvalidState();
    return this.control as FormControl;
  }
}
