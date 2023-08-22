import {
  ChangeDetectorRef,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  favoriteProductsSet: Set<string> = new Set();
  products: Product[] = [];
  user: User = this.userService.currentUser;
  tag!: Tag;
  toggledProduct!: string;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getFavouriteProducts();
  }


  getProducts() {
    let productsObservable: Observable<Product[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        productsObservable = this.productService.getAllProductsBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        productsObservable = this.productService.getAllProductsByTag(
          params.tag
        );
      else productsObservable = this.productService.getAll();

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      });
    });
  }

  addToCart(product: Product) {
    if (!this.user.id) {
      this.route.navigateByUrl('/login');
    } else {
      this.cartService.addToCart(product);
      this.route.navigateByUrl('/cart-page');
    }
  }

  getFavouriteProducts() {
    if (this.user.id) {
      this.productService
        .getFavoriteProducts(this.user.id)
        .subscribe((favoriteProducts) => {
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

  onShowCategory(event: any): void {
    this.tag = event;
  }
}
