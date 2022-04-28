import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent implements OnInit {

  constructor(private nehaangular:NehaService, private http:HttpClient,private ngxService: NgxUiLoaderService) {
    this.ngxService.start();
    var url="https://apifromashu.herokuapp.com/api/allcakes"
    this.http.get(url).subscribe({
      next:(response:any)=>{
        console.log("Response from all cakes api",response)
        this.cakes=response.data
        this.ngxService.stop()
      },
      error:(error)=>{
        console.log("Error from all cakes api",error)
      }
    })
  }

  ascSort(){
    this.nehaangular.port=4200;
    this.cakes=this.nehaangular.ascending(this.cakes);
  }

  descSort(){
    this.cakes=this.nehaangular.descending(this.cakes);
  }

  cakes:any=[
    //this was before api url was added
    // {name:"Truffle cake",price:500, image:"assets/cake3.jpg", special:true},
    // {name:"Fruit cake",price:700, image:"assets/cake2.jpg"},
    // {name:"Truffle cake",price:500, image:"assets/cake1.jpg"},
    // {name:"Fruit cake",price:600, image:"assets/cake4.jpg"},
    // {name:"Truffle cake",price:500, image:"assets/cake2.jpg"},
    // {name:"Fruit cake",price:150, image:"assets/cake3.jpg"},
    // {name:"Truffle cake",price:500, image:"assets/cake1.jpg"},
    // {name:"Fruit cake",price:600, image:"assets/cake4.jpg"}
  ]; 

  ngOnInit(): void {
  }

}