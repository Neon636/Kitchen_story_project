import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  userdetails:any={}
  constructor(private nehaangular:NehaService,private router: Router) { 
    
  }

  addAddress(){
    this.nehaangular.userdetails=this.userdetails
    this.router.navigate(['/checkout/payment'])
    //console.log(this.nehaangular.userdetails)
    this.nehaangular.isDisabled=false
  }

  ngOnInit(): void {
  }

}
