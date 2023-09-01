import { Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject = new BehaviorSubject<User>(
    this.localStorageService.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>; // readOnly version of the userSubject

  constructor(
    private localStorageService: LocalStorageService, 
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  updateUser(user: User): void {
    this.userSubject.next(user);
  }

  public get currentUser(): User {
    const localUser = this.localStorageService.getUserFromLocalStorage();
    console.log(localUser);
    console.log( this.userSubject.value);
    
    return localUser || this.userSubject.value;
  }

}
