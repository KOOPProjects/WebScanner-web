import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ServerOrder } from "../models/ServerOrder";
import { ServerOrdersBackendServiceInterface } from '../services/serverorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServerOrdersBackendService extends ServerOrdersBackendServiceInterface {
   
  private addServerOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/server";
  private deleteServerOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/server?orderId=";
  private getServerOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/server/order?id=";
  private getAllServerOrdersUrl: string = "https://webscanner-api.ptrd.pl/api/order/server";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
  }

  addServerOrder(newServerOrder: ServerOrder): Observable<ServerOrder> {
    this.setHeaders();
    return this.http.post(this.addServerOrderUrl,
      JSON.stringify(newServerOrder), this.jsonContentOptions).map(response => response.json() as ServerOrder);
  }

  deleteServerOrder(serverOrderId: number): Observable<number> {
    this.setHeaders();
    return this.http.delete(this.deleteServerOrderUrl + serverOrderId, this.jsonContentOptions)
      .map(response => response.json() as number);
  }

  getServerOrder(serverOrderId: number): Observable<ServerOrder> {
    this.setHeaders();
    return this.http.get(this.getServerOrderUrl + serverOrderId, this.jsonContentOptions)
      .map(response => response.json() as ServerOrder);
  }

  getAllServerOrders(): Observable<ServerOrder[]> {
    this.setHeaders();
    return this.http.get(this.getAllServerOrdersUrl, this.jsonContentOptions)
      .map(response => response.json() as ServerOrder[]);
  }

  private setHeaders() {
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }
}
