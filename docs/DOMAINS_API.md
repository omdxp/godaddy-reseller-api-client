# Domains APIs

There are many APIs that can be used to manage domains. The following APIs are available:

- [Get](#get)
  - [Domains](#get-domains)
  - [Agreements](#get-agreements)
  - [Available](#get-available)
  - [Purchase schema](#get-purchase-schema)
  - [Suggestions](#get-suggestions)
  - [Tlds](#get-tlds)
  - [Domain](#get-domain)
  - [Dns Records](#get-dns-records)
  - [Customer domain](#get-customer-domain)
  - [Customer forward info by Fqdn](#get-customer-forward-info-by-fqdn)
  - [Customer domain actions](#get-customer-domain-actions)
  - [Customer recent domain action](#get-customer-recent-domain-action)
  - [Customer next domain notification](#get-customer-next-domain-notification)
  - [Customer domain notification types](#get-customer-domain-notification-types)
  - [Customer domain notification schema](#get-customer-domain-notification-schema)
- [Post](#post)
  - [Available](#post-available)
  - [Contacts validate](#post-contacts-validate)
  - [Purchase](#post-purchase)
  - [Purchase validate](#post-purchase-validate)
  - [Privacy purchase](#post-privacy-purchase)
  - [Renew domain](#post-renew-domain)
  - [Transfer domain](#post-transfer-domain)
  - [Resend verification email](#post-resend-verification-email)
  - [Customer redeem](#post-customer-redeem)
  - [Customer transfer out](#post-customer-transfer-out)
  - [Customer forward config by Fqdn](#post-customer-forward-config-by-fqdn)
  - [Customer domain acknowledge](#post-customer-domain-acknowledge)
- [Delete](#delete)
  - [domain](#delete-domain)
  - [domainPrivacy](#delete-domain-privacy)
- [Patch](#patch)
  - [Domain](#patch-domain)
  - [Domain contacts](#patch-domain-contacts)
  - [Domain records](#-patch-domain-records)
- [Put](#put)
  - [Domain records](#patch-domain-records)
  - [Domain dns records](#patch-domain-dns-records)
  - [Domain dns records by type](#patch-domain-dns-record-by-type)
  - [Customer forward info by Fqdn](#patch-customer-forward-info-by-fqdn)
  - [Customer domain notification](#patch-customer-domain-notification)

Considering that you already have instanciate the `Client` object as shown [here](./INSTANCIATE_CLIENT_CLASS.md).

# Get

## Get domains

To get domains simply write:

```js
const { status, data } = await c.domainsAPIs.get.domains(statuses, statusGroups, limit, marker,  includes, modifiedDate, xShopperId?);
```

It receives the following arguments:

- `statuses` - Array of statuses
- `statusGroups` - Array of status groups
- `limit` - Number of domains to return
- `marker` - Marker to start from
- `includes` - Array of includes
- `modifiedDate` - Date to filter by
- `xShopperId` - Shopper ID

## Get agreements

To get agreements simply write:

```js
const { status, data } = await c.domainsAPIs.get.agreements(
  xMarketId,
  tlds,
  privacy,
  forTransfer,
);
```

It receives the following arguments:

- `xMarketId` - Market ID
- `tlds` - Array of TLDs
- `privacy` - Boolean
- `forTransfer` - Boolean

## Get available

To get available domains simply write:

```js
const { status, data } = await c.domainsAPIs.get.available(
  domain,
  checkType,
  forTransfer,
);
```

It receives the following arguments:

- `domain` - Domain name
- `checkType` - Check type
- `forTransfer` - Boolean

## Get purchase schema

To get purchase schema simply write:

```js
const { status, data } = await c.domainsAPIs.get.purchaseSchema(tld);
```

It receives the following arguments:

- `tld` - TLD

## Get suggestions

To get suggestions simply write:

```js
const { status, data } = await c.domainsAPIs.get.suggestions(
  xShopperId,
  query,
  country,
  city,
  sources,
  tlds,
  lengthMax,
  lengthMin,
  limit,
  waitMs,
);
```

It receives the following arguments:

- `xShopperId` - Shopper ID
- `query` - Query
- `country` - Country
- `city` - City
- `sources` - Array of sources
- `tlds` - Array of TLDs
- `lengthMax` - Max length
- `lengthMin` - Min length
- `limit` - Number of suggestions to return
- `waitMs` - Wait time

## Get tlds

To get TLDs simply write:

```js
const { status, data } = await c.domainsAPIs.get.tlds();
```

## Get domain

To get domain simply write:

```js
const { status, data } = await c.domainsAPIs.get.domain(domain, xShopperId?);
```

It receives the following arguments:

- `domain` - Domain name
- `xShopperId` - Shopper ID

## Get dns records

To get dns records simply write:

```js
const { status, data } = await c.domainsAPIs.get.dnsRecords(
  domain,
  type,
  name,
  xShopperId?,
  offset,
  limit
);
```

It receives the following arguments:

- `domain` - Domain name
- `type` - DNS record type
- `name` - DNS record name
- `xShopperId` - Shopper ID
- `offset` - Offset
- `limit` - Number of records to return

## Get customer domain

To get customer domain simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerDomain(
  customerId,
  domain,
  includes,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `domain` - Domain name
- `includes` - Array of includes
- `xRequestId` - Request ID

## Get customer forward info by Fqdn

To get customer forward info by Fqdn simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerForwardInfoByFqdn(
  customerId,
  fqdn,
  includeSubs,
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `fqdn` - Fqdn
- `includeSubs` - Boolean

## Get customer domain actions

To get customer domain actions simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerDomainActions(
  customerId,
  domain,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `domain` - Domain name
- `xRequestId` - Request ID

## Get customer recent domain action

To get customer recent domain action simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerRecentDomainAction(
  customerId,
  domain,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `domain` - Domain name
- `xRequestId` - Request ID

## Get customer next domain notification

To get customer next domain notification simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerNextDomainNotification(
  customerId,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `xRequestId` - Request ID

## Get customer domain notification types

To get customer domain notification types simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerDomainNotificationTypes(
  customerId,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `xRequestId` - Request ID

## Get customer domain notification schema

To get customer domain notification schema simply write:

```js
const { status, data } = await c.domainsAPIs.get.customerDomainNotificationSchema(
  customerId,
  type,
  xRequestId?
);
```

It receives the following arguments:

- `customerId` - Customer ID
- `type` - Notification type
- `xRequestId` - Request ID
