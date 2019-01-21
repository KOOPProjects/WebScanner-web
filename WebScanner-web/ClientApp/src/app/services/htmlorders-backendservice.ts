import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HtmlOrder } from "../models/HtmlOrder";
import { HtmlOrdersBackendServiceInterface } from '../services/htmlorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class HtmlOrdersBackendService extends HtmlOrdersBackendServiceInterface {
    
  private addHtmlOrderUrl: string = "https://webscanner.ptrd.pl/api/htmlorders";
  private deleteHtmlOrderUrl: string = "https://webscanner.ptrd.pl/api/htmlorders?orderId=";
  private getHtmlOrderUrl: string = "https://webscanner.ptrd.pl/api/htmlorders?orderId=";
  private getAllHtmlOrdersUrl: string = "https://webscanner.ptrd.pl/api/htmlorders/GetAll";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  addHtmlOrder(newHtmlOrder: HtmlOrder): Observable<number> {
    return this.http.post(this.addHtmlOrderUrl,
      JSON.stringify(newHtmlOrder), this.jsonContentOptions).map(response => response.json() as number);
  }

  deleteHtmlOrder(htmlOrderId: number): Observable<number> {
    return this.http.delete(this.deleteHtmlOrderUrl + htmlOrderId)
      .map(response => response.json() as number);
  }

  getHtmlOrder(htmlOrderId: number): Observable<HtmlOrder> {
    return this.http.get(this.getHtmlOrderUrl + htmlOrderId)
      .map(response => response.json() as HtmlOrder);
  }

  getAllHtmlOrders(): Observable<HtmlOrder[]> {
    return this.http.get(this.getAllHtmlOrdersUrl)
      .map(response => response.json() as HtmlOrder[]);
  }
}
