# Shoppers APIs

There are many APIs that can be used to access and manage the shoppers data. The following APIs are available:

- [Get](#get)
  - [Shopper](#get-shopper)
  - [Shopper details](#get-shopper-details)
- [Post](#post)
  - [Shopper](#post-shopper)
  - [Shopper subaccount](#post-shopper-subaccount)
- [Delete](#delete)
  - [Shopper](#delete-shopper)
- [Put](#put)
  - [Shopper subaccount password](#put-shopper-subaccount-password)

Considering that you already have instanciate the `Client` object as shown [here](./INSTANCIATE_CLIENT_CLASS.md).

# Get

## Get shopper

To get shopper simply write:

```js
const { status, data } = await c.shoppersAPIs.get.shopper(shopperId, includes);
```

It receives the following arguments:

- shopperId: the shopper id
- includes: the includes to be used

## Get shopper details

To get shopper details simply write:

```js
const { status, data } = await c.shoppersAPIs.get.shopperDetails(
  shopperId,
  auditClientIp,
);
```

It receives the following arguments:

- shopperId: the shopper id
- auditClientIp: the audit client ip

# Post

# Delete

# Put
