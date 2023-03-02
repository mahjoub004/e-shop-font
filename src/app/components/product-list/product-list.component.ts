import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  constructor( private productService : ProduitService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {this.products = data}
    )
  }
}
