import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users!: User[];
  orders!: Order[];
  isSearchBarVisible: boolean = false;
  showProductId: number | null = null;
  private isSearchBarVisibleSubscription!: Subscription;
  displayedColumns: string[] = [
    'avatar',
    'name',
    'role',
    'email',
    'phone',
    'address',
    //'orders'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.isSearchBarVisibleSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe();
    this.getAllUsers();
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

  getAllUsers() {
    let usersObservable = this.userService.getAllUsers();
    usersObservable?.subscribe((users) => {
      console.log(users);
      
      this.dataSource = new MatTableDataSource(users.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
