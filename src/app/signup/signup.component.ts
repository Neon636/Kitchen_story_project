import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NehaService } from '../neha.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userdetails: any = {};

  srno: number = 0;
  users: any = [];
  signupForm: any;
  clicked: boolean = false;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private nehaangular: NehaService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  responseError: any;
  signup() {
    if (this.signupForm.valid) {
      console.log('values entered by user are:', this.userdetails);
      var temp = { ...this.userdetails }; ///... --> spread operator
      this.users.push(temp);
      this.clicked = true;

      //posting data to the backend
      var url = 'https://apifromashu.herokuapp.com/api/register';
      this.nehaangular.signup(url, this.userdetails).subscribe({
        next: (response: any) => {
          console.log('Response from signup api', response);
          if (response.message == 'User Already Exists') {
            this.responseError = 'Entered user has already been registered';
          } else {
            alert('signup successful! Redirecting to login...');
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.responseError = 'Please provide credentials';
          console.log('Error from signup api', error);
        },
      });
    } else {
      this.responseError =
        'Invalid credentials!! Please enter valid credentials';
    }
  }

  ngOnInit() {}
}
