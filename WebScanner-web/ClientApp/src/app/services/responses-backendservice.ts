import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { WebAppResponse } from "../models/Response";
import { ResponsesBackendServiceInterface } from '../services/responses-backendservice-interface';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DateAndContentDTO } from "../models/DateAndContentDTO";
import { ApiResponse } from "../models/ApiResponse";


@Injectable()
export class ResponsesBackendService extends ResponsesBackendServiceInterface {
  
  private getByOrderIdsUrl: string = "https://webscanner-api.ptrd.pl/api/responses?";
  private findByDateAndContentUrl: string = "https://webscanner-api.ptrd.pl/api/responses";
  private jsonContentOptions: RequestOptions;

  constructor(private http: Http) {
    super();
    let headersJson: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.jsonContentOptions = new RequestOptions({ headers: headersJson })
  }

  getByOrderIds(ids: number[]): Observable<ApiResponse> {
    let tekst: string = "";
    ids.forEach(obj => {
      tekst += "orderId=" + obj.toString() + "&&";
    });
    tekst = tekst.slice(0, tekst.length - 2);
    console.log(this.getByOrderIdsUrl + tekst);

    return this.http.get(this.getByOrderIdsUrl + tekst)
      .map(response => response.json() as ApiResponse);
  }

  findByDateAndContent(dataDTO: DateAndContentDTO): Observable<ApiResponse> {
    return this.http.post(this.findByDateAndContentUrl,
      JSON.stringify(dataDTO), this.jsonContentOptions).map(response => response.json() as ApiResponse);
  }
}
