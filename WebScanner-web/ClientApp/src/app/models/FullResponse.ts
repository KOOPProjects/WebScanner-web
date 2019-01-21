import { ServerContent } from "./ServerContent";
import { HtmlContent } from "./HtmlContent";

export class FullServerResponse {
  constructor();
  constructor(
    public id?: number,
    public orderId?: number,
    public date?: string,
    public content?: ServerContent,
    public type?: string
  ) { }
}


export class FullHtmlResponse {
  constructor();
  constructor(
    public id?: number,
    public orderId?: number,
    public date?: string,
    public content?: HtmlContent,
    public type?: string
  ) { }
}
