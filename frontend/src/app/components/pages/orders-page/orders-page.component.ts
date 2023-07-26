import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { USER_ORDERS_URL } from 'src/app/shared/constants/urls';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  user: User = this.userService.currentUser;
  userId!: string;
  userOrders!: Order[]; 

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
   
      this.getUserOrders();
    
  }

  getUserOrders() {
    this.http
      .get<Order[]>(USER_ORDERS_URL)
      .subscribe(
        (orders) => {
          console.log(orders);
          
          this.userOrders = orders;
        },
        (error) => {
          console.error('Error fetching user orders:', error);
        }
      );
  }
}
