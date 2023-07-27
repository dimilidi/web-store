import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  user: User = this.userService.currentUser;
  product!: Product;
  isRateMode: boolean = true;
  showDropdown: boolean = false;
  isOptionSelectedFlag: boolean = false;
  selectedMode!: string;
  modeOptions: { value: string; label: string }[] = [
    { value: 'Rate', label: 'Rate' },
    { value: 'View', label: 'View' },
  ];

  ngOnInit() {
    // Set default value to "rate" on initialization
    this.selectedMode = 'View';
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private userService: UserService,
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
    this.cartService.addToCart(this.product);
    console.log(this.product);
    this.router.navigateByUrl('/cart-page');
  }

  updateStars(stars: number, productId: string) {
    this.productService.updateProductStars(stars, productId).subscribe({
      next: (updatedProduct: Product) => {
        console.log(updatedProduct);

        // Success: Product stars updated on the backend
        console.log('Product stars updated on the backend.');

        // Update local product data with new stars and average rating
        this.product.stars = updatedProduct.stars;
        this.product.numRatings = updatedProduct.numRatings;
        this.product.averageRating = updatedProduct.averageRating;
      },
      error: (error: any) => {
        // Error handling if the API call fails
        console.error('Error updating product stars:', error);
        // You can display an error message to the user if needed
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

  toggleFavourite(product: Product) {
    const newFavoriteStatus = !product.favorite;

    this.productService.toggleFavorite(product.id, this.user.id).subscribe({
      next: (response) => {
        product.favorite = newFavoriteStatus;
        // Success: Product's favorite status updated on the backend
        console.log('Product favorite status updated on the backend.');
      },
      error: (error) => {
        // Error handling if the API call fails
        console.error('Error toggling favorite status:', error);
        // If the API call fails, revert the 'favorite' property back to its original value
        product.favorite = !product.favorite;
        console.log('Failed to update product favorite status on the backend.');
      },
    });
  }
}
