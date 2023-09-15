import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  switchPosition: string = 'left';
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleDarkMode();
    // Update the switch position based on the theme
    if(this.themeService.getCurrentTheme() === 'dark') {
      this.switchPosition = 'right'
    } else {
      this.switchPosition = 'left';
    }
  }

  
}
