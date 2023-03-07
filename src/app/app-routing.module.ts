import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';

const routes: Routes = [
  {path:'search/:keyword' , component: ProductListComponent},
  {path:'search/:id' , component: ProductsDetailsComponent},

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
