import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country/country';
import { State } from 'src/app/common/state/state';
import { ShopServiceFormService } from 'src/app/services/shopServiceForm/shop-service-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; //declare our form group

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  countries : Country[] = [];
  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopServiceFormService
  ) {} // injecte the form builder and form service

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required , Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required , Validators.minLength(2)]),
        email: new FormControl('',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),

      shippingAddress: this.formBuilder.group({
        //expédition
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      billingAddress: this.formBuilder.group({
        // facturation
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        // facturation
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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
      //diplay Validation error
        get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
        get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
        get email(){return this.checkoutFormGroup.get('customer.email');}



  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
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
        console.log('je suis dans le if de onSubmit');

    }
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("the shipping address is " + this.checkoutFormGroup.get('customer')?.value.email);
    console.log("the shipping address country is "+ this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("the shipping address state is "+ this.checkoutFormGroup.get('shippingAddress')?.value.state.name);


  }


  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYears: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );
    //if the current year aquls the selected year, then start with the current month
    let startMonth: number;
    if (currentYears === selectedYear) {
      startMonth = new Date().getMonth()+ 1;
    } else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
      console.log('retrieved credit card monthd :' + JSON.stringify(data));
      this.creditCardMonth = data;
    });
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country name ${countryName}`);
    console.log(`${formGroupName} country code ${countryCode}`);

    this.shopFormService.getState(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
            this.shippingAddressStates = data;
        }else{
            this.billingAddressStates = data;
        }
        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }
}
