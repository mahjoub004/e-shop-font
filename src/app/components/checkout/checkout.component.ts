import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

checkoutFormGroupe : FormGroup | undefined; //declare our form group

  constructor(private formBuilder : FormBuilder ) { } // injecte the form builder

  ngOnInit(): void {
    this.checkoutFormGroupe = this.formBuilder.group({
        customer: this.formBuilder.group({
          firstName:[''],
          lastName:[''],
          email:['']
        })
    });
  }

}
