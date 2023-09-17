import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent implements OnInit{
  switchPosition!: string;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.switchPosition = this.themeService.getCurrentTheme();
    console.log('OnInit',this.switchPosition);

  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    // Update the switch position based on the theme
    this.switchPosition = this.themeService.getCurrentTheme();
    console.log('Toggler',this.switchPosition);

  }



  
}
