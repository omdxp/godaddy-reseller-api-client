import fetch from "node-fetch";
import {
  ICertificateCreate,
  IContacts,
  ICustomerRedeemDomain,
  IDomainForwardRule,
  IDomainsContactsValidation,
  IPatchDomain,
  IPrivacyPurchaseOptions,
  IRecord,
  IReissueCertificate,
  IRenewCertificate,
  IRes,
  ISchemaRes,
  IShopper,
  ISubaccount,
  ITransferDomainPurchase,
} from "./interfaces";
import {
  NotificationType,
  OptionalDetailType,
  Sources,
  StatusGroupType,
  StatusType,
  IncludeShopperType,
  ActionType,
  CheckType,
  CustomerDomainQuery,
  DnsRecordType,
} from "./types";

export default class Client {
  private url: string = "https://api.ote-godaddy.com/";

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

  //#region properties
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

  public domainsAPIs = {
    get: {
      domains: this.getDomains.bind(this),
      agreements: this.getAgreements.bind(this),
      available: this.getAvailable.bind(this),
      purchaseSchema: this.getPurchaseSchema.bind(this),
      suggestions: this.getSuggestions.bind(this),
      tlds: this.getTlds.bind(this),
      domain: this.getDomain.bind(this),
      dnsRecords: this.getDnsRecords.bind(this),
      customerDomain: this.getCustomerDomain.bind(this),
      customerForwardInfoByFqdn: this.getCustomerForwardInfoByFqdn.bind(this),
      customerDomainActions: this.getCustomerDomainActions.bind(this),
      customerRecentDomainAction: this.getCustomerRecentDomainAction.bind(this),
      customerNextDomainNotification:
        this.getCustomerNextDomainNotification.bind(this),
      customerDomainNotificationTypes:
        this.getCustomerDomainNotificationTypes.bind(this),
      customerDomainNotificationSchema:
        this.getCustomerDomainNotificationSchema.bind(this),
    },
    post: {
      available: this.postAvailable.bind(this),
      contactsValidate: this.postContactsValidate.bind(this),
      purchase: this.postPurchase.bind(this),
      purchaseValidate: this.postPurchaseValidate.bind(this),
      privacyPurchase: this.postPrivacyPurchase.bind(this),
      renewDomain: this.postRenewDomain.bind(this),
      transferDomain: this.postTransferDomain.bind(this),
      resendVerificationEmail: this.postResendVerificationEmail.bind(this),
      customerRedeem: this.postCustomerRedeem.bind(this),
      customerTransferOut: this.postCustomerTransferOut.bind(this),
      customerForwardConfigByFqdn:
        this.postCustomerForwardConfigByFqdn.bind(this),
      customerDomainAcknowledge: this.postCustomerDomainAcknowledge.bind(this),
    },
    delete: {
      domain: this.deleteDomain.bind(this),
      domainPrivacy: this.deleteDomainPrivacy.bind(this),
      domainDnsRecords: this.deleteDomainDnsRecords.bind(this),
      customerDomainByFqdn: this.deleteCustomerDomainByFqdn.bind(this),
      customerRecentDomainAction:
        this.deleteCustomerRecentDomainAction.bind(this),
    },
    patch: {
      domain: this.patchDomain.bind(this),
      domainContacts: this.patchDomainContacts.bind(this),
      domainRecords: this.patchDomainRecords.bind(this),
    },
    put: {
      domainRecords: this.putDomainRecords.bind(this),
      domainDnsRecords: this.putDomainDnsRecords.bind(this),
      domainDnsRecordsByType: this.putDomainDnsRecordsByType.bind(this),
      customerForwardInfoByFqdn: this.putCustomerForwardInfoByFqdn.bind(this),
      customerDomainNotification: this.putCustomerDomainNotification.bind(this),
    },
  };

  public shoppersAPIs = {
    get: {
      shopper: this.getShopper.bind(this),
      shopperDetails: this.getShopperDetails.bind(this),
    },
    post: {
      shopper: this.postShopper.bind(this),
      shopperSubaccount: this.postShopperSubaccount.bind(this),
    },
    delete: {
      shopper: this.deleteShopper.bind(this),
    },
    put: {
      shopperSubaccountPassword: this.putShopperSubaccountPassword.bind(this),
    },
  };

