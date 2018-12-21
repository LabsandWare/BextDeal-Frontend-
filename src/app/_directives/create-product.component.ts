import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../_models';

import { ProductsService, ProductcategoryService } from "../_services";
import { ProductCategory } from "../_models";

@Component({
  selector: 'app-create-product',
  template: 
    `<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <div class="form-group row">
        <label for="productName" class="col-sm-5 col-form-label">Product Name</label>
        <div class="col-sm-7">
          <input formControlName="productName" type="text" class="form-control" id="productName" placeholder="Product Name" required />
        </div>
      </div>
      <div class="form-group row">
        <label for="productCategory" class="col-sm-5 col-form-label">Product Category</label>
        <div class="col-sm-7">
          <select name="productCategory" id="productCategory" class="form-control" formControlName="productCategory" >
            <option value="" disabled>Choose a Category</option>
            <option *ngFor="let productCategory of productCategories "  [ngValue]="productCategory">{{productCategory.product_category}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="productCost" class="col-sm-5 col-form-label">Product Actual Cost</label>
        <div class="col-sm-7">
          <input formControlName="productCost" name="productCost" type="text" class="form-control" id="productCost" placeholder="Product Actual Cost"
            required />
          <div *ngIf="submitted" class="invalid-feedback">
            <div *ngIf="">Product Actual Cost is required</div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="imageUpload" class="col-sm-5 col-form-label">Upload Image</label>
        <div class="col-sm-7">
          <input formControlName="productImage" type="file" class="form-control-file" (change)="onFileChanged($event)" id="imageUpload" accept=".jpg,.jpeg,.png" required/>
        </div>
      </div>
      <br />
      <br />
      <div class="row"  mat-dialog-actions>
        <div class="col">
          <button class="btn btn-danger btn-sm btn-block" (click)="onNoClick()"> Cancel </button>
        </div>
        <div class="col">
          <button [disabled]="!productForm.valid" class="btn btn-outline-success btn-sm btn-block" type="submit"> Submit </button>
        </div>
      </div>
    </form>`
})
export class CreateProductComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  loading = false;
  selectedFile: File;

  productForm = new FormGroup ({
    productName: new FormControl('', Validators.required),
    productCategory: new FormControl('', Validators.required),
    productCost: new FormControl('', Validators.required),
    productImage: new FormControl(null, Validators.required)
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductComponent>,  
    private productcategoryService: ProductcategoryService,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) data 
  ) { }

    ngOnInit() {
      this.getCategory();    
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    }

    getCategory() {
      this.productcategoryService.getProductCategory()
        .then(res => {
          this.productCategories = res;
        });
      ;
    }

    onSubmit() {
      this.loading = true;

      this.productForm.value.productImage = this.selectedFile;

      this.dialogRef.close(this.productForm.value);

    }

  }