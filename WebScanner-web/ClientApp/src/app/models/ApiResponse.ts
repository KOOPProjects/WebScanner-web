import { WebAppResponse } from "./Response";

export class ApiResponse {
  constructor();
  constructor(
    public responses?: WebAppResponse[],
    public status? : string
  ) { }
}
