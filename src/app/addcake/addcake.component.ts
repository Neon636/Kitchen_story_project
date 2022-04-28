import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css']
})
export class AddcakeComponent implements OnInit {

  file:any;
  imageUrl:any;
  constructor(private nehaangular: NehaService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  upload(){
    // hit the api
    var url = "https://apifromashu.herokuapp.com/api/upload"
    var formdata = new FormData()
   formdata.append("file",this.file)
   var myheaders =  new HttpHeaders()
   myheaders = myheaders.append("authtoken",localStorage["token"])
   var options = {
     headers:myheaders
   }
   this.nehaangular.uploadImage(url,formdata,options).subscribe({
     next:(response:any)=>{
       console.log("Response from image upload api", response)
       this.imageUrl = response.imageUrl
     },
     error:(error:any)=>{
       console.log("Error from image upload api" , error)
     }
   })
 }

 cakedetails:any={}

 addcake(){
   this.cakedetails["image"]=this.imageUrl
   console.log(this.cakedetails)
  var url = 'https://apifromashu.herokuapp.com/api/addcake';
  let myheaders = new HttpHeaders();
  myheaders = myheaders.append('authtoken', localStorage['token']);
  var options = {
    headers: myheaders,
  };
  this.nehaangular.addCake(url, this.cakedetails, options).subscribe({
    next: (response: any) => {
      console.log('Response from add cake api', response);
      if (response.data) {
        this.toastr.success('Cake added successfully','Success!!!')
      }
    },
    error: (error: any) => {
      console.log('Error from add cake api', error);
    },
  });
 }

  getFile(event:any){
    this.file = event.target.files[0]
  }

}
