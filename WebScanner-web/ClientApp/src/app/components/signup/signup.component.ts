import { Component, OnInit } from '@angular/core';
import { AuthServiceInterface } from '../../services/auth-service-interface';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegisterData } from '../../models/RegisterData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthServiceInterface,
    private location: Location,
    private router: Router
  ) { }

  authData: RegisterData = new RegisterData();
  error: string;

  ngOnInit() {
  }

  onSubmit(authData: RegisterData): void {
    this.authService.register(authData.userName, authData.password).subscribe(
      onSuccess => {
        console.log(onSuccess);
        this.router.navigate(['/signin']);
      },
      onError => {
        console.log(onError);
        this.error = "Błąd rejestracji: " + onError._body;
      });
      

  }

}
