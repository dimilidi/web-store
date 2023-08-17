import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent {
  @Input() label!:string;
  @Input() bgColor = "#ffffff52";
  @Input() border = "2px solid white";
}
