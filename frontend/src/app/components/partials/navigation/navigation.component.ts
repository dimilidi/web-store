import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  displaySearchIcon = false;

  constructor(
    private dataService: DataService,
    private userStateService: UserStateService,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.cartService.getCartObservable().subscribe((newCart) => {
    if (newCart) {
      this.cartQuantity = newCart.totalCount;
    } else {
      this.cartQuantity = 0;
    }
  });


  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.checkRoute(this.activatedRoute);
    }
  });

 }

  ngOnInit(): void {
    this.userStateService.userObservable.subscribe((user) => {
      this.user = user;
    });

    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    this.checkScreenSize();

    this.checkRoute(this.activatedRoute);
    
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


  checkRoute(activatedRoute: ActivatedRoute) {
    const currentRoutePath = this.router.url;
    console.log(currentRoutePath);
    

    this.displaySearchIcon = currentRoutePath =='/' 
                            || currentRoutePath.includes('/dashboard')
                            || currentRoutePath.includes('/products')
                            || currentRoutePath.includes('/all-orders')
                            || currentRoutePath.includes('/users');
  }


  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 700; 
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 700; 
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
    if(!this.isSidebarOpen){
      this.sidebarService.toggleSidebar();
    }
  }

}
