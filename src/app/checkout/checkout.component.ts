import { Component, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isDisabled:any=true
  constructor(private nehaangular:NehaService) { 
    this.isDisabled=nehaangular.isDisabled
  }

  
  ngOnInit(): void {
  }

}
