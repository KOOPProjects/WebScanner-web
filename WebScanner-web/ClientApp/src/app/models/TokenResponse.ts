import { WebAppResponse } from "./Response";
import { Token } from "../models/Token";

export class TokenResponse {
  constructor();
  constructor(
    public token?: Token
  ) { }
}
