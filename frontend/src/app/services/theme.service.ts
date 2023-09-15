import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;

  constructor() {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme(this.isDarkMode ? 'dark' : 'light');
  }

  getCurrentTheme() {
    return this.isDarkMode ? 'dark' : 'light';
  }

  

  private setTheme(theme: string) {
    localStorage.setItem('theme', theme);
  }
}
