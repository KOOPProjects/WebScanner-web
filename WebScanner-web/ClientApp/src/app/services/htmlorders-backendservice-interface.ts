import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HtmlOrder } from "../models/HtmlOrder";

@Injectable()
export abstract class HtmlOrdersBackendServiceInterface {
  abstract addHtmlOrder(newHtmlOrder: HtmlOrder): Observable<HtmlOrder>;
  abstract deleteHtmlOrder(htmlOrderId: number): Observable<number>;
  abstract getHtmlOrder(htmlOrderId: number): Observable<HtmlOrder>
  abstract getAllHtmlOrders(): Observable<HtmlOrder[]>
}
