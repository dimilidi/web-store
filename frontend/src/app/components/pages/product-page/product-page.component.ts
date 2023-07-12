import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product!: Product;

  constructor(activatedRoute: ActivatedRoute, productService: ProductService ){
    activatedRoute.params.subscribe((params)=> {
      if(params.id)
      this.product = productService.getProductById(params.id);
    })
  }
}
