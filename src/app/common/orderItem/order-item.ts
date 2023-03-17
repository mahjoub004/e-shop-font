import { CartItem } from "../cartItem/cart-item";

export class OrderItem {
  imageUrl!: string ;
  unitPrice!: number;
  quantity!:number;
  productId!:string;

  constructor(cartItem: CartItem ){
    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quatity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
  }
}
