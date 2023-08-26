import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
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
  @Input() type: 'text' | 'password' | 'email' | 'file' | 'number' = 'text';
  @Input() showPassword!: boolean;
  isInvalid!: boolean;
  border!: string;

  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();


  private updateisInvalidState() {
    this.isInvalid = this.control.touched && this.control.invalid;
  }

  iconClickTrigger() {
    this.iconClick.emit();
  }

  get formControl() {
    this.updateisInvalidState();
    return this.control as FormControl;
  }
}
