import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';

const routes: Routes = [
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
