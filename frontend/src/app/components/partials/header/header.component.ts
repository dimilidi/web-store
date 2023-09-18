import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: User;
  capitalizedName = '';
  isSidebarOpen!: boolean;

  private cartSubscription!: Subscription;
  private userSubscription!: Subscription;
  private sidebarSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private dataService: DataService, 
    private userStateService: UserStateService,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {
    
  }

  ngOnInit(): void {
    this.userStateService.userObservable.subscribe((user) => {
      this.user = user;
    });

    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }


  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
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

  toggleSidebar() {
    return this.sidebarService.toggleSidebar();
  }
}
