import { Component, OnInit } from '@angular/core';
import { Product } from './common/product';
import { ProduitService } from './services/produit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
