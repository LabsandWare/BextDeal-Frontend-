import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule, MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AlertService, AuthenticationService, UserService } from './_services';
import { AlertComponent, CreateProductComponent, CreateCategoryProductComponent } from './_directives';
import { AuthGuard } from "./_guards";
import { ErrorInterceptor, JwtInterceptor  } from "./_helpers";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoryComponent } from './productcategory/productcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AlertComponent,
    SubscribeComponent,
    AdminComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductCategoryComponent,
    CreateCategoryProductComponent
  ],
  entryComponents: [
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
