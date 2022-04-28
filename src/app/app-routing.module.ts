import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcakeComponent } from './addcake/addcake.component';
import { AddressComponent } from './address/address.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { CarousalComponent } from './carousal/carousal.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { PreviousordersComponent } from './previousorders/previousorders.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"search",component:SearchComponent},
  {path:"cart",component:CartComponent},
  {path:"forgot",component:ForgotComponent},
  {path:"addcake",component:AddcakeComponent},
  {path:"details/:cakeid",component:CakedetailComponent},
  {path:"checkout",component:CheckoutComponent, children:[
    {path:"",component:AddressComponent},
    {path:"address",component:AddressComponent},
    {path:"payment",component:PaymentComponent}
  ]},
  {path:'previousorders',component:PreviousordersComponent},
  
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
