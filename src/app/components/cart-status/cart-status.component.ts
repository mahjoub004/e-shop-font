import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice : number = 0.00;
  totalQuantity : number = 0;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    //subscribe to the cart totalRice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
      //lorsque de nouveaux événements sont reçus, effectuez les affectations pour mettre à jour l'interface utilisateur
    );
  }

}
