import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { USER_KEY } from '../shared/constants/urls';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setUserToLocalStorage(user: User) {
    const currentUser = this.getUserFromLocalStorage();
    const updatedUser = { ...currentUser, ...user };
    // Add or update the token property
    updatedUser.token = user.token || currentUser.token;
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }

  getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  clearUserData(userStateService: UserStateService): void {
    // Clear user data from local storage && subject
    userStateService.updateUser(new User());
    localStorage.removeItem(USER_KEY);
  }
}
