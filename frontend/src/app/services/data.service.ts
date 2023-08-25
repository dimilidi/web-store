import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  private isSearchBarVisibleSubject = new BehaviorSubject<boolean>(false);
  isSearchBarVisible$: Observable<boolean> = this.isSearchBarVisibleSubject.asObservable();
  constructor() {}

  

  toggleSearchBar() {
    this.isSearchBarVisibleSubject.next(!this.isSearchBarVisibleSubject.value);
  }
}
