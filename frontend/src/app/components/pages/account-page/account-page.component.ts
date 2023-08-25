import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Favourite } from 'src/app/shared/interfaces/Favourite';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';
import { CardSize } from 'src/app/components/partials/card/card.component'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  user: User = this.userService.currentUser;
  favouriteProducts!: Favourite[];
  favoriteProductsSet: Set<string> = new Set();
  CardSize = CardSize; 


  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getFavouriteProducts();
  }

  handleFavoriteToggled(product: Product) {
    console.log('tog');
    this.toggleFavourite(product)
    this.getFavouriteProducts();
  }

  handleEditAccount() {
    this.router.navigate(['edit-account']);
  }

  getFavouriteProducts() {
    if (this.user.id) {
      this.productService
        .getFavoriteProducts(this.user.id)
        .subscribe((favoriteProducts) => {
          favoriteProducts.forEach((product) => {
            this.favoriteProductsSet.add(product.product.id);
          });
          this.favouriteProducts = favoriteProducts;
        });
    }
  }


  toggleFavourite(product: Product) {
    if (!this.user.id) return;

    return this.productService.toggleFavorite(product.id, this.user.id)
      .subscribe({
        next: (response) => {
          if (response.product === undefined) {
            console.log('delete');
            this.favoriteProductsSet.delete(product.id);
          } else {
            this.favoriteProductsSet.add(product.id);
          }
          this.getFavouriteProducts();
        },
        error: (error) => {
          console.error('Error toggling favorite status:', error);
          this.getFavouriteProducts();
        },
      });
  }


  addToCart(product: Product) {
    if (!this.user.id) {
      this.router.navigateByUrl('/login');
    } else {
      this.cartService.addToCart(product);
      this.router.navigateByUrl('/cart-page');
    }
  }
}
