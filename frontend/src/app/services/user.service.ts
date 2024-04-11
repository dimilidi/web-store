import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { ServerResponse } from '../shared/interfaces/ServerResponse';
import { HttpClient } from '@angular/common/http';
import {
  USERS_URL,
  USER_BY_ID_URL,
  USER_DELETE_URL,
  USER_UPDATE_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EditInput } from '../shared/interfaces/EditInput';
import { UserStateService } from './user-state.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.localStorageService.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userStateService: UserStateService
  ) {
    (this.userObservable = this.userSubject.asObservable()),
      this.refreshUserDataPeriodically();
  }

  private refreshUserDataPeriodically(): void {
    // Set up a timer to refresh user data every 15 minutes
    setInterval(() => {
      this.getUserById().subscribe();
    }, 15 * 60 * 1000);
  }

  getAllUsers(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(USERS_URL);
  }

  getUserById(): Observable<User> {
    return this.http.get<any>(USER_BY_ID_URL).pipe(
      tap({
        next: (res: any) => {
          this.localStorageService.setUserToLocalStorage(res.data);
          this.userObservable = res.data;
        },
        error: (error) => {
          this.toastrService.error(error.error, 'Getting user data failed');
        },
      })
    );
  }

  editAccount(userUpdate: EditInput): Observable<User> {
    return this.http.put<User>(USER_UPDATE_URL, userUpdate).pipe(
      tap({
        next: (user) => {
          this.localStorageService.setUserToLocalStorage(user);
          this.userStateService.updateUser(user);
          this.toastrService.success(
            `Edit Profile ${user.name}`,
            'Update Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Update Failed');
        },
      })
    );
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(USER_DELETE_URL).pipe(
      tap({
        next: () => {
          this.localStorageService.clearUserData(this.userStateService);
          this.router.navigate(['/']);
          this.toastrService.success(
            'Account deleted successfully',
            'Account Deleted'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Deletion Failed');
        },
      })
    );
  }
}
