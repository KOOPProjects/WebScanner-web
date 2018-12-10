import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ServerOrder } from "../models/ServerOrder";
import { ServerOrdersBackendServiceInterface } from '../services/serverorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class ServerOrdersBackendService extends ServerOrdersBackendServiceInterface {

  private addServerOrderUrl: string = "NEED_TO_ADD";
  private deleteServerOrderUrl: string = "NEED_TO_ADD";

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
    return this.http.post(this.deleteServerOrderUrl,
      JSON.stringify(serverOrderId), this.jsonContentOptions).map(response => response.json() as number);
  }
}
