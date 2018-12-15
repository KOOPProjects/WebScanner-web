import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HtmlOrder } from "../models/HtmlOrder";
import { HtmlOrdersBackendServiceInterface } from '../services/htmlorders-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class HtmlOrdersBackendService extends HtmlOrdersBackendServiceInterface {

  private addHtmlOrderUrl: string = "NEED_TO_ADD";
  private deleteHtmlOrderUrl: string = "NEED_TO_ADD";

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
    return this.http.post(this.deleteHtmlOrderUrl,
      JSON.stringify(htmlOrderId), this.jsonContentOptions).map(response => response.json() as number);
  }
}
