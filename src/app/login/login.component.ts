import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NehaService } from '../neha.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private nehaangular: NehaService,
    private http: HttpClient
  ) {
    if (localStorage['token']) {
      this.router.navigate(['**']);
    } else {
      this.loginForm = this.formbuilder.group({
        email: ['', [Validators.required, Validators.email]],

        password: ['', [Validators.required]],
      });
    }
  }

  responseError: any;
  userdetails: any = {};

  login() {
    if (this.loginForm.valid) {
      console.log('values entered by user are:', this.userdetails);
      var temp = { ...this.userdetails }; ///... --> spread operator

      var url = 'https://apifromashu.herokuapp.com/api/login';
      this.nehaangular.login(url, this.userdetails).subscribe({
        next: (response: any) => {
          console.log('Response from login api', response);
          if (response.token) {
            localStorage['token'] = response.token;
            //don't have to create a function
            localStorage['loggedinUser'] = response.email;

            var url = 'https://apifromashu.herokuapp.com/api/cakecart';
            let myheaders = new HttpHeaders();
            myheaders = myheaders.append('authtoken', localStorage['token']);
            var options = {
              headers: myheaders,
            };
            var body = {};
            this.nehaangular.getCartItems(url, body, options).subscribe({
              next: (response: any) => {
                console.log('Response from cart items api', response);
                this.nehaangular.cartitems = response.data;
              },
            });

            this.router.navigate(['/']);
          } else {
            this.responseError = 'Entered user has already been registered';
          }
        },
        error: (error) => {
          console.log('Error from login api', error);
          this.responseError = 'Please provide credentials';
        },
      });
    } else {
      this.responseError =
        'Invalid credentials!! Please enter valid credentials';
    }
  }

  ngOnInit(): void {}
}
