import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CakeComponent } from './cake/cake.component';

@Injectable({
  providedIn: 'root'
})
export class NehaService {
  port=8080;
  flag=false;
  cartItem:any
  loggedinUser:any

  cartitems:any
  price:any
  userdetails:any
  isDisabled:any

  signup(url:any,body:any){
    return this.http.post(url,body)
  }

  login(url:any,body:any){
    return this.http.post(url,body)
  }

  resetpass(url:any,body:any){
    return this.http.post(url,body)
  }

  setDetails(detail:any){
    if(this.flag==false){
      this.userdetails=detail
      this.flag=true
    }
  }

  getDetails(){
    if(this.flag==true)
      return this.userdetails
    else
      return false
  }

  setCartVal(cart:any){
    this.cartItem=cart
  }

  getCartVal(){
    return this.cartItem
  }

  addCake(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  addCakeToCart(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  inc_quant(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  dec_quant(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  uploadImage(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  getCartItems(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  getPreviousOrders(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  placeOrder(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  getCakedetails(url:any){
    return this.http.get(url)
  }

  searchCakes(url:any){
    return this.http.get(url)
  }

  ascending(data:any){
    data.sort((a:any, b:any)=>{
      return a.price - b.price;
    })
    return data;
  }

  descending(data:any){
    data.sort((a:any, b:any)=>{
      return b.price - a.price;
    })
    return data;
  }

  constructor(private http:HttpClient) { }
}
