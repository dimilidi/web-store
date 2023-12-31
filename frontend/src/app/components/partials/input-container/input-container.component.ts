import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() bgColor = "#ffffff52";
  @Input() border!: string;
  @Input() showPassword!: boolean;
  @Input() isInvalid?: boolean;
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();

  iconClicked()  {
    this.iconClick.emit();
  }

}
