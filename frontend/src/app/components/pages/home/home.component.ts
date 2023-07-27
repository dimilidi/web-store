import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  user: User = this.userService.currentUser;
 
  constructor(private userService: UserService, private productService: ProductService, activatedRoute: ActivatedRoute, private cartService: CartService){
    let productsObservable:Observable<Product[]>;
    activatedRoute.params.subscribe((params)=> {
      if(params.searchTerm)
      productsObservable = this.productService.getAllProductsBySearchTerm(params.searchTerm);
      else if(params.tag)
      productsObservable = this.productService.getAllProductsByTag(params.tag);
      else
      productsObservable = productService.getAll();

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      })
    })


  }

 
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    //this.router.navigateByUrl('/cart-page');
  }


  toggleFavourite(product: Product) {
    const newFavoriteStatus = !product.favorite;

    this.productService.toggleFavorite(product.id, this.user.id).subscribe({
      next:(response) => {
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
      }}
    );
  }

  
}
