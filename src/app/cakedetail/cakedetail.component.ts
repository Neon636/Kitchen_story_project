import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassThrough } from 'stream';
import { NehaService } from '../neha.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css']
})
export class CakedetailComponent implements OnInit {
  cakeid:any
  cake:any={}
  //caketocart:any
  isAdding:any=false

  constructor(private router:Router ,private route:ActivatedRoute, private nehaangular:NehaService,private ngxService: NgxUiLoaderService) { 
    this.ngxService.start();
    this.cakeid=this.route.snapshot.params["cakeid"]
    //api hit
    var url="https://apifromashu.herokuapp.com/api/cake/"+this.cakeid
    this.nehaangular.getCakedetails(url).subscribe({
      next:(response:any)=>{
        console.log("Response from cake details api", response)
        this.cake=response.data
        this.ngxService.stop()
      },
      error:(error)=>{
        console.log("error from cake details api", error)
      }
    })
  }

  addToCart(){
    if(localStorage['token']){
      this.isAdding=true
      /*this.caketocart={id:this.cake.cakeid,name:this.cake.name,price:this.cake.price,image:this.cake.image,weight:this.cake.weight}
      let url="https://apifromashu.herokuapp.com/api/addcaketocart"
      this.nehaangular.postcartdetails(url,this.caketocart).subscribe({
        next:(response:any)=>{
          console.log("response from add to cart:", response)
        },
        error:(error:any)=>{
          console.log("error from add to cart:", error)
        }
      })*/
      let myheaders=new HttpHeaders()
      myheaders=myheaders.append("authtoken",localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/addcaketocart"
      var options={
        headers:myheaders
      }
      var body={
        cakeid:this.cake.cakeid,
        name:this.cake.name,
        weight:this.cake.weight,
        price:this.cake.price,
        image:this.cake.image
      }
      console.log(body)
      this.nehaangular.addCakeToCart(url,body,options).subscribe({
        next:(response:any)=>{
          console.log("Response from add to cart api", response)
          if(response.data){
            this.router.navigate(["/cart"])
          }
        },error(error:any){
          console.log("Error from add to cart api",error)
        }
      })
    }
    else{
      this.router.navigate(["/login"])
    } 
  }

  ngOnInit(): void {
  }

}
