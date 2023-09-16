import { Component, OnInit } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products!: Product[];
  orders!: Order[];
  sales!: Order[];
  users!: User[];
  customers!: User[];
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProducts().subscribe();

    this.getOrders().subscribe(() => {
      this.getPaidOrders();
    });

    this.userService.getAllUsers().subscribe();
    this.getAllUsers();
  }

  getProducts() {
    return this.productService.getAll().pipe(
      tap({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getOrders() {
    return this.orderService.getAllOrders().pipe(
      tap({
        next: (res) => {
          this.orders = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getPaidOrders() {
    this.sales = this.orders?.filter((order) => order.status === 'PAYED');
  }

  getAllUsers() {
    let usersObservable = this.userService.getAllUsers();
    usersObservable.subscribe((res) => {
      this.users = res.data;
      this.getAllCustomers(); // Call getAllCustomers() after users data is available
    });
  }

  getAllCustomers() {
    if (this.users && this.users.length > 0) {
      this.customers = this.users.filter((user) =>
        user.roles.some((role) => role.role !== 'Admin')
      );
      console.log(this.customers);
    } else {
      console.error('Users data is not properly initialized.');
    }
  }
}
