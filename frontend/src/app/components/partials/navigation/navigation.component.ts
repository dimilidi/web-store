import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
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
  cartQuantity = 0;
  private userSubscription!: Subscription;
  isSidebarOpen!: boolean; 
  private sidebarSubscription!: Subscription;
  isSmallScreen = false;

  constructor(
    private dataService: DataService,
    private userStateService: UserStateService,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private cartService: CartService,
  ) {this.cartService.getCartObservable().subscribe((newCart) => {
    if (newCart) {
      this.cartQuantity = newCart.totalCount;
    } else {
      this.cartQuantity = 0;
    }
  });}

  ngOnInit(): void {
    this.userStateService.userObservable.subscribe((user) => {
      this.user = user;
    });

    
    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    this.checkScreenSize();
    
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 700; // Adjust the threshold as needed
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 400; 
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

  closeMenu() {
    this.sidebarService.toggleSidebar();
  }

}
