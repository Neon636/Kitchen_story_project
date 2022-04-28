import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NAngular';
  friends=["n1","n2","n3","n4","n5"];
  trainees: any=[{
    name:"n1",
    salary:"1 cr"
  },{
    name:"n2",
    salary:"1 cr"
  },{
    name:"n3",
    salary:"1 cr"
  },{
    name:"n4",
    salary:"1 cr"
  },{
    name:"n5",
    salary:"1 cr"
  }]
}
