import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Token } from "../models/Token";
import { User } from "../models/User";
import { Observable } from 'rxjs';
import { AuthServiceInterface } from './auth-service-interface';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenResponse } from "../models/TokenResponse";

@Injectable()
export class AuthService extends AuthServiceInterface {

  private loginUrl: string = "https://webscanner-api.ptrd.pl/api/auth/login";
  private registerUrl: string = "https://webscanner-api.ptrd.pl/api/auth/register";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  login(email: string, password: string) : Observable<TokenResponse> {
    return this.http.post(this.loginUrl,
      JSON.stringify({UserName: email, password: password}), this.jsonContentOptions).map(response => response.json() as TokenResponse);
  }

  register(email: string, password: string): Observable<User> {
    return this.http.post(this.registerUrl,
      JSON.stringify({ UserName: email, password: password }), this.jsonContentOptions).map(response => response.json() as User);
  }

  setSession(token: Token) {
      localStorage.setItem('token', token.value);
   
    
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthServiceInterface
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
