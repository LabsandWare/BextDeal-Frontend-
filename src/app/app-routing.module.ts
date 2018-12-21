import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { AdminComponent } from "./admin/admin.component";
import { ProductsComponent } from "./products/products.component"
import { ProductCategoryComponent } from "./productcategory/productcategory.component";

import { AuthGuard } from './_guards';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'product', component: ProductsComponent},
      { path: 'productcategory', component: ProductCategoryComponent },

      { path: '**', redirectTo: 'product' }
    ]  
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
