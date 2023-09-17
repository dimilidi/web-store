import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;
  private theme: string  = 'light';

  constructor() {this.isDarkMode = this.getModeFromLocalStorage() === 'dark';}


    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.setTheme(this.isDarkMode ? 'dark' : 'light');
    }
  
    getCurrentTheme() {
      const theme = this.getModeFromLocalStorage();
      this.theme = theme || 'light';
      return this.theme;
    }

  
  private setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }

  getModeFromLocalStorage() {
    return localStorage.getItem('theme');
  } 



  

    
    


}
