import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit{
  orders!:Order[];
  users!:User[];

  constructor(private orderService: OrderService, private toastrService: ToastrService, private userService : UserService) {}


  ngOnInit(): void {
    this.getAllOrders().subscribe();
   
  }

  getAllOrders() {
   return this.orderService.getAllOrders().pipe(
      tap({
        next: (res) => {
          console.log(res);
          this.orders = res.data;
          this.toastrService.success('Orders retrieved successfully', res.message);
        },
        error: (errors) => {
          console.log(errors);
          this.toastrService.error(errors.error, 'Error by fetching orders.')
        }
      })
    )
  }

}
