import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';
import { ServerResponse } from 'src/app/shared/interfaces/ServerResponse';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders!: Order[];
  users!: User[];
  isSearchBarVisible: boolean = false;
  showProductId: number | null = null;
  private isSearchBarVisibleSubscription!: Subscription;
  displayedColumns: string[] = [
    'id',
    'status',
    'products',
    'price',
    'date',
    'customer',
    'address',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private orderService: OrderService,
  ) {
    this.isSearchBarVisibleSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.getAllOrders();

    this.dataService.isSearchBarVisible$.subscribe((isVisible: boolean) => {
      this.isSearchBarVisible = isVisible;
    });
  }

  ngOnDestroy(): void {
    //this.isSearchBarVisibleSubscription.unsubscribe();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getAllOrders() {
    let ordersObservable!: Observable<ServerResponse>;
    ordersObservable = this.orderService.getAllOrders();
    ordersObservable?.subscribe((orders) => {
      console.log('OOOO',orders);
      
      this.dataSource = new MatTableDataSource(orders.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
