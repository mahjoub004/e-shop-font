import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',

})
export class ProduitService {

  //http://localhost:8080/api/product-category/2/products

  private baseUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient : HttpClient ) { }

  getProductList(_theCategoryId: number = 1): Observable<Product[]>{
    //@TODO : need to build URL based on category ID .. will come back to this
    const searchUrlById = `http://localhost:8080/api/product-category/${_theCategoryId}/products`

    return this.httpClient.get<GetResponseProduct>(searchUrlById).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable <ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.baseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}



  interface GetResponseProduct{
    _embedded:{
      products:Product[];
    }
  }

  interface GetResponseProductCategory{
    _embedded:{
      productCategory:ProductCategory[];
    }
  }

