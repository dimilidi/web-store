import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  cartQuantity = 0;
  user!: User;
  capitalizedName = '';

  private cartSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private dataService: DataService, 
    private userStateService: UserStateService,
    private authService: AuthService,
  ) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      if (newCart) {
        this.cartQuantity = newCart.totalCount;
      } else {
        this.cartQuantity = 0;
      }
    });

    this.userStateService.userObservable.subscribe((newUser) => {
      this.user = newUser;
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
    return this.user.token;
  }

  toggleSearchBar() {
    this.dataService.toggleSearchBar();
  }
}
