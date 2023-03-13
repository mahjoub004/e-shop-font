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
      let alreadyExistsInCart: boolean = false; //deja
      let existingCartItem: CartItem | undefined;

      if (this.cartItems.length > 0) {
        //find the item in the cart based on item id
        //
        existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)
        //return first elemnt that passes else return undefind /// cartItems( current array element) //(tempCartItem.id === theCartItem.id)test conditional

      //check if we found it
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
            let totalPriceValue: number = 0;
            let totalQuantityValue: number = 0;

            for (let currentCartItem of this.cartItems) {
                totalPriceValue += currentCartItem.quatity * currentCartItem.unitPrice;
                totalQuantityValue += currentCartItem.quatity
            }
            // publish the new value ... all subscribers will receive the new data
            this.totalPrice.next(totalPriceValue); // next() publish / send event
            this.totalQuantity.next(totalQuantityValue);

            //log cart data just for debugging purposes

            this.logCartdata(totalPriceValue, totalQuantityValue)
        }
          logCartdata(totalPriceValue: number, totalQuantityValue: number) {
              console.log("content of the cart");
              for (const tempcartItem of this.cartItems) {
                  const subTotalPrice = tempcartItem.quatity * tempcartItem.unitPrice;

                  console.log(`name: ${tempcartItem.name} , quantity= ${tempcartItem.quatity}, unitPrice = ${tempcartItem.unitPrice}

                  subTotalPrice : ${subTotalPrice}`);
              }
              console.log(`totalPrice: ${totalPriceValue.toFixed(2)} , totalQuantity: ${totalQuantityValue}`);
              console.log("----------------------------");
          }
          decrementQuantity(theCartItem: CartItem) {
            theCartItem.quatity-- ;
            if (theCartItem.quatity === 0) {
              this.remove(theCartItem)
            }else{
              this.computeCartTotals;
            }
      }
        remove(theCartItem: CartItem) {
          //get index of items in ths array;
          const itemsIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
          //if found , remove the items from the array at the give index
          if (itemsIndex > -1) {
              this.cartItems.splice(itemsIndex, 1) // At position  itemsIndex, remove 1 items:
              this.computeCartTotals();
          }
        }
      }
