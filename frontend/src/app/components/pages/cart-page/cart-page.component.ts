import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:Cart | null;
  user: User = this.userStateService.currentUser;

  constructor(private cartService: CartService, private userStateService: UserStateService){
    this.cartService.getCartObservable().subscribe((cart)=> {
      this.cart = cart;
    })
    
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = Number(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }

}
