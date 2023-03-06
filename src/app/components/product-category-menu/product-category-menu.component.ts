import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories : ProductCategory[] = [];

  constructor(private productService : ProduitService) { }

  ngOnInit(): void {
    this.listProductsCategories();

  }
  listProductsCategories() {

      this.productService.getProductCategories().subscribe(
        (data: ProductCategory[]) => {
            console.log('Product Categories ' + JSON.stringify(data));
            this.productCategories = data;
            console.log(data);


          }
      );

  }

}
