import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebAppResponse } from "../models/Response";
import { DateAndContentDTO } from "../models/DateAndContentDTO";
import { ApiResponse } from "../models/ApiResponse";

@Injectable()
export abstract class ResponsesBackendServiceInterface {
  abstract getByOrderIdAndType(id: number, type: string): Observable<WebAppResponse[]>;
}
