import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL, USER_UPDATE_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { Router } from '@angular/router';
import { EditInput } from '../shared/interfaces/EditInput';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;


  // userObservable is the readOnly version of the userSubject
  constructor(private http: HttpClient, private toastrService: ToastrService, private router:Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Web-Store! ${user.name}`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  register(userRegiser: UserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          // notify all observables that new user is created
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Web-Shop ${user.name}`,
            'Register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  editAccount(userUpdate: EditInput): Observable<User> {
    return this.http.put<User>(USER_UPDATE_URL, userUpdate).pipe(
      tap({
        next: (user) => {
          console.log('Updated User:', user);
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
  

  

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/'])
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
}
