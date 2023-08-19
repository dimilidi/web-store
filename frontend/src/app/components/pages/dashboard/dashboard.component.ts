import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../partials/dialog/dialog.component';
import { MatDialog, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'tags', 'price', 'origins', 'date','imageUrl', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.getProducts();
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
        //this.products = serverProducts;
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
    this.dialog.open(DialogComponent,{data: row, width:'30%'} );
  }
}
