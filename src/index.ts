import fetch from "node-fetch";
import { IRes } from "./interfaces/res";

class Client {
  // constructor
  constructor(rccSandbox: string, apiSecret: string) {
    this._rccSandbox = rccSandbox;
    this._apiSecret = apiSecret;
    this.header = {
      ...this.header,
      Authorization: `sso-key ${rccSandbox}:${apiSecret}`,
    };
  }

  // properties
  private _rccSandbox: string;
  public get rccSandbox(): string {
    return this._rccSandbox;
  }
  public set rccSandbox(v: string) {
    this._rccSandbox = v;
  }

  private _apiSecret: string;
  public get apiSecret(): string {
    return this._apiSecret;
  }
  public set apiSecret(v: string) {
    this._apiSecret = v;
  }

  private header: Record<string, string> = {
    accept: "application/json",
    Authorization: "",
  };

  private url: string = "https://api.ote-godaddy.com/";

  // methods
  public async getDomains(): Promise<IRes> {
    const url = `${this.url}v1/domains`;
    const r = await fetch(url, { headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }
}
