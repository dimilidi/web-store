import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Observable, Subscription, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../partials/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ServerResponse } from 'src/app/shared/interfaces/ServerResponse';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{
  isSearchBarVisible: boolean = false;

  private isSearchBarVisibleSubscription: Subscription;
  displayedColumns: string[] = [
    'name',
    'tags',
    'price',
    'origins',
    'date',
    'imageUrl',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private orderService: OrderService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {this.isSearchBarVisibleSubscription = new Subscription();}

  ngOnInit(): void {
    this.getProducts();

    this.dataService.isSearchBarVisible$.subscribe((isVisible:boolean) => {
      console.log(isVisible);
      
      this.isSearchBarVisible = isVisible;
    });
  }

  ngOnDestroy(): void {
    //this.isSearchBarVisibleSubscription.unsubscribe();
  }


  openDialog() {
    this.dialog
      .open(DialogComponent, { width: '100%', maxWidth: '400px' })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getProducts();
        }
      });
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
        this.dataSource = new MatTableDataSource(serverProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, { data: row, width: '100%', maxWidth: '400px'  })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getProducts();
        }
      });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.toastrService.success(
          'Product deleted successfully',
          'Product Deleted'
        );
        this.getProducts();
      },
      error: (error) => {
        console.log(error);

        this.toastrService.error(
          'Product Delete Error',
          'Error while deleting Product'
        );
      },
    });
  }
}
