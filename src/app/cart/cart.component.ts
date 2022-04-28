import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any = [];
  totalPrice: any = 0;
  isloggedin: any;

  constructor(
    private nehaangular: NehaService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    if (localStorage['token']) {
      this.isloggedin = true;
      this.ngxService.start();
    } else {
      this.isloggedin = false;
    }

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
        this.cartitems = response.data;
        console.log('cart items:', this.cartitems[0]);
        nehaangular.setCartVal(this.cartitems);
        this.cartitems.forEach((each: any) => {
          this.totalPrice = this.totalPrice + each.price * each.quantity;
        });
        this.ngxService.stop();
      },
      error(error: any) {
        console.log('Error from cart items api', error);
      },
    });
  }

  increase_quantity(index: any) {
    /*var url = 'https://apifromashu.herokuapp.com/api/addcaketocart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      name: this.cartitems[index].name,
      cakeid: this.cartitems[index].cakeid,
      price: this.cartitems[index].price,
      image: this.cartitems[index].image,
      weight: this.cartitems[index].weight,
    };
    console.log(body);
    this.nehaangular.inc_quant(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from increase quantity api', response);
        if (response.data) {
          //window.location.reload();
          this.cartitems[index].quantity += 1;
          // this.totalPrice=0
          // this.cartitems.forEach((each:any)=>{
          //   this.totalPrice=this.totalPrice+each.price*each.quantity
          // })
          //this.updateprice();
        }
      },
      error(error: any) {
        console.log('Error from increase quantity api', error);
      },
    });*/
    var url = 'https://apifromashu.herokuapp.com/api/addcaketocart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    this.ngxService.start();
    this.nehaangular.inc_quant(url, this.cartitems[index], options).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        console.log('Response from increase quantity api', response);
        if (response.data) {
          this.totalPrice = this.totalPrice + this.cartitems[index].price;
          this.cartitems[index].quantity++;
        }
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log('Error from increase quantity api', error);
      },
    });
  }

  decrease_quantity(index: any) {
    /*var url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    console.log(body);
    if (this.cartitems[index].quantity <= 1) {
      this.delete_cake(index);
    } else {
      this.nehaangular.dec_quant(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from decrease quantity api', response);
          if (response) {
            this.cartitems[index].quantity -= 1;
            //this.updateprice();
          }
        },
        error(error: any) {
          console.log('Error from decrease quantity api', error);
        },
      });
    }*/
    var url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    this.ngxService.start();
    this.nehaangular.dec_quant(url, body, options).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        console.log('Response from decrease quantity api', response);
        this.totalPrice = this.totalPrice - this.cartitems[index].price;
        this.cartitems[index].quantity--;
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log('Error from decrease quantity api', error);
      },
    });
  }

  delete_cake(index: any) {
    /*var url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    console.log(body);
    this.nehaangular.dec_quant(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from delete cake api', response);
        if (response) {
          window.location.reload();
        }
      },
      error(error: any) {
        console.log('Error from delete cake api', error);
      },
    });*/
    var url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    console.log(body);
    this.nehaangular.dec_quant(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from delete cake api', response);
        if (response.message == 'Removed whole cake  item from cart') {
          this.totalPrice =
            this.totalPrice -
            this.cartitems[index].quantity * this.cartitems[index].price;
          this.cartitems.splice(index, 1);
        }
      },
      error(error: any) {
        console.log('Error from delete cake api', error);
      },
    });
  }

  checkout(){
    this.nehaangular.cartitems=this.cartitems
    this.nehaangular.price=this.totalPrice
    this.router.navigate(['/checkout'])
  }

  ngOnInit(): void {}
}
