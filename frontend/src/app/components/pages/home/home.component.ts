import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
 
  constructor(private productService: ProductService, activatedRoute: ActivatedRoute, private cartService: CartService){
    activatedRoute.params.subscribe((params)=> {
      if(params.searchTerm)
      this.products = this.productService.getAllProductsBySearchTerm(params.searchTerm);
      else if(params.tag)
      this.products = this.productService.getAllProductsByTags(params.tag);
      else
      this.products = productService.getAll();
    })

    
  }

 
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    //this.router.navigateByUrl('/cart-page');
  }



}
