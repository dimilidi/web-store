import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#3f51b5';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();


  

  

}
