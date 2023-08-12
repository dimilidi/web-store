import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  capitalizedName = '';


  constructor(private cartService: CartService, private userService: UserService) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      if (newCart) {
        this.cartQuantity = newCart.totalCount;
      } else {
        this.cartQuantity = 0;
      }
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }



  logout() {
    this.userService.logout().subscribe();
  }

  get isAuth() {
    return this.user.token;
  }

}
