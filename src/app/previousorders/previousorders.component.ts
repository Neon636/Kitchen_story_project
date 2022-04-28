import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-previousorders',
  templateUrl: './previousorders.component.html',
  styleUrls: ['./previousorders.component.css']
})
export class PreviousordersComponent implements OnInit {
  ordereditems:any=[]
  status:any
  isloggedin:any;

  constructor(private nehaangular:NehaService,private router:Router,private ngxService: NgxUiLoaderService) { 
    
    if(localStorage["token"]){
      this.ngxService.start();
      this.isloggedin=true
    }else{
      this.isloggedin=false
    }

    var url="https://apifromashu.herokuapp.com/api/cakeorders"
    let myheaders=new HttpHeaders()
    myheaders=myheaders.append("authtoken",localStorage["token"])
    var options={
      headers:myheaders
    }
    var body={}
    this.nehaangular.getPreviousOrders(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response from previous orders api", response)
        this.ordereditems=response.cakeorders

        if(this.ordereditems.completed==false){
          this.status=true
        }else{
          this.status=false
        }  
        this.ngxService.stop()      
      },error(error:any){
        console.log("Error from previous orders api",error)
      }
    })
  }

  linkval:any

  cssClassByIndex(index:number) {
    this.linkval='collapse'+index
    return 'collapse'+index;
   }

  ngOnInit(): void {
  }

}
