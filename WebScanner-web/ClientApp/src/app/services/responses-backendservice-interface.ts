import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebAppResponse } from "../models/Response";
import { DateAndContentDTO } from "../models/DateAndContentDTO";
import { ApiResponse } from "../models/ApiResponse";

@Injectable()
export abstract class ResponsesBackendServiceInterface {
  abstract getByOrderIds(ids: number[]): Observable<ApiResponse>;
  abstract findByDateAndContent(dataDTO: DateAndContentDTO): Observable<ApiResponse>;
}
