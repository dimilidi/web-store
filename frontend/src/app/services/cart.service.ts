import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { User } from '../shared/models/User';

import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/models/Product';
import { CartItem } from '../shared/models/CartItem';
import { UserService } from './user.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart | null = null;
  private cartSubject: BehaviorSubject<Cart | null> = new BehaviorSubject(
    this.cart
  );

  constructor(private userStateService: UserStateService) {
    this.userStateService.userObservable.subscribe((user) => {
      if (user) {
        // User is logged in, retrieve their cart from local storage or create a new cart if not found.
        this.cart = this.getCartFromLocalStorage(user.id) || new Cart();
      } else {
        // No user, set the cart to null (empty).
        this.cart = null;
      }
      this.cartSubject.next(this.cart);
    });
  }
  private user: User = this.userStateService.currentUser;

  addToCart(product: Product): void {
    if (!this.cart) {
      this.cart = new Cart();
    }

    let cartItem = this.cart.items.find(
      (item) => item.product.id == product.id
    );
    if (cartItem) {
      cartItem.quantity++;
      cartItem.price = cartItem.quantity * cartItem.product.price;
    } else {
      this.cart.items.push(new CartItem(product));
    }

    this.setCartToLocalStorage();
  }

  removeFromCart(productId: string): void {
    if (!this.cart) {
      return;
    }
    this.cart.items = this.cart.items.filter(
      (item) => item.product.id != productId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(productId: string, quantity: number) {
    if (!this.cart) {
      return;
    }

    let cartItem = this.cart.items.find((item) => item.product.id === productId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    if (this.cart) {
      this.cart = new Cart();
      this.setCartToLocalStorage();
    }
  }


  // send Observable from the cart NOT Subject BECAUSE
  // if send Subject, changing the value of the Subject from outside of the CART SERVICE would be possible
  getCartObservable(): Observable<Cart | null> {
    return this.cartSubject.asObservable();
  }

  // get the latest value ot the cart subject
  getCart(): Cart | null {
    return this.cart;
  }

  private getCurrentUserCartId(): string | null {
    const user = this.userStateService.currentUser;
    return user ? user.id : null;
  }

  private getCartFromLocalStorage(userId: string): Cart | null {
    const cartJson = localStorage.getItem(`Cart_${userId}`);
    return cartJson ? JSON.parse(cartJson) : null;
  }

  private setCartToLocalStorage(): void {
    const userId = this.getCurrentUserCartId();
    if (!userId || !this.cart) {
      return;
    }

    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    this.cart.user = userId;

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem(`Cart_${userId}`, cartJson);
    this.cartSubject.next(this.cart);
  }
}








