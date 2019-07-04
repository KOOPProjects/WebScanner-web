import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HtmlOrder } from "../models/HtmlOrder";
import { User } from "../models/User";
import { Token } from "../models/Token";

@Injectable()
export abstract class AuthServiceInterface {
  abstract login(email: string, password: string): Observable<Token>;
  abstract register(email: string, password: string): Observable<User>;
  abstract logout();
  abstract isLoggedIn();
  abstract setSession(token: Token);
}
