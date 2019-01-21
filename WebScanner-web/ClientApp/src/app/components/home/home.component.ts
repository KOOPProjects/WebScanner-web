import { Component, OnInit } from '@angular/core';
import { ServerOrder } from "../../models/ServerOrder";
import { HtmlOrder } from "../../models/HtmlOrder";
import { ServerOrdersBackendServiceInterface } from '../../services/serverorders-backendservice-interface';
import { HtmlOrdersBackendServiceInterface } from '../../services/htmlorders-backendservice-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private serverService: ServerOrdersBackendServiceInterface,
    private htmlService: HtmlOrdersBackendServiceInterface,
    private router: Router
  ) { }

  tempInfo: string = " ";
  serverOrders: ServerOrder[] = new Array<ServerOrder>();
  htmlOrders: HtmlOrder[] = new Array<HtmlOrder>();

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.serverService.getAllServerOrders().subscribe(
      propertiesFromDb => {
        if (propertiesFromDb.length === 0) {
          this.tempInfo = "Records not found";
        } else {
          this.serverOrders = propertiesFromDb;
        }
      }
    );
    this.htmlService.getAllHtmlOrders().subscribe(
      propertiesFromDb => {
        if (propertiesFromDb.length === 0) {
          this.tempInfo = "Records not found";
        } else {
          this.htmlOrders = propertiesFromDb;
        }
      }
    );
  }

  goToServerDelete(orderId: number) {
    this.router.navigate(['/deleteorder/server/' + orderId]);
  }

  goToHtmlDelete(orderId: number) {
    this.router.navigate(['/deleteorder/html/' + orderId]);
  }

  goToAddingServerOrder(): void {
    this.router.navigate(['/addserverorder']);
  }

  goToAddingHtmlOrder(): void {
    this.router.navigate(['/addhtmlorder']);
  }
  goToHtmlOrderDetails(orderId: number): void {
    this.router.navigate(['/orderdetails/html/' + orderId]);
  }

  goToServerOrderDetails(orderId: number): void {
    this.router.navigate(['/orderdetails/server/' + orderId]);
  }
}
