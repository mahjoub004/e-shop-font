import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country/country';
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

  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopServiceFormService
  ) {} // injecte the form builder and form service

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
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

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  onSubmit() {
    console.log('handling the submit buttom');
    console.log(this.checkoutFormGroup.get('customer')?.value);
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
}
