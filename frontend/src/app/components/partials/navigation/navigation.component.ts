import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  user!: User;
  private userSubscription!: Subscription;
  isSidebarOpen: boolean = false; 
  private sidebarSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private userStateService: UserStateService,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.userStateService.userObservable.subscribe((user) => {
      this.user = user;
    });

    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe();
  }

  get isAuth() {
    return this.userStateService.currentUser.token;
  }

  toggleSearchBar() {
    this.dataService.toggleSearchBar();
  }

 
}