  public certificatesAPI = {
    get: {
      certificate: this.getCertificate.bind(this),
      certificateActions: this.getCertificateActions.bind(this),
      certificateCallback: this.getCertificateCallback.bind(this),
      customerCertificateDetails:
        this.getCertificateCustomerCertificateDetails.bind(this),
      customerCertificates: this.getCertificateCustomerCertificates.bind(this),
      detailedInfoForSuppliedDomain:
        this.getCertificateDetailedInfoForSuppliedDomain.bind(this),
      domainVerificationStatus:
        this.getCertificateDomainVerificationStatus.bind(this),
      download: this.getCertificateDownload.bind(this),
      emailHistory: this.getCertificateEmailHistory.bind(this),
      externalAccountBindingForCustomer:
        this.getCertificateExternalAccountBindingForCustomer.bind(this),
      siteSeal: this.getCertificateSiteSeal.bind(this),
    },
    post: {
      certificate: this.postCertificate.bind(this),
      alternateEmail: this.postCertificateAlternateEmail.bind(this),
      cancel: this.postCertificateCancel.bind(this),
      checkDomainControl: this.postCertificateCheckDomainControl.bind(this),
      reissue: this.postCertificateReissue.bind(this),
      renew: this.postCertificateRenew.bind(this),
      resendEmail: this.postCertificateResendEmail.bind(this),
      resendEmailToEmail: this.postCertificateResendEmailToEmail.bind(this),
      revoke: this.postCertificateRevoke.bind(this),
      validateCertificate: this.postValidateCertificate.bind(this),
    },
    delete: {
      certificateCallback: this.deleteCertificateCallback.bind(this),
    },
    put: {
      certificateCallback: this.putCertificateCallback.bind(this),
    },
  };

  public countriyAPI = {
    get: {
      countries: this.getCountries.bind(this),
      country: this.getCountry.bind(this),
    },
  };

  private header: Record<string, string> = {
    accept: "application/json",
    Authorization: "",
  };
  //#endregion

