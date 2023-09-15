import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  isSidebarOpen!: boolean;
  private sidebarSubscription!: Subscription;


  constructor(private themeService: ThemeService, private sidebarService: SidebarService) {}

  ngOnInit() {
    const currentTheme = this.themeService.getCurrentTheme();
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
    };

    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }


  
  isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }

  isLightTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'light';
  }

  getThemeClass(): string {
    return this.isDarkTheme() ? 'dark-theme' : 'light-theme';
  }

}
