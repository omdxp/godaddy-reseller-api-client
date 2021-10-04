export interface IRes {
  status: number;
  data: any;
}

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

export interface ICustomerRedeemDomain {
  consent: {
    price: number;
    fee: number;
    currency: string;
    agreedBy: string;
    agreedAt: string;
  };
}

export interface IDomainForwardRule {
  type: string;
  url: string;
  mask: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ISubaccount {
  email: string;
  externalId: number;
  markedId: string;
  nameFirst: string;
  nameLast: string;
  password: string;
}

export interface IShopper {
  email: string;
  externalId: number;
  markedId: string;
  nameFirst: string;
  nameLast: string;
}

interface IAddress {
  address1: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}

export interface ICertificateCreate {
  callbackUrl: string;
  commonName: string;
  contact: {
    email: string;
    jobTitle: string;
    nameFirst: string;
    nameLast: string;
    nameMiddle: string;
    phone: string;
    suffix: string;
  };
  csr: string;
  intelVPro: boolean;
  organization: {
    address: IAddress;
    assumedName: string;
    name: string;
    phone: string;
    registrationAgent: string;
    registrationNumber: string;
  };
  period: number;
  productType: string;
  rootType: string;
  slotSize: string;
  subjectAlternativeNames: string[];
}

export interface IReissueCertificate {
  callbackUrl: string;
  commonName: string;
  csr: string;
  delayExistingRevoke: number;
  rootType: string;
  subjectAlternativeNames: string[];
}

export interface IRenewCertificate {
  callbackUrl: string;
  commonName: string;
  csr: string;
  period: number;
  rootType: string;
  subjectAlternativeNames: string[];
}
