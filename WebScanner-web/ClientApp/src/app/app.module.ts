import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddorderComponent } from './components/addorder/addorder.component';
import { DeleteorderComponent } from './components/deleteorder/deleteorder.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignupComponent } from './components/signup/signup.component';
//here you need to import components 


@NgModule({
  declarations: [
    HomeComponent,
    AddorderComponent,
    DeleteorderComponent,
    OrderdetailsComponent,
    LandingpageComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent
    //add imported components
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      //here can we add routing in module
    ])
  ],
  providers: [],
  bootstrap: [LandingpageComponent]
})
export class AppModule { }
