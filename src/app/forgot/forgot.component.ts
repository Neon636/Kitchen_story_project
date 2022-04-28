import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NehaService } from '../neha.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private router: Router,private nehaangular: NehaService,private http: HttpClient) { 
    if (localStorage['token']) {
      this.router.navigate(['**']);
    }
  }

  emailid:any;

  resetpass(){
    var url = 'https://apifromashu.herokuapp.com/api/recoverpassword';
    this.nehaangular.resetpass(url, this.emailid).subscribe({
      next: (response: any) => {
        console.log('Response from reset password api', response);
        if(response.errorMessage){
          alert(response.errorMessage)
        }
      },
      error: (error) => {
        console.log('Error from post reset password api', error);
        alert(error)
      },
    });
  }

  ngOnInit(): void {
  }

}
