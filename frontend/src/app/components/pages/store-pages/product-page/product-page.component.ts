import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements  OnInit {
  user: User = this.userStateService.currentUser;
  product!: Product;
  favoriteProductsSet: Set<string> = new Set<string>();
  isRateMode: boolean = true;
  showDropdown: boolean = false;
  isOptionSelectedFlag: boolean = false;
  selectedMode: string = 'View';
  modeOptions: { value: string; label: string }[] = [
    { value: 'View', label: 'View' },
    { value: 'Rate', label: 'Rate' }
  ];

  ngOnInit():void {
    this.getFavouriteProducts();
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private userStateService: UserStateService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        productService.getProductById(params.id).subscribe((serverProduct) => {
          this.product = serverProduct;
        });
    });
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = Number(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }

  addToCart() {
    if (!this.user.id) {
      this.router.navigateByUrl('/login');
    } else {
      this.cartService.addToCart(this.product);
      this.router.navigateByUrl('/cart-page');
    }
  }

  updateStars(stars: number, productId: string) {
    this.productService.updateProductStars(stars, productId).subscribe({
      next: (updatedProduct: Product) => {
        console.log(updatedProduct.stars);
        console.log(updatedProduct);


        // Update local product data with new stars and average rating
        this.product.stars = updatedProduct.stars;
        this.product.numRatings = updatedProduct.numRatings;
        this.product.averageRating = updatedProduct.averageRating;
      },
      error: (error: any) => {
        console.error('Error updating product stars:', error);
      },
    });
  }

  // Method to handle mode selection change
  onModeSelectionChange(event: any) {
    this.selectedMode = event.value;
    this.isOptionSelectedFlag = true;
  }

  isOptionSelected() {
    return this.isOptionSelectedFlag;
  }


  getFavouriteProducts() {
    if (this.user.id) {
      this.productService.getFavoriteProducts(this.user.id).subscribe((favoriteProducts) => {
        favoriteProducts.forEach((product) => {          
          this.favoriteProductsSet.add(product.product.id);
        });
      });
    }
  }

  toggleFavourite(product: Product) {
    if (!this.user.id) return;

    return this.productService.toggleFavorite(product.id, this.user.id)
      .subscribe({
        next: (response) => {
          if (response.product === undefined) {
            this.favoriteProductsSet.delete(product.id);
          } else {
            this.favoriteProductsSet.add(product.id);
          }
        },
        error: (error) => {
          console.error('Error toggling favorite status:', error);
        },
      });
  }

  get isAuth() {
    return this.userStateService.currentUser.token;
  }
}