  //#region get methods
  /**
   * @method getDomains
   * @description Get all domains
   * @param statuses - Array of statuses
   * @param statusGroups - Array of status groups
   * @param limit - Number of domains to return
   * @param marker - Marker to start from
   * @param includes - Array of includes
   * @param modifiedDate - Date to filter by
   * @param xShopperId - Shopper ID
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getDomains(
    statuses: StatusType[],
    statusGroups: StatusGroupType[],
    limit: number,
    marker: string,
    includes: OptionalDetailType[],
    modifiedDate: string,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains?statuses=${statuses?.join(
      ",",
    )}&statusGroups=${statusGroups?.join(
      ",",
    )}&limit=${limit}&marker=${marker}&includes=${includes?.join(
      ",",
    )}&modifiedDate=${modifiedDate}`;
    const headers =
      xShopperId !== undefined
        ? {
            ...this.header,
            "X-Shopper-Id": `${xShopperId}`,
          }
        : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getAgreements
   * @description Get all agreements
   * @param xMarketId - Market ID
   * @param tlds - Array of TLDs
   * @param privacy - Privacy
   * @param forTransfer - For transfer
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getAgreements(
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
  private async getAvailable(
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
  private async getPurchaseSchema(tld: string): Promise<IRes> {
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
  private async getSuggestions(
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
  private async getTlds(): Promise<IRes> {
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
  private async getDomain(domain: string, xShopperId?: string): Promise<IRes> {
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
  private async getDnsRecords(
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

  /**
   * @method getCustomerDomain
   * @description Get customer domain
   * @param customerId - customerId
   * @param domain - domain
   * @param includes - includes
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerDomain(
    customerId: string,
    domain: string,
    includes: CustomerDomainQuery,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}?includes=${includes}`;
    const headers = xRequestId
      ? { ...this.header, "X-Request-Id": `${xRequestId}` }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerForwardInfoByFqdn
   * @description Get customer forward info by fqdn
   * @param customerId - customerId
   * @param fqdn - fqdn
   * @param includeSubs - includeSubs
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerForwardInfoByFqdn(
    customerId: string,
    fqdn: string,
    includeSubs: boolean,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/forwards/${fqdn}?includeSubs=${includeSubs}`;
    const r = await fetch(url, { method: "GET", headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerDomainActions
   * @description Get customer domain actions
   * @param customerId - customerId
   * @param domain - domain
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerDomainActions(
    customerId: string,
    domain: string,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}/actions`;
    const headers = xRequestId
      ? { ...this.header, "X-Request-Id": `${xRequestId}` }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerRecentDomainAction
   * @description Get customer recent domain action
   * @param customerId - customerId
   * @param domain - domain
   * @param type - type
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerRecentDomainAction(
    customerId: string,
    domain: string,
    type: ActionType,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}/actions/${type}`;
    const r = await fetch(url, { method: "GET", headers: this.header });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerNextDomainNotification
   * @description Get customer next domain notification
   * @param customerId - customerId
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerNextDomainNotification(
    customerId: string,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/notifications`;
    const headers = xRequestId
      ? { ...this.header, "X-Request-Id": `${xRequestId}` }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerDomainNotificationTypes
   * @description Get customer domain notification types that are opt in
   * @param customerId - customerId
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerDomainNotificationTypes(
    customerId: string,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/notifications/optIn`;
    const headers = xRequestId
      ? { ...this.header, "X-Request-Id": `${xRequestId}` }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCustomerDomainNotificationSchema
   * @description Get customer domain notification schema for the specified notification type
   * @param customerId - customerId
   * @param type - type
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCustomerDomainNotificationSchema(
    customerId: string,
    type: NotificationType,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/notifications/schemas/${type}`;
    const headers = xRequestId
      ? { ...this.header, "X-Request-Id": `${xRequestId}` }
      : this.header;
    const r = await fetch(url, { method: "GET", headers });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getShopper
   * @description Get shopper
   * @param shopperId - shopperId
   * @param includes - includes
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getShopper(
    shopperId: string,
    includes: IncludeShopperType[] = [],
  ): Promise<IRes> {
    const url =
      includes?.length > 0
        ? `${this.url}v1/shoppers/${shopperId}`
        : `${this.url}v1/shoppers/${shopperId}?includes=${includes.join(",")}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getShopperDetails
   * @description Get shopper details
   * @param shopperId - shopperId
   * @param auditClientIp - auditClientIp
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getShopperDetails(
    shopperId: string,
    auditClientIp: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/shoppers/${shopperId}/status?auditClientIp=${auditClientIp}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificate
   * @description Get certificate
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificate(certificateId: string): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateActions
   * @description Get certificate actions
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateActions(certificateId: string): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/actions`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateEmailHistory
   * @description Get certificate email history
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateEmailHistory(
    certificateId: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/email/history`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateCallback
   * @description Get certificate callback
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateCallback(certificateId: string): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/callback`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateDownload
   * @description Get certificate download
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateDownload(certificateId: string): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/download`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateSiteSeal
   * @description Get certificate site seal
   * @param certificateId - certificateId
   * @param theme - theme
   * @param local - local
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateSiteSeal(
    certificateId: string,
    theme: "LIGHT" | "DARK",
    local: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/siteSeal?theme=${theme}&local=${local}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateCustomerCertificates
   * @description Get certificate customer certificates
   * @param customerId - customerId
   * @param offset - offset
   * @param limit - limit
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateCustomerCertificates(
    customerId: string,
    offset: number,
    limit: number,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/certificates?offset=${offset}&limit=${limit}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateCustomerCertificateDetails
   * @description Get certificate customer certificate details
   * @param customerId - customerId
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateCustomerCertificateDetails(
    customerId: string,
    certificateId: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/certificates/${certificateId}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateDomainVerificationStatus
   * @description Get certificate domain verification status
   * @param customerId - customerId
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateDomainVerificationStatus(
    customerId: string,
    certificateId: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/certificates/${certificateId}/domainVerifications`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateDetailedInfoForSuppliedDomain
   * @description Get certificate detailed info for supplied domain
   * @param customerId - customerId
   * @param certificateId - certificateId
   * @param domain - domain
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateDetailedInfoForSuppliedDomain(
    customerId: string,
    certificateId: string,
    domain: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/certificates/${certificateId}/domainVerifications/${domain}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCertificateExternalAccountBindingForCustomer
   * @description Get certificate external account binding for customer
   * @param customerId - customerId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCertificateExternalAccountBindingForCustomer(
    customerId: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/certificates/acme/externalAccountBinding`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCountries
   * @description Get countries
   * @param marketId - marketId
   * @param regionTypeId - regionTypeId
   * @param regionName - regionName
   * @param fate - fate
   * @param order - order
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCountries(
    marketId: string,
    regionTypeId: number,
    regionName: string,
    fate: "key" | "label",
    order: "ascending" | "descending",
  ): Promise<IRes> {
    const url = `${this.url}v1/countries?marketId=${marketId}&regionTypeId=${regionTypeId}&regionName=${regionName}&sort=${fate}&order=${order}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method getCountry
   * @description Get country
   * @param countryKey - countryKey
   * @param marketId - marketId
   * @param fate - fate
   * @param order - order
   * @returns {Promise<IRes>} - Promise with response
   */
  private async getCountry(
    countryKey: string,
    marketId: string,
    fate: "key" | "label",
    order: "ascending" | "descending",
  ): Promise<IRes> {
    const url = `${this.url}v1/countries/${countryKey}?marketId=${marketId}&sort=${fate}&order=${order}`;
    const r = await fetch(url, {
      method: "GET",
      headers: this.header,
    });
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
  private async postAvailable(
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
  private async postContactsValidate(
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
  private async postPurchase(
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
  private async postPurchaseValidate(body: ISchemaRes): Promise<IRes> {
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
  private async postPrivacyPurchase(
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

  /**
   * @method postRenewDomain
   * @description Post renew domain
   * @param domain - domain
   * @param body - body
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postRenewDomain(
    domain: string,
    body: {
      period: number;
    },
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/renew`;
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
   * @method postTransferDomain
   * @description Post transfer domain
   * @param domain - domain
   * @param body - body
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postTransferDomain(
    domain: string,
    body: ITransferDomainPurchase,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/transfer`;
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
   * @method postResendVerificationEmail
   * @description Post resend verification email
   * @param domain - domain
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postResendVerificationEmail(
    domain: string,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/verifyRegistrantEmail`;
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
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCustomerRedeem
   * @description Post customer redeem
   * @param customerId - customerId
   * @param domain - domain
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCustomerRedeem(
    customerId: string,
    domain: string,
    body: ICustomerRedeemDomain,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}/redeem`;
    const headers =
      xRequestId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Request-Id": `${xRequestId}`,
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
   * @method postCustomerTransferOut
   * @description Post customer transfer out
   * @param customerId - customerId
   * @param domain - domain
   * @param registrar - registrar
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCustomerTransferOut(
    customerId: string,
    domain: string,
    registrar: string,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}/transferOut?registrar=${registrar}`;
    const headers =
      xRequestId !== undefined
        ? {
            ...this.header,
            "X-Request-Id": `${xRequestId}`,
          }
        : {
            ...this.header,
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCustomerForwardConfigByFqdn
   * @description Post customer forward config by fqdn
   * @param customerId - customerId
   * @param fqdn - fqdn
   * @param body - body
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCustomerForwardConfigByFqdn(
    customerId: string,
    fqdn: string,
    body: IDomainForwardRule,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/forwards/${fqdn}`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCustomerDomainAcknowledge
   * @description Post customer domain acknowledge
   * @param customerId - customerId
   * @param notificatinId - notificationId
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCustomerDomainAcknowledge(
    customerId: string,
    notificationId: string,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/notifications/${notificationId}/acknowledge`;
    const headers =
      xRequestId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Request-Id": `${xRequestId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postShopperSubaccount
   * @description Post shopper subaccount
   * @param subaccount - subaccount
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postShopperSubaccount(subaccount: ISubaccount): Promise<IRes> {
    const url = `${this.url}v1/shoppers/subaccount`;
    const r = await fetch(url, {
      method: "POST",
      headers: {
        ...this.header,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subaccount),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postShopper
   * @description Post shopper
   * @param shopperId - shopperId
   * @param shopper - shopper
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postShopper(
    shopperId: string,
    shopper: IShopper,
  ): Promise<IRes> {
    const url = `${this.url}v1/shoppers/${shopperId}`;
    const r = await fetch(url, {
      method: "POST",
      headers: {
        ...this.header,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopper),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificate
   * @description Post certificate
   * @param certificateCreate - certificateCreate
   * @param xMarketId - xMarketId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificate(
    certificateCreate: ICertificateCreate,
    xMarketId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates`;
    const headers =
      xMarketId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Market-Id": `${xMarketId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(certificateCreate),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postValidateCertificate
   * @description Post validate certificate
   * @param certificateCreate - certificateCreate
   * @param xMarketId - xMarketId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postValidateCertificate(
    certificateCreate: ICertificateCreate,
    xMarketId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/validate`;
    const headers =
      xMarketId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Market-Id": `${xMarketId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(certificateCreate),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateResendEmail
   * @description Post certificate resend email
   * @param certificateId - certificateId
   * @param emailId - emailId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateResendEmail(
    certificateId: string,
    emailId: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/email/${emailId}/resend`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateAlternateEmail
   * @description Post certificate alternate email
   * @param certificateId - certificateId
   * @param emailAddress - emailAddress
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateAlternateEmail(
    certificateId: string,
    emailAddress: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/email/resend/${emailAddress}`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateResendEmailToEmail
   * @description Post certificate resend email to email
   * @param certificateId - certificateId
   * @param emailId - emailId
   * @param emailAddress - emailAddress
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateResendEmailToEmail(
    certificateId: string,
    emailId: string,
    emailAddress: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/email/${emailId}/resend/${emailAddress}`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateCancel
   * @description Post certificate cancel
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateCancel(certificateId: string): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/cancel`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateReissue
   * @description Post certificate reissue
   * @param certificateId - certificateId
   * @param reissueCreate - reissueCreate
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateReissue(
    certificateId: string,
    reissueCreate: IReissueCertificate,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/reissue`;
    const r = await fetch(url, {
      method: "POST",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(reissueCreate),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateRenew
   * @description Post certificate renew
   * @param certificateId - certificateId
   * @param renewCreate - renewCreate
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateRenew(
    certificateId: string,
    renewCreate: IRenewCertificate,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/renew`;
    const r = await fetch(url, {
      method: "POST",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(renewCreate),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateRevoke
   * @description Post certificate revoke
   * @param certificateId - certificateId
   * @param certificateRevoke - certificateRevoke
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateRevoke(
    certificateId: string,
    certificateRevoke: { reason: string },
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/revoke`;
    const r = await fetch(url, {
      method: "POST",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(certificateRevoke),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method postCertificateCheckDomainControl
   * @description Post certificate check domain control
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async postCertificateCheckDomainControl(
    certificateId: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/verifyDomainControl`;
    const r = await fetch(url, {
      method: "POST",
      headers: this.header,
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
  private async deleteDomain(domain: string): Promise<IRes> {
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
  private async deleteDomainPrivacy(
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

  /**
   * @method deleteDomainDnsRecords
   * @description Delete domain dns records
   * @param domain - domain
   * @param type - type
   * @param name - name
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async deleteDomainDnsRecords(
    domain: string,
    type: DnsRecordType,
    name: string,
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records/${type}/${name}`;
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

  /**
   * @method deleteCustomerDomainByFqdn
   * @description Delete customer domain by fqdn
   * @param customerId - customerId
   * @param fqdn - fqdn
   * @returns {Promise<IRes>} - Promise with response
   */
  private async deleteCustomerDomainByFqdn(
    customerId: string,
    fqdn: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/forwards/${fqdn}`;
    const r = await fetch(url, {
      method: "DELETE",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method deleteCustomerRecentDomainAction
   * @description Delete customer recent domain action
   * @param customerId - customerId
   * @param domain - domain
   * @param type - type
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async deleteCustomerRecentDomainAction(
    customerId: string,
    domain: string,
    type: ActionType,
    xRequestId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/${domain}/actions/${type}`;
    const headers =
      xRequestId !== undefined
        ? {
            ...this.header,
            "X-Request-Id": `${xRequestId}`,
          }
        : this.header;
    const r = await fetch(url, {
      method: "DELETE",
      headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method deleteShopper
   * @description Delete shopper
   * @param shopperId - shopperId
   * @param auditClientIp - auditClientIp
   * @returns {Promise<IRes>} - Promise with response
   */
  private async deleteShopper(
    shopperId: string,
    auditClientIp: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/shoppers/${shopperId}?auditClientIp=${auditClientIp}`;
    const r = await fetch(url, {
      method: "DELETE",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method deleteCertificateCallback
   * @param certificateId - certificateId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async deleteCertificateCallback(
    certificateId: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/callback`;
    const r = await fetch(url, {
      method: "DELETE",
      headers: this.header,
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
  private async patchDomain(
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
  private async patchDomainContacts(
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
  private async patchDomainRecords(
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
  private async putDomainRecords(
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

  /**
   * @method putDomainDnsRecords
   * @description Put domain dns records
   * @param domain - domain
   * @param type - type
   * @param name - name
   * @param records - records
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putDomainDnsRecords(
    domain: string,
    type: DnsRecordType,
    name: string,
    records: IRecord[],
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records/${type}/${name}`;
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

  /**
   * @method putDomainDnsRecordsByType
   * @description Put domain dns records by type
   * @param domain - domain
   * @param type - type
   * @param records - records
   * @param xShopperId - xShopperId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putDomainDnsRecordsByType(
    domain: string,
    type: DnsRecordType,
    records: IRecord[],
    xShopperId?: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/domains/${domain}/records/${type}`;
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

  /**
   * @method putCustomerForwardInfoByFqdn
   * @description Put customer forward info by fqdn
   * @param customerId - customerId
   * @param fqdn - fqdn
   * @param body - body
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putCustomerForwardInfoByFqdn(
    customerId: string,
    fqdn: string,
    body: IDomainForwardRule,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/forwards/${fqdn}`;
    const r = await fetch(url, {
      method: "PUT",
      headers: { ...this.header, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method putCustomerDomainNotification
   * @description Put customer domain notification
   * @param customerId - customerId
   * @param type - type
   * @param xRequestId - xRequestId
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putCustomerDomainNotification(
    customerId: string,
    type: ActionType,
    xRequestId: string,
  ): Promise<IRes> {
    const url = `${this.url}v2/customers/${customerId}/domains/notifications/optIn?types=${type}`;
    const headers =
      xRequestId !== undefined
        ? {
            ...this.header,
            "Content-Type": "application/json",
            "X-Request-Id": `${xRequestId}`,
          }
        : {
            ...this.header,
            "Content-Type": "application/json",
          };
    const r = await fetch(url, {
      method: "PUT",
      headers: headers,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method putShopperSubaccountPassword
   * @description Put shopper subaccount password
   * @param shopperId - shopperId
   * @param secret - secret
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putShopperSubaccountPassword(
    shopperId: string,
    secret: { secret: string },
  ): Promise<IRes> {
    const url = `${this.url}v1/shoppers/${shopperId}/factors/password`;
    const r = await fetch(url, {
      method: "PUT",
      headers: {
        ...this.header,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(secret),
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }

  /**
   * @method putCertificateCallback
   * @description Put certificate callback
   * @param certificateId - certificateId
   * @param callbackUrl - callbackUrl
   * @returns {Promise<IRes>} - Promise with response
   */
  private async putCertificateCallback(
    certificateId: string,
    callbackUrl: string,
  ): Promise<IRes> {
    const url = `${this.url}v1/certificates/${certificateId}/callback?callbackUrl=${callbackUrl}`;
    const r = await fetch(url, {
      method: "PUT",
      headers: this.header,
    });
    const res = await r.json();
    return { status: r.status, data: res };
  }
  //#endregion
}
