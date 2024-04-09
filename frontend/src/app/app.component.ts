import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isSidebarOpen: boolean = false;
  private sidebarSubscription!: Subscription;

  constructor(
    private themeService: ThemeService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.initializeTheme();
    this.subscribeToSidebar();
  }

  initializeTheme(): void {
    const currentTheme = this.themeService.getCurrentTheme() || 'light';
    this.themeService.setCurrentTheme(currentTheme);
  }

  subscribeToSidebar(): void {
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

  closeSidebar(): void {
    if (!this.isSidebarOpen) {
      this.sidebarService.toggleSidebar();
    }
  }
}
