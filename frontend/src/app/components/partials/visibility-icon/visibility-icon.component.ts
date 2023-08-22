import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-visibility-icon',
  templateUrl: './visibility-icon.component.html',
  styleUrls: ['./visibility-icon.component.css']
})
export class VisibilityIconComponent {
  @Input() isVisible!: boolean;
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();

 onIconClick()  {
    console.log(this.isVisible);
    
    this.iconClick.emit();
  }
}
