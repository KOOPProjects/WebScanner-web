import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { WebAppResponse } from "../models/Response";
import { ResponsesBackendServiceInterface } from '../services/responses-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DateAndContentDTO } from "../models/DateAndContentDTO";
import { ApiResponse } from "../models/ApiResponse";


@Injectable()
export class ResponsesBackendService extends ResponsesBackendServiceInterface {
  
  private getByOrderIdAndTypeUrl: string = "https://webscanner-api.ptrd.pl/api/response";
  private findByDateAndContentUrl: string = "https://webscanner-api.ptrd.pl/api/response";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  getByOrderIdAndType(id: number, type: string): Observable<WebAppResponse[]> {
    this.setHeaders();
    return this.http.get(this.getByOrderIdAndTypeUrl + '?orderId=' + id + '&' + 'orderType=' + type, this.jsonContentOptions)
      .map(response => response.json() as WebAppResponse[]);
  }

  private setHeaders() {
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }
}
