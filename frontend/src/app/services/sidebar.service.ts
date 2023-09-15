import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);

  constructor() {}

  toggleSidebar() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }

  isSidebarOpen(): Observable<boolean> {
    return this.isSidebarOpenSubject.asObservable();
  }
}
