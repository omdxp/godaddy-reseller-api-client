export interface IRes {
  status: number;
  data: any;
}

export type CheckType = "FAST" | "FULL";

interface IContactInfo {
  addressMailing: {
    address1: string;
    address2: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;
  };
  email: string;
  fax: string;
  jobTitle: string;
  nameFirst: string;
  nameLast: string;
  nameMiddle: string;
  organization: string;
  phone: string;
}

export interface IDomainsContactsValidation {
  contactAdmin: IContactInfo;
  contactBilling: IContactInfo;
  contactPresence: IContactInfo;
  contactRegistrant: IContactInfo;
  contactTech: IContactInfo;
  domains: string[];
  entityType: "ABORIGINAL";
}

export interface ISchemaRes {
  consent: {
    agreedAt: string;
    agreedBy: string;
    agreementKeys: string[];
  };
  contactAdmin: IContactInfo;
  contactBilling: IContactInfo;
  contactRegistrant: IContactInfo;
  contactTech: IContactInfo;
  domain: string;
  nameServers: string[];
  period: number;
  privacy: boolean;
  renewAuto: boolean;
}

export type Sources = "CC_TLD" | "EXTENSTION" | "KEYWORD_SPIN" | "PREMIUM";

export interface IPatchDomain {
  locked: boolean;
  nameServers: string[];
  renewAuto: boolean;
  subaccountId: string;
  exposeWhois: boolean;
  consent: {
    agreedAt: string;
    agreedBy: string;
    agreementKeys: string[];
  };
}

export interface IContacts {
  contactAdmin: IContactInfo;
  contactBilling: IContactInfo;
  contactRegistrant: IContactInfo;
  contactTech: IContactInfo;
}

export interface IPrivacyPurchaseOptions {
  consent: {
    agreedAt: string;
    agreedBy: string;
    agreementKeys: string[];
  };
}

export interface IRecord {
  data: string;
  name: string;
  port: number;
  priority: number;
  protocol: string;
  service: string;
  ttl: number;
  type: string;
  weight: number;
}

export type DnsRecordType =
  | "HAS"
  | "YYYY"
  | "CNAME"
  | "MX"
  | "NS"
  | "SOA"
  | "TXT"
  | "SRV"
  | "A"
  | "AAAA";

export interface ITransferDomainPurchase {
  authCode: string;
  consent: {
    agreedAt: string;
    agreedBy: string;
    agreementKeys: string[];
  };
  period: number;
  privacy: boolean;
  renewAuto: boolean;
  contactAdmin: IContactInfo;
  contactBilling: IContactInfo;
  contactRegistrant: IContactInfo;
  contactTech: IContactInfo;
}

export type CustomerDomainQuery =
  | "actions"
  | "contacts"
  | "dnssecRecords"
  | "registryStatusCodes";
