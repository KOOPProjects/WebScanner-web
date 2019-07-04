import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HtmlOrder } from "../models/HtmlOrder";
import { HtmlOrdersBackendServiceInterface } from '../services/htmlorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class HtmlOrdersBackendService extends HtmlOrdersBackendServiceInterface {
    
  private addHtmlOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/html";
  private deleteHtmlOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/html?orderId=";
  private getHtmlOrderUrl: string = "https://webscanner-api.ptrd.pl/api/order/html/order?id=";
  private getAllHtmlOrdersUrl: string = "https://webscanner-api.ptrd.pl/api/order/html";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  addHtmlOrder(newHtmlOrder: HtmlOrder): Observable<HtmlOrder> {
    this.setHeaders();
    return this.http.post(this.addHtmlOrderUrl,
      JSON.stringify(newHtmlOrder), this.jsonContentOptions).map(response => response.json() as HtmlOrder);
  }

  deleteHtmlOrder(htmlOrderId: number): Observable<number> {
    this.setHeaders();
    return this.http.delete(this.deleteHtmlOrderUrl + htmlOrderId, this.jsonContentOptions)
      .map(response => response.json() as number);
  }

  getHtmlOrder(htmlOrderId: number): Observable<HtmlOrder> {
    this.setHeaders();
    return this.http.get(this.getHtmlOrderUrl + htmlOrderId, this.jsonContentOptions)
      .map(response => response.json() as HtmlOrder);
  }

  getAllHtmlOrders(): Observable<HtmlOrder[]> {
    this.setHeaders();
    return this.http.get(this.getAllHtmlOrdersUrl, this.jsonContentOptions)
      .map(response => response.json() as HtmlOrder[]);
  }

  private setHeaders() {
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }
}
