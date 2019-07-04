import { Component, OnInit } from '@angular/core';
import { AuthServiceInterface } from '../../services/auth-service-interface';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginData } from '../../models/LoginData';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthServiceInterface,
    private location: Location,
    private router: Router
  ) { }

  authData: LoginData = new LoginData();
  error: string;

  ngOnInit() {
  }

  onSubmit(authData: LoginData): void {
    let succ: boolean = false;
    this.authService.login(authData.userName, authData.password).subscribe(
      onSuccess => {
        console.log(onSuccess);
        this.authService.setSession(onSuccess.token);
        succ = true;
      },
      onError => {
        console.log(onError);
        this.error = "Błąd logowania: " + onError._body;
      },
      () => {
        if (succ) {
          this.router.navigate(['/home']);
        }
      });
    
  }

}
