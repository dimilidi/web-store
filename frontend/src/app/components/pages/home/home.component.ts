import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  favoriteProductsSet: Set<string> = new Set();
  products: Product[] = [];
  user: User = this.userService.currentUser;
  tag!: Tag;
 
  constructor(private userService: UserService, private productService: ProductService, private activatedRoute: ActivatedRoute, private cartService: CartService, private route: Router){
     // Subscribe to userSubject to update the user object when the user logs in or out
     this.userService.userObservable.subscribe((user) => {
      this.user = user;
      this.productService.getFavoriteProducts;
    });
    

  }

  ngOnInit():void {
    let productsObservable:Observable<Product[]>;
    this.activatedRoute.params.subscribe((params)=> {
      if(params.searchTerm)
      productsObservable = this.productService.getAllProductsBySearchTerm(params.searchTerm);
      else if(params.tag)
      productsObservable = this.productService.getAllProductsByTag(params.tag);
      else
      productsObservable = this.productService.getAll();

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      })
    })


    if (this.user.id) {
      this.productService.getFavoriteProducts(this.user.id).subscribe((favoriteProducts) => {
        console.log(favoriteProducts[0].product);
        
        favoriteProducts.forEach((product) => {
          this.favoriteProductsSet.add(product.product.id);
          console.log('SET',this.favoriteProductsSet);
          
        });
      });
    }

  }


 
 
  addToCart(product: Product) {
    if (!this.user.id) {
      this.route.navigateByUrl('/login');
    } else {
      this.cartService.addToCart(product);
      this.route.navigateByUrl('/cart-page');
    }
   
  }


  toggleFavourite(product: Product) {
    if(!this.user.id) return;
    const newFavoriteStatus = !product.favorite;

    this.productService.toggleFavorite(product.id, this.user.id).subscribe({
      next: (response) => {
        product.favorite = newFavoriteStatus;

        if (newFavoriteStatus) {
          this.favoriteProductsSet.add(product.id);
        } else {
          this.favoriteProductsSet.delete(product.id);
        }
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

  onShowCategory(event:any): void {
    this.tag = event;
    console.log(this.tag);
    
  }

  
}
