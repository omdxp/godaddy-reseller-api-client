# Certificates API

There are many APIs that can be used to retrieve and manage certificates. The following APIs are available:

- [Get](#get)
  - [Get certificate](#get-certificate)
  - [Get certificate actions](#get-certificate-actions)
  - [Get certificate callback](#get-certificate-callback)
  - [Get customer certificate details](#get-customer-certificate-details)
  - [Get customer certificates](#get-customer-certificates)
  - [Get detailed info for supplied domain](#get-detailed-info-for-supplied-domain)
  - [Get domain verification status](#get-domain-verification-status)
  - [Get download](#get-download)
  - [Get email history](#get-email-history)
  - [Get external account binding for customer](#get-external-account-binding-for-customer)
  - [Get site seal](#get-site-seal)
- [Post](#post)
  - [Post certificate](#post-certificate)
  - [Post alternate email](#post-alternate-email)
  - [Post cancel](#post-cancel)
  - [Post check domain control](#post-check-domain-control)
  - [Post reissue](#post-reissue)
  - [Post renew](#post-renew)
  - [Post resend email](#post-resend-email)
  - [Post resend email to email](#post-resend-email-to-email)
  - [Post revoke](#post-revoke)
  - [Post validate certificate](#post-validate-certificate)
- [Delete](#delete)
  - [Delete certificate callback](#delete-certificate-callback)
- [Put](#put)
  - [Put certificate callback](#put-certificate-callback)

Considering that you already have instanciate the `Client` object as shown [here](./INSTANCIATE_CLIENT_CLASS.md).

# Get

## Get certificate

To get certificate simply write:

```js
const { status, data } = await c.certificatesAPI.get.certificate(certificateId);
```

It receives the following arguments:

- `certificateId` - The id of the certificate to retrieve.

## Get certificate actions

To get certificate actions simply write:

```js
const { status, data } = await c.certificatesAPI.get.certificateActions(
  certificateId,
);
```

It receives the following arguments:

    - `certificateId` - The id of the certificate to retrieve actions for.

## Get certificate callback

To get certificate callback simply write:

```js
const { status, data } = await c.certificatesAPI.get.certificateCallback(
  certificateId,
);
```

It receives the following arguments:

- `certificateId` - The id of the certificate to retrieve callback for.

## Get customer certificate details

To get customer certificate details simply write:

```js
const { status, data } = await c.certificatesAPI.get.customerCertificateDetails(
  customerId,
  certificateId,
);
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve certificate details for.
- `certificateId` - The id of the certificate to retrieve details for.

## Get customer certificates

To get customer certificates simply write:

```js
const { status, data } = await c.certificatesAPI.get.customerCertificates(
  customerId,
  offset,
  limit,
);
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve certificates for.
- `offset` - The offset to start retrieving certificates from.
- `limit` - The number of certificates to retrieve.

## Get detailed info for supplied domain

To get detailed info for supplied domain simply write:

```js
const { status, data } =
  await c.certificatesAPI.get.detailedInfoForSuppliedDomain(
    customerId,
    certificateId,
    domain,
  );
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve certificate details for.
- `certificateId` - The id of the certificate to retrieve details for.
- `domain` - The domain to retrieve detailed info for.

## Get domain verification status

To get domain verification status simply write:

```js
const { status, data } = await c.certificatesAPI.get.domainVerificationStatus(
  customerId,
  certificateId,
);
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve certificate details for.
- `certificateId` - The id of the certificate to retrieve details for.

## Get download

To get download simply write:

```js
const { status, data } = await c.certificatesAPI.get.download(customerId);
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve certificate details for.

## Get email history

To get email history simply write:

```js
const { status, data } = await c.certificatesAPI.get.emailHistory(
  certificateId,
);
```

It receives the following arguments:

- `certificateId` - The id of the certificate to retrieve email history for.

## Get external account binding for customer

To get external account binding for customer simply write:

```js
const { status, data } =
  await c.certificatesAPI.get.externalAccountBindingForCustomer(customerId);
```

It receives the following arguments:

- `customerId` - The id of the customer to retrieve external account binding for.

## Get site seal

To get site seal simply write:

```js
const { status, data } = await c.certificatesAPI.get.siteSeal(
  certificateId,
  theme,
  local,
);
```

It receives the following arguments:

- `certificateId` - The id of the certificate to retrieve site seal for.
- `theme` - The theme to use for the seal.
- `local` - The local to use for the seal.

# Post

# Delete

# Put
