import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import  OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/config/my-app-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin : any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo:'assets/img/products.logo.jpg',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      lientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirctUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el:'#okta-sign-in-widget' },// this name should be same as div tag id in login.componet/html

        (response:any) => {
            if (response === 'SUCCESS') {
                this.oktaAuth.signInWithRedirect();
            }
        },
          (error: any) => {
            throw error;
          }


      )


      }
}
