import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ServerOrder } from "../models/ServerOrder";
import { ServerOrdersBackendServiceInterface } from '../services/serverorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServerOrdersBackendService extends ServerOrdersBackendServiceInterface {
   
  private addServerOrderUrl: string = "https://webscanner.ptrd.pl/api/serverorders";
  private deleteServerOrderUrl: string = "https://webscanner.ptrd.pl/api/serverorders?orderId=";
  private getServerOrderUrl: string = "https://webscanner.ptrd.pl/api/serverorders?orderId=";
  private getAllServerOrdersUrl: string = "https://webscanner.ptrd.pl/api/serverorders/GetAll";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  addServerOrder(newServerOrder: ServerOrder): Observable<number> {
    return this.http.post(this.addServerOrderUrl,
      JSON.stringify(newServerOrder), this.jsonContentOptions).map(response => response.json() as number);
  }

  deleteServerOrder(serverOrderId: number): Observable<number> {
    return this.http.delete(this.deleteServerOrderUrl + serverOrderId)
      .map(response => response.json() as number);
  }

  getServerOrder(serverOrderId: number): Observable<ServerOrder> {
    return this.http.get(this.getServerOrderUrl + serverOrderId)
      .map(response => response.json() as ServerOrder);
  }

  getAllServerOrders(): Observable<ServerOrder[]> {
    return this.http.get(this.getAllServerOrdersUrl)
      .map(response => response.json() as ServerOrder[]);
  }
}
