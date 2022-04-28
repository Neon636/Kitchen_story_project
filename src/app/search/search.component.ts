import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NehaService } from '../neha.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchitems:any=[]
  constructor(private route:ActivatedRoute,private nehaangular:NehaService) { 
    /*var searchtext=this.route.snapshot.queryParams["q"]
    var url="https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
    this.nehaangular.searchCakes(url).subscribe({
      next:(response:any)=>{
        console.log("Response from search cakes api:",response)
        this.searchitems=response.data
      },
      error:(error:any)=>{
        console.log("error from search cakes api",error)
      }
    })*/
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
      this.nehaangular.searchCakes(url).subscribe({
        next:(response:any)=>{
            console.log("Response from search cakes api" , response)
            this.searchitems = response.data
        },
        error:(error)=>{
            console.log("error from search ckesa api" , error)
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
