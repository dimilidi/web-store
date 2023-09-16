import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit{
  orders!: Order[];
  users!: User[];
  isSearchBarVisible: boolean = false;
  showProductId: number | null = null;
  private isSearchBarVisibleSubscription!: Subscription;
  displayedColumns: string[] = [
    'id',
    'status',
    'products',
    'totalPrice',
    'createdAt',
    'name',
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

    this.dataSource = new MatTableDataSource<Order>([]);
  }

  ngOnDestroy(): void {
    //this.isSearchBarVisibleSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();

    this.dataSource = new MatTableDataSource<Order>([]);

    this.dataService.isSearchBarVisible$.subscribe((isVisible: boolean) => {
      this.isSearchBarVisible = isVisible;
    });
  }


  loadData() {
    // Load all orders (default behavior)
    this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders.data;

      const transformedOrders: any[] = orders.data.map((originalOrder: any) => {
        // Extract product names from the original items array
        const productNames: string[] = originalOrder.items.map(
          (item: any) => item.product.name
        );

        // Create a new TransformedOrder object with items as product names
        return {
          id: originalOrder.id,
          name: originalOrder.name,
          address: originalOrder.address,
          totalPrice: originalOrder.totalPrice,
          createdAt: originalOrder.createdAt,
          status: originalOrder.status,
          items: productNames,
        };
      });

      this.dataSource = new MatTableDataSource(transformedOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
