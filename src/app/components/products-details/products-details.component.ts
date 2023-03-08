import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product! : Product;
  constructor(private productService : ProduitService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handlerProductDetailes();
    })
  }
  handlerProductDetailes() {
   //get the "id" param string convert string to a number using the "+" symbol
   const theProductId: number = +(this.route.snapshot.paramMap.get('id'))!;
   this.productService.getProducts(theProductId).subscribe(
    data => {
      this.product = data ;
      console.log("data");

    }
   )
  }

}
