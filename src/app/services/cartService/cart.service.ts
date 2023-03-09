import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cartItem/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = []; // our shopping cart // array of cartItem Objects

  totalPrice: Subject<number> = new Subject<number>();
  // we can use subject to publish event in our code
  //will be sent to all of the subscribers
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
      let alreadyExistsInCart: boolean = false;
      let existingCartItem: CartItem | undefined;

      if (this.cartItems.length > 0) {
          //find the item in the cart based on item id
          for (let tempcartItem of this.cartItems) {
            if (tempcartItem.id === theCartItem.id) {
                existingCartItem = tempcartItem;
                break;
            }
          }
          alreadyExistsInCart = (existingCartItem != undefined);
      }
      if (alreadyExistsInCart) {
          //increment the quantity
          existingCartItem!.quatity++ ; // '!' is possibly 'undefined'.ts(18048)
      }else{
        //juste push the item to the array
        this.cartItems.push(theCartItem);
      }
      this.computeCartTotals();
  }
        computeCartTotals() {

        }
}
