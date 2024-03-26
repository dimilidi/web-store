import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';
import { CardSize } from 'src/app/components/partials/card/card.component';
import { DataService } from 'src/app/services/data.service';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  favoriteProductsSet: Set<string> = new Set();
  products: Product[] = [];
  user!: User;
  tag!: Tag;
  toggledProduct!: string;
  CardSize = CardSize;
  isSearchBarVisible: boolean = false;
  isSmallScreen: boolean = false;

  private productsSubscription: Subscription;
  private isSearchBarVisibleSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private dataService: DataService,
    private route: Router,
    private userStateService: UserStateService
  ) {
    this.productsSubscription = new Subscription();
    this.isSearchBarVisibleSubscription = new Subscription();

    this.userStateService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getFavouriteProducts();

    this.dataService.isSearchBarVisible$.subscribe((isVisible) => {
      this.isSearchBarVisible = isVisible;
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.isSearchBarVisibleSubscription.unsubscribe();
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
          console.log('PRODUCTS', favoriteProducts);

          favoriteProducts.forEach((product) => {
            this.favoriteProductsSet.add(product.product.id);
          });
        });
    }
  }

  toggleFavourite(product: Product) {
    if (!this.user.id) return;

    return this.productService
      .toggleFavorite(product.id, this.user.id)
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

  handleFavoriteToggled(product: Product) {
    this.toggleFavourite(product);
    this.getFavouriteProducts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 700; 
  }
}
