import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebAppResponse } from "../models/Response";
import { DateAndContentDTO } from "../models/DateAndContentDTO";

@Injectable()
export abstract class ResponsesBackendServiceInterface {
  abstract getByOrderIds(ids: number[]): Observable<WebAppResponse[]>;
  abstract findByDateAndContent(dataDTO: DateAndContentDTO): Observable<WebAppResponse[]>;
}
