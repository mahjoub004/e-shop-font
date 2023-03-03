import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId!: number;

  constructor( private productService : ProduitService,
                private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }
  listProducts() {
    //chech if "id" parametre is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');

    // get the "id" param string. couvert string to a number using the "+" symbol
    if (hasCategoryId ) {
        this.currentCategoryId = (+this.route.snapshot.paramMap.get('id')!);
    }else{
      // not category id available
      this.currentCategoryId = 1 ;
    }
      // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {this.products = data}
    )
  }
}
