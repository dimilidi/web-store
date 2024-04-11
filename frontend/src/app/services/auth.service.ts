import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ServerResponse } from '../shared/interfaces/ServerResponse';
import { USER_LOGIN_URL, USER_LOGOUT_URL, USER_REGISTER_URL, USER_RESET_PASSWORD, USER_SEND_EMAIL } from '../shared/constants/urls';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { LocalStorageService } from './local-storage.service';
import { UserStateService } from './user-state.service';
import { User } from '../shared/models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userStateService: UserStateService,
  ) {}

  login(userLogin: UserLogin): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (res) => {
          const user = res.data;
          this.localStorageService.setUserToLocalStorage(user) ;
          this.userStateService.updateUser(user);
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
          this.localStorageService.setUserToLocalStorage(user);
          // notify all observables that new user is created
          this.userStateService.updateUser(user);
          this.toastrService.success(
            `Welcome to Web-Shop ${user.name}`,
            res.message
          );
        },
        error: (errorResponse) => {
          console.error('Registration error:', errorResponse);
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(USER_LOGOUT_URL, {}).pipe(
      tap({
        next: () => {
          this.localStorageService.clearUserData(this.userStateService);
          this.localStorageService.getUserFromLocalStorage();
          this.toastrService.success('Logged out successfully', 'Logout');
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Logout Failed');
        },
      })
    );
  }


  sendEmailService(email: string) {
    return this.http.post<any>(USER_SEND_EMAIL, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(USER_RESET_PASSWORD, resetObj);
  }
  
}
