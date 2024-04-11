import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);

  constructor() {
    this.isSidebarOpenSubject.next(this.getSidebarStatusFromLocalStorage());
  }

  toggleSidebar(): void {
    const currentStatus = this.isSidebarOpenSubject.value;
    this.setSidebarStatus(!currentStatus);
  }

  isSidebarOpen(): Observable<boolean> {
    return this.isSidebarOpenSubject.asObservable();
  }

  setSidebarStatus(isOpen: boolean): void { 
    localStorage.setItem('isOpen', JSON.stringify(isOpen));
    this.isSidebarOpenSubject.next(isOpen);
  }

  private getSidebarStatusFromLocalStorage(): boolean {
    const isOpenString = localStorage.getItem('isOpen');
    return isOpenString !== null ? JSON.parse(isOpenString) : false;
  }
}
