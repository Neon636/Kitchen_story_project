import { Component, Input, OnInit } from '@angular/core';
import { NehaService } from '../neha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  /*@Input() name:any
  @Input() price:any
  
  cakedata:any={
    name:"choco truffle",
    price:"Rs 200",
    image:"assets/about_us.jpg"
  }*/
 
  @Input() cakedata:any;

  constructor(private router:Router) { }

  showCakedetails(){
    this.router.navigate(['details/',this.cakedata.cakeid])
  }

  ngOnInit(): void {
  }

}
