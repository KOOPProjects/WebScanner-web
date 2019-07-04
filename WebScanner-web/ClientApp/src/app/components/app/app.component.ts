import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceInterface } from '../../services/auth-service-interface';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthServiceInterface) { }

  ngOnInit() { }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/landingpage']);
  }

}
