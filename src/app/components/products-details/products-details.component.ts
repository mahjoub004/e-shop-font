import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cartItem/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cartService/cart.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product! : Product;
  constructor(private productService : ProduitService,
              private cartService : CartService ,
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
  addToCart(){
      console.log(`adding to cart: ${this.product.name} , ||| ${this.product.unitPrice}`);
      const theCartItem = new CartItem(this.product);
      this.cartService.addToCart(theCartItem);

  }

}
