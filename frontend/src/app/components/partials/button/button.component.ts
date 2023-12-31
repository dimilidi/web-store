import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() icon!: string;
  @Input() bgColor = '#3f51b5';
  @Input() color = 'white';
  @Input() cursor = 'pointer';
  @Input() fontSizeRem = 1;
  @Input() widthRem!:number;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();


  

  

}
