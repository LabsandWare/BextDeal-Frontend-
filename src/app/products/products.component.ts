import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge'


import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { User } from '../_models';

import { AlertService, ProductsService } from "../_services";
import { CreateProductComponent } from "../_directives";
import { Product } from "../_models";
import { from, of, merge } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataSource: ProductDataSource | null;
  currentUser: User;
  users: User[] = [];
  product: Product[] = [];
  
  constructor( 
    private router: Router, 
    private productsService: ProductsService,
    private alertService: AlertService,
    public dialog: MatDialog
   ) {  
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dataSource = new ProductDataSource(this.productsService);
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.product;
    dialogConfig.minWidth = '50%';

    const dialogRef = this.dialog.open(CreateProductComponent,  dialogConfig);

    dialogRef.afterClosed()
      .subscribe(data => {
        this.productsService.createProduct(data);
      });

  }

  rowClicked(row: any): void {
    console.log(row);
  }

}

export class ProductDataSource extends DataSource<Product> {

  constructor( private productsService: ProductsService ) { super() }

    subject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    connect(): Observable<Product[]> {
      
      this.productsService.getProducts()
        .then(res => {
            this.subject.next(res);
        });
        return Observable.merge(this.subject)
    }

    disconnect() {
      this.subject.complete();
      this.subject.observers = [];
    }

}