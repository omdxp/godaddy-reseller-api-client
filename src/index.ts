import fetch from "node-fetch";
import {
  CheckType,
  DnsRecordType,
  IContacts,
  IDomainsContactsValidation,
  IPatchDomain,
  IPrivacyPurchaseOptions,
  IRecord,
  IRes,
  ISchemaRes,
  Sources,
} from "./interfaces/res";

class Client {
  // constructor
  /**
   * @constructor Client
   * @description Client constructor
   * @param rccSandbox - rccSandbox
   * @param apiSecret - apiSecret
   */
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

  //#region get methods
  /**
   * @method getDomains
   * @description Get all domains
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getDomains(): Promise<IRes> {
    const url = `${this.url}v1/domains`;
    const r = await fetch(url, { headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getAgreements
   * @description Get all agreements
   * @param xMarketId - xMarketId
   * @param tlds - tlds
   * @param privacy - privacy
   * @param forTransfer - forTransfer
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getAgreements(
    xMarketId: string = "en-US",
    tlds: string[],
    privacy: boolean,
    forTransfer: boolean = true,
  ): Promise<IRes> {
    const url = `${this.url}v1/agreements?tlds=${tlds.join(
      ",",
    )}&privacy=${privacy}&forTransfer=${forTransfer}`;
    const headers =
      xMarketId !== ""
        ? {
            ...this.header,
          }
        : {
            ...this.header,
            "X-Market-Id": xMarketId,
          };
    const r = await fetch(url, {
      headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getAvailable
   * @description Get available domains
   * @param domain - domain
   * @param checkType - checkType
   * @param forTransfer - forTransfer
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getAvailable(
    domain: string,
    checkType: CheckType = "FAST",
    forTransfer: boolean = true,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/available?domain=${domain}&checkType=${checkType}&forTransfer=${forTransfer}`;
    const r = await fetch(url, { headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getPurchaseSchema
   * @description Get purchase schema
   * @param tld - tld
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getPurchaseSchema(tld: string): Promise<IRes> {
    const url = `${this.url}v1/domains/purchase/schema/${tld}`;
    const r = await fetch(url, { headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getSuggestions
   * @description Get suggestions
   * @param xShopperId - xShopperId
   * @param query - query
   * @param country - country
   * @param city - city
   * @param sources - sources
   * @param tlds - tlds
   * @param lengthMax - lengthMax
   * @param lengthMin - lengthMin
   * @param limit - limit
   * @param waitMs - waitMs
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getSuggestions(
    xShopperId?: string,
    query?: string,
    country?: string,
    city?: string,
    sources?: Sources,
    tlds?: string[],
    lengthMax?: number,
    lengthMin?: number,
    limit?: number,
    waitMs?: number,
  ): Promise<IRes> {
    const url = `${
      this.url
    }v1/domains/suggest?query=${query}&country=${country}&city=${city}&sources=${sources}&tlds=${tlds?.join(
      ",",
    )}&lengthMax=${lengthMax}&lengthMin=${lengthMin}&limit=${limit}&waitMs=${waitMs}`;
    const headers = xShopperId
      ? { ...this.header, "X-Shopper-Id": xShopperId }
      : this.header;
    const r = await fetch(url, { headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getTlds
   * @description Get tlds
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getTlds(): Promise<IRes> {
    const url = `${this.url}v1/domains/tlds`;
    const r = await fetch(url, { headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getDomain
   * @param domain - domain
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async getDomain(domain: string, xShopperId?: string): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}`;
    const headers = xShopperId
      ? { ...this.header, "X-Shopper-Id": xShopperId }
      : this.header;
    const r = await fetch(url, { headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getDnsRecords
   * @description Get dns records
   * @param domain - domain
   * @param type - type
   * @param name - name
   * @param xShopperId - xShopperId
   * @param offset - offset
   * @param limit - limit
   * @returns
   */
  public async getDnsRecords(
    domain: string,
    type: DnsRecordType,
    name: string,
    xShopperId?: string,
    offset: number = 0,
    limit: number = 10,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records/${type}/${name}?offset=${offset}&limit=${limit}`;
    const headers = xShopperId
      ? { ...this.header, "X-Shopper-Id": xShopperId }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }
  //#endregion

  //#region post methods
  /**
   * @method postAvailable
   * @description Post available domains
   * @param domains - domains
   * @param checkType - checkType
   * @returns {Promise<IRes>} - Promise with response
   */
  public async postAvailable(
    domains: string[],
    checkType: CheckType = "FAST",
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/available?checkType=${checkType}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(domains),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postContactsValidate
   * @description Post contacts validation
   * @param body - body
   * @param xPrivateLabelId - xPrivateLabelId
   * @param marketId - marketId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async postContactsValidate(
    body: IDomainsContactsValidation,
    xPrivateLabelId?: number,
    marketId: string = "",
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/contacts/validate?marketId=${marketId}`;
    const headers =
      xPrivateLabelId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Private-Label-Id": `${xPrivateLabelId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postPurchase
   * @param body - body
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async postPurchase(
    body: ISchemaRes,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/purchase`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Shopper-Id": `${xShopperId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postPurchaseValidate
   * @description Post purchase validate
   * @param body - body
   * @returns {Promise<IRes>} - Promise with response
   */
  public async postPurchaseValidate(body: ISchemaRes): Promise<IRes> {
    const url = `${this.url}v1/domains/purchase/validate`;
    const headers = { ...this.header, "Content-Type": "application/json" };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postPrivacyPurchase
   * @description Post privacy purchase
   * @param domain - domain
   * @param body - body
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async postPrivacyPurchase(
    domain: string,
    body: IPrivacyPurchaseOptions,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/privacy/purchase`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Shopper-Id": `${xShopperId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  //#endregion

  //#region delete methods
  /**
   * @method deleteDomain
   * @description Delete domain
   * @param domain - domain
   * @returns {Promise<IRes>} - Promise with response
   */
  public async deleteDomain(domain: string): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}`;
    const r = await fetch(url, {
      method: "DELETE",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method deleteDomainPrivacy
   * @description Delete domain privacy
   * @param domain - domain
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async deleteDomainPrivacy(
    domain: string,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/privacy`;
    const headers = xShopperId
      ? { ...this.header, "X-Shopper-Id": xShopperId }
      : this.header;
    const r = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }
  //#endregion

  //#region patch methods
  /**
   * @method patchDomain
   * @param domain - domain
   * @param body - body
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async patchDomain(
    domain: string,
    body: IPatchDomain,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Shopper-Id": `${xShopperId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method patchDomainContacts
   * @description Patch domain contacts
   * @param domain - domain
   * @param contacts - contacts
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  public async patchDomainContacts(
    domain: string,
    contacts: IContacts,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/contacts`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Shopper-Id": `${xShopperId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(contacts),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method patchDomainRecords
   * @description Patch domain records
   * @param domain - domain
   * @param records - records
   * @returns {Promise<IRes>} - Promise with response
   */
  public async patchDomainRecords(
    domain: string,
    records: IRecord[],
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records`;
    const r = await fetch(url, {
      method: "PATCH",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(records),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }
  //#endregion

  //#region put methods
  /**
   * @method putDomainRecords
   * @description Put domain records
   * @param domain - domain
   * @param records - records
   * @returns {Promise<IRes>} - Promise with response
   */
  public async putDomainRecords(
    domain: string,
    records: IRecord[],
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Shopper-Id": `${xShopperId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(records),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }
  //#endregion
}
