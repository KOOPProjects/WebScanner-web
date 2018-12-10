import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { WebAppResponse } from "../models/Response";
import { ResponsesBackendServiceInterface } from '../services/responses-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DateAndContentDTO } from "../models/DateAndContentDTO";


@Injectable()
export class ResponsesBackendService extends ResponsesBackendServiceInterface {
  
  private getByOrderIdsUrl: string = "NEED_TO_ADD";
  private findByDateAndContentUrl: string = "NEED_TO_ADD";
  
  private jsonContentOptions: RequestOptions;
  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  getByOrderIds(ids: number[]): Observable<WebAppResponse[]> {
    return this.http.post(this.getByOrderIdsUrl,
      JSON.stringify(ids), this.jsonContentOptions).map(response => response.json() as WebAppResponse[]);
  }
  findByDateAndContent(dataDTO: DateAndContentDTO): Observable<WebAppResponse[]> {
    return this.http.post(this.findByDateAndContentUrl,
      JSON.stringify(dataDTO), this.jsonContentOptions).map(response => response.json() as WebAppResponse[]);
  }
}
