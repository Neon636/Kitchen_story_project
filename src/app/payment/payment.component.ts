import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartitems:any=[]
  totalPrice:any=0
  userdetails:any

  constructor(private nehaangular:NehaService,private router:Router) { 
    this.userdetails=this.nehaangular.userdetails
    console.log(this.userdetails)
    var url="https://apifromashu.herokuapp.com/api/cakecart"
    let myheaders=new HttpHeaders()
    myheaders=myheaders.append("authtoken",localStorage["token"])
    var options={
      headers:myheaders
    }
    var body={}
    this.nehaangular.getCartItems(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response from cart items api", response)
        this.cartitems=response.data
        this.cartitems.forEach((each:any)=>{
          this.totalPrice=this.totalPrice+each.price*each.quantity
        })
      },error(error:any){
        console.log("Error from cart items api",error)
      }
    })
    //this.userdetails=nehaangular.getDetails()
    
  }

  order(){
  
      var url="https://apifromashu.herokuapp.com/api/addcakeorder"
      let myheaders=new HttpHeaders()
      myheaders=myheaders.append("authtoken",localStorage["token"])
      var options={
        headers:myheaders
      }
      var body={
        cakes:this.cartitems,
        price:this.totalPrice,
        name:this.userdetails.name,
        address: this.userdetails.address,
        city: this.userdetails.city,
        pincode:this.userdetails.pincode,
        phone:this.userdetails.phone
      }
      this.nehaangular.placeOrder(url,body,options).subscribe({
        next:(response:any)=>{
          console.log("Response from order items api", response)
          this.nehaangular.isDisabled=true
        },error(error:any){
          console.log("Error from order items api",error)
        }
      })
    
  }

  ngOnInit(): void {
  }

}
