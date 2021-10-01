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
