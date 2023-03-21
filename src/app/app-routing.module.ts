import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';

import { LoginComponent } from './components/login/login.component';




const routes: Routes = [
  {path:'login' , component: LoginComponent},

  {path:'checkout' , component: CheckoutComponent},
  {path:'search/:keyword' , component: ProductListComponent},
  {path:'products/:id' , component: ProductsDetailsComponent},
  {path:'cart-details' , component: CartDetailsComponent},

  {path:'category/:id' , component: ProductListComponent},
  {path:'category' , component: ProductListComponent},
  {path:'products' , component: ProductListComponent},
  {path:'',redirectTo:'/products' , pathMatch:'full'},
  {path:'**',redirectTo:'/products' , pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
