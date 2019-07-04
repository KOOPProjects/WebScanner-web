import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DeleteorderComponent } from './components/deleteorder/deleteorder.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ServerOrdersBackendService } from './services/serverorders-backendservice';
import { ServerOrdersBackendServiceInterface } from './services/serverorders-backendservice-interface';
import { AppComponent } from './components/app/app.component';
import { HtmlOrdersBackendServiceInterface } from './services/htmlorders-backendservice-interface';
import { HtmlOrdersBackendService } from './services/htmlorders-backendservice';
import { AddhtmlorderComponent } from './components/addhtmlorder/addhtmlorder.component';
import { AddserverorderComponent } from './components/addserverorder/addserverorder.component';
import { ResponsesBackendServiceInterface } from './services/responses-backendservice-interface';
import { ResponsesBackendService } from './services/responses-backendservice';
import { HtmlorderdetailsComponent } from './components/htmlorderdetails/htmlorderdetails.component';
import { AuthServiceInterface } from './services/auth-service-interface';
import { AuthService, AuthGuard } from './services/auth-service';
//here you need to import components 


@NgModule({
  declarations: [
    HomeComponent,
    DeleteorderComponent,
    OrderdetailsComponent,
    LandingpageComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    AppComponent,
    AddhtmlorderComponent,
    AddserverorderComponent,
    HtmlorderdetailsComponent
    //add imported components
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'landingpage', component: LandingpageComponent },
      { path: 'deleteorder/:type/:id', component: DeleteorderComponent, canActivate: [AuthGuard] },
      { path: "orderdetails/server/:id", component: OrderdetailsComponent, canActivate: [AuthGuard] },
      { path: "orderdetails/html/:id", component: HtmlorderdetailsComponent, canActivate: [AuthGuard] },
      { path: 'addhtmlorder', component: AddhtmlorderComponent, canActivate: [AuthGuard] },
      { path: 'addserverorder', component: AddserverorderComponent, canActivate: [AuthGuard] },
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: '**', redirectTo: 'landingpage' },
    ])
  ],
  providers: [
    AppComponent,
    { provide: AuthServiceInterface, useClass: AuthService },
    HomeComponent,
    { provide: ServerOrdersBackendServiceInterface, useClass: ServerOrdersBackendService },
    HomeComponent,
    { provide: HtmlOrdersBackendServiceInterface, useClass: HtmlOrdersBackendService },
    DeleteorderComponent,
    { provide: ServerOrdersBackendServiceInterface, useClass: ServerOrdersBackendService },
    DeleteorderComponent,
    { provide: HtmlOrdersBackendServiceInterface, useClass: HtmlOrdersBackendService },
    OrderdetailsComponent,
    { provide: ServerOrdersBackendServiceInterface, useClass: ServerOrdersBackendService },
    HtmlorderdetailsComponent,
    { provide: HtmlOrdersBackendServiceInterface, useClass: HtmlOrdersBackendService },
    OrderdetailsComponent,
    { provide: ResponsesBackendServiceInterface, useClass: ResponsesBackendService },
    HtmlorderdetailsComponent,
    { provide: ResponsesBackendServiceInterface, useClass: ResponsesBackendService },
    AddserverorderComponent,
    { provide: ServerOrdersBackendServiceInterface, useClass: ServerOrdersBackendService },
    AddhtmlorderComponent,
    { provide: HtmlOrdersBackendServiceInterface, useClass: HtmlOrdersBackendService },
    SignupComponent,
    { provide: AuthServiceInterface, useClass: AuthService },
    SigninComponent,
    { provide: AuthServiceInterface, useClass: AuthService },
    AuthGuard,
    { provide: AuthServiceInterface, useClass: AuthService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
