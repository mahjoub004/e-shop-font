import { Address } from "../address/address";
import { Customer } from "../customer/customer";
import { Order } from "../order/order";
import { OrderItem } from "../orderItem/order-item";

export class Purchase {
  customer! :Customer;
  shippingAddress!: Address;
  billingAddress!:Address;
  order!: Order;
  orderItems!: OrderItem[];
}
