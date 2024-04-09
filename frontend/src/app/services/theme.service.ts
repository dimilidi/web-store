import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: string = 'light';

  constructor() {
    this.theme = this.getThemeFromLocalStorage() || 'light';
  }

  toggleDarkMode(): void {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): string {
    return this.theme;
  }

  setCurrentTheme(theme: string): void { // Changed method name
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }

  private setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }

  private getThemeFromLocalStorage(): string | null {
    return localStorage.getItem('theme');
  }
}
