import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge'

import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { User, ProductCategory } from '../_models';

import { AlertService, ProductcategoryService } from "../_services";
import { CreateCategoryproductComponent } from "../_directives";
import { Product } from "../_models";
import { from, of, merge } from 'rxjs';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductCategoryComponent implements OnInit {

  dataSource: CategoryDataSource | null;
  currentUser: User;
  users: User[] = [];
  productCategory: ProductCategory[] = [];

  constructor( 
    private router: Router, 
    private productcategoryService: ProductcategoryService,
    private alertService: AlertService,
    public dialog: MatDialog
   ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit(): void {
    this.dataSource = new CategoryDataSource(this.productcategoryService);
  }

  openDialog(): void {

    const dialogConfig =  new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.productCategory;
    dialogConfig.minHeight = '50%';

    const dialogRef = this.dialog.open(CreateCategoryproductComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(data => {
        this.productcategoryService.createProductCategory(data);
      });

  }

}

export class CategoryDataSource extends DataSource<ProductCategory> {
  constructor(private productcategoryService: ProductcategoryService ) {
    super(); 
  }
  
  subject: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);

  connect(): Observable<ProductCategory[]> {
    this.productcategoryService.getProductCategory()
      .then(res => {
        this.subject.next(res);
      });
      return Observable.merge(this.subject);
  }

  disconnect() {

  }


}