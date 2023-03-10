import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cartItem/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cartService/cart.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId!: number;
  searchMode: boolean = false;
  p:number = 1;

  constructor(
    private productService: ProduitService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }


  handleSearchProducts() {
    const thekeyWord:string = (this.route.snapshot.paramMap.get('keyword'))!;
    // search for the products using keyword
    this.productService.searchProducts(thekeyWord).subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    )
  }
/**/

  handleListProducts() {
    //chech if "id" parametre is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // get the "id" param string. couvert string to a number using the "+" symbol
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available
      this.currentCategoryId = 1;
    }
    // now get the products for the given category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }

  addToCart(theProduct: Product){
      console.log(`adding to cart: ${theProduct.name} and ${theProduct.unitPrice}`);
      console.log("data");
      //.........
      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);

  }
}
