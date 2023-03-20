import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country/country';
import { Order } from 'src/app/common/order/order';
import { OrderItem } from 'src/app/common/orderItem/order-item';
import { Purchase } from 'src/app/common/purchase/purchase';
import { State } from 'src/app/common/state/state';
import { CartService } from 'src/app/services/cartService/cart.service';
import { CheckoutService } from 'src/app/services/checkoutService/checkout.service';
import { ShopServiceFormService } from 'src/app/services/shopServiceForm/shop-service-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; //declare our form group

   totalPrice :number = 0;
   totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopServiceFormService,
    private cartService : CartService,
    private checkoutService : CheckoutService,
    private router : Router
  ) {} // injecte the form builder and form service

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),

      shippingAddress: this.formBuilder.group({
        //expédition
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),

        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),

        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),
      }),

      billingAddress: this.formBuilder.group({
        // facturation
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),

        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),

        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),
      }),
      //
      creditCard: this.formBuilder.group({
        // credit card validation
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //populate credit card
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);
    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months' + JSON.stringify(data));
      this.creditCardMonth = data;
    });
    //populate credit card years
    this.shopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years' + JSON.stringify(data));
      this.creditCardYears = data;
    });
    //populate countries
    //populate credit card years
    this.shopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved credit card years' + JSON.stringify(data));
      this.countries = data;
    });



  }

  reviewCartDetails() {
      //subscribe to cartService .totalPrice
     this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice);
      //subscribe to cartService .totalQuantity
        this.cartService.totalQuantity.subscribe(
          totalQuantity => this.totalQuantity = totalQuantity);
  }


  //diplay Validation error
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  // shipping validation
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
// billing validation
get billingAddressStreet() {
  return this.checkoutFormGroup.get('billingAddress.street');
}
get  billingAddressCity() {
  return this.checkoutFormGroup.get('billingAddress.city');
}
get  billingAddressState() {
  return this.checkoutFormGroup.get('billingAddress.state');
}
get  billingAddressZipCode() {
  return this.checkoutFormGroup.get('billingAddress.zipCode');
}
get  billingAddressCountry() {
  return this.checkoutFormGroup.get('billingAddress.country');
}
//credit card valodation
get  creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType');}
get  creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard');}
get  creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber');}
get  creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode');}
//
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      //bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }


  onSubmit() {
    console.log('handling the submit buttom');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //set up cart items (configuration)
    const cartItems = this.cartService.cartItems;

    //create orderItems from cartItems
    let orderItems : OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //set up purchase
    let purchase = new Purchase();

    //populate purchase - customer
      purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate purchase  - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState:State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry:Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    //populate purchase  - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState:State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry:Country = JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    //populate purchase order and order items
    purchase.order = order;
    purchase.orderItems = orderItems;


    //call REST API via the checkoutService
      this.checkoutService.placeOrder(purchase).subscribe({
        next: response => { // success/happy
          console.log("salut ca va ");
            console.log(response);

          alert(`Your order has been received.\n Order traking number:${response.orderTrackingNumber}`);
          // reset cart
          this.resetCart();
        },
        error : err => {
          console.log("error je suis la la ");

          alert(`there was an error : ${err.message}`)
        }  // error: error/exception
      }
      )
  }
//
  resetCart(){
      //reset cart data
      this.cartService.cartItems = [];
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
      //reset the form
      this.checkoutFormGroup.reset();
      //navigation back to the products page
      this.router.navigateByUrl("/products");
  }
//
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYears: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );
    //if the current year aquls the selected year, then start with the current month
    let startMonth: number;
    if (currentYears === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('retrieved credit card monthd :' + JSON.stringify(data));
      this.creditCardMonth = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country name ${countryName}`);
    console.log(`${formGroupName} country code ${countryCode}`);

    this.shopFormService.getState(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      //select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
