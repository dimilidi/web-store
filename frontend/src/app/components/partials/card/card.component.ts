import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Favourite } from 'src/app/shared/interfaces/Favourite';
import { Product } from 'src/app/shared/models/Product';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';


export enum CardSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  products: Product[] = [];
  favouriteProducts!: Favourite[];
  user: User = this.userService.currentUser;
  tag!: Tag;
  toggledProduct!: string;
  cardSize!: CardSize 

  @Input() product!: Product;
   @Input() favoriteProductsSet!: Set<string>;
  @Input() set size(size: CardSize) {
    this.cardSize = size;
  }
  @Output() favoriteToggled: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private userService: UserService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private route: Router
  ) {}

  ngOnInit(): void {
 
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
    // Emit the favoriteToggled event
    this.favoriteToggled.emit();
  }




}
