import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from 'src/app/config/my-app-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin : any;

  constructor() {
  }

  ngOnInit(): void {

      }
}
