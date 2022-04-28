import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NehaService } from '../neha.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  projecttitle: String = "Kitchen Story";
  searchtext: any;
  isloggedin: any;
  length:any

  constructor(private nehaangular: NehaService, private router: Router) {
    this.isloggedin = localStorage['token'] ? true : false;
    if (this.isloggedin) {
      var url = 'https://apifromashu.herokuapp.com/api/cakecart';
      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myheaders,
      };
      var body = {};
      this.nehaangular.getCartItems(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from cart items api', response);
          this.nehaangular.cartitems = response.data;
          this.length=response.data?.length
        },
      });
    }
  }

  isAdmin: any = false;
  adminUsers: any = ['nsmaben24@gmail.com'];

  ngDoCheck() {
    if (localStorage['token']) {
      this.isloggedin = true;
      this.length=this.nehaangular.cartitems.length
      if (this.adminUsers.includes(localStorage['loggedinUser'])) {
        this.isAdmin = true;
      }
    } else {
      this.isloggedin = false;
      this.isAdmin = false;
    }
  }

  search() {
    // this.nehaangular.port=4200;
    // alert(this.searchtext+""+this.nehaangular.port)
    if (this.searchtext)
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchtext },
      });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  ngOnInit(): void {}
}
