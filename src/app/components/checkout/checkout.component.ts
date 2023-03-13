import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;  //declare our form group

  constructor(private formBuilder : FormBuilder ) { } // injecte the form builder

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
          firstName:[''],
          lastName:[''],
          email:['']
        })
    });
    shippingAdress: this.formBuilder.group({ //expédition
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:[''],
    })
    BillingAdress: this.formBuilder.group({ // facturation
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:[''],
    })
    creditCard: this.formBuilder.group({ // facturation
      cardType:[''],
      nameOnCard:[''],
      cardNumber:[''],
      securityCode:[''],
      expirationMonth:[''],
      expirationYear:[''],
    })
  }

  onSubmit(){
    console.log("handling the submit buttom");
    console.log(this.checkoutFormGroup.get('customer')?.value);


  }

}
