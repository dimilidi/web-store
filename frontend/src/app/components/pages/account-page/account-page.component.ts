import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Favourite } from 'src/app/shared/interfaces/Favourite';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  user: User = this.userService.currentUser;
  favoriteProductsSet: Set<string> = new Set();
  favouriteProducts!: Favourite[];

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
   this.getFavouriteProducts();
    console.log(this.favoriteProductsSet);
    
  }

  handleEditAccount() {
    this.router.navigate(['edit-account']);
  }

  getFavouriteProducts() {
    if (this.user.id) {
      this.productService
        .getFavoriteProducts(this.user.id)
        .subscribe((favoriteProducts) => {
          this.favouriteProducts = favoriteProducts;
          
        });
    }
  }
}
