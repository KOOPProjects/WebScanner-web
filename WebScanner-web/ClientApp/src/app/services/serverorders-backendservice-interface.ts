import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServerOrder } from "../models/ServerOrder";

@Injectable()
export abstract class ServerOrdersBackendServiceInterface {
  abstract addServerOrder(newServerOrder: ServerOrder): Observable<ServerOrder>;
  abstract deleteServerOrder(serverOrderId: number): Observable<number>;
  abstract getServerOrder(serverOrderId: number): Observable<ServerOrder>
  abstract getAllServerOrders(): Observable<ServerOrder[]>
}
