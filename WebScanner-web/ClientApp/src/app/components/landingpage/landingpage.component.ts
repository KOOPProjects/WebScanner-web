import { Component, OnInit } from '@angular/core';
import { ServerOrder } from "../../models/ServerOrder";
import { ServerOrdersBackendService } from '../../services/serverorders-backendservice';
import { ServerOrdersBackendServiceInterface } from '../../services/serverorders-backendservice-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
 
  ngOnInit() { } 

  goToHome() {
    this.router.navigate(['/home']);
  }
}
