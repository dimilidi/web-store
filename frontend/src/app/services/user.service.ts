import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { HttpClient } from '@angular/common/http';
import {
  USER_BY_ID_URL,
  USER_DELETE_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL,
  USER_RESET_PASSWORD,
  USER_SEND_EMAIL,
  USER_UPDATE_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { Router } from '@angular/router';
import { EditInput } from '../shared/interfaces/EditInput';
import { ServerResponse } from '../shared/interfaces/ServerResponse';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  // userObservable is the readOnly version of the userSubject
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
    this.refreshUserDataPeriodically();
  }

  public get currentUser(): User {
    const localUser = this.getUserFromLocalStorage();
    return localUser || this.userSubject.value;
  }

  private refreshUserDataPeriodically(): void {
    // Set up a timer to refresh user data every 15 minutes
    setInterval(() => {
      this.getUserById().subscribe();
    }, 15 * 60 * 1000); // 15 minutes
  }

  login(userLogin: UserLogin): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (res) => {
          const user = res.data;
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Web-Store! ${user.name}`,
            res.message
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Login Failed');
        },
      })
    );
  }

  register(userRegiser: UserRegister): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (res) => {
          const user = res.data;
          this.setUserToLocalStorage(user);
          // notify all observables that new user is created
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Web-Shop ${user.name}`,
            res.message
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  getUserById(): Observable<User> {
    return this.http.get<any>(USER_BY_ID_URL).pipe(
      tap({
        next: (res: any) => {
          this.setUserToLocalStorage(res.data);
          // notify all observables that new user is created
          this.userSubject.next(res.data);
          //this.userObservable = res.data;
          console.log('userService', res.data);
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
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
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
          this.clearUserData();
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

  private clearUserData(): void {
    // Clear user data from local storage && subject
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY); // Set the subject to null or an empty user object
  }

  logout(): Observable<void> {
    return this.http.post<void>(USER_LOGOUT_URL, {}).pipe(
      tap({
        next: () => {
          this.clearUserData();
          this.toastrService.success('Logged out successfully', 'Logout');
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Logout Failed');
        },
      })
    );
  }

  private setUserToLocalStorage(user: User) {
    const currentUser = this.getUserFromLocalStorage();
    const updatedUser = { ...currentUser, ...user };
    // Add or update the token property
    updatedUser.token = user.token || currentUser.token;
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  sendEmailService(email: string) {
    return this.http.post<any>(USER_SEND_EMAIL, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(USER_RESET_PASSWORD, resetObj);
  }
}
