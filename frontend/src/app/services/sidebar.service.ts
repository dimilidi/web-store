import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);

  constructor() {   this.isSidebarOpenSubject.next(this.getSidebarStatusFromLocalStorage());}

  toggleSidebar() {
    const currentStatus = this.isSidebarOpenSubject.value;
    this.setSidebarStatus(!currentStatus);
  }

  isSidebarOpen(): Observable<boolean> {
    return this.isSidebarOpenSubject.asObservable();
  }

  private setSidebarStatus(isOpen: boolean) {
    localStorage.setItem('isOpen', JSON.stringify(isOpen));
    this.isSidebarOpenSubject.next(isOpen);
  }

  getSidebarStatusFromLocalStorage() {
    const isOpenString = localStorage.getItem('isOpen');
    if (isOpenString !== null) {
      return JSON.parse(isOpenString);
    } else {
      return false;
    }
  }
}
