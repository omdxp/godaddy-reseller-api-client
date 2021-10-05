# Country API

There are many APIs that can be used for countries. The following APIs are available:

- [Get](#get)
  - [Get countries](#get-countries)
  - [Get country](#get-country)

Considering that you already have instanciate the `Client` object as shown [here](./INSTANCIATE_CLIENT_CLASS.md).

# Get

## Get countries

To get countries simply write:

```js
const { status, data } = await c.countriyAPI.get.countries(
  marketId,
  regionTypeId,
  regionName,
  fate,
  order,
);
```

It receives the following arguments:

- `marketId`: The market id.
- `regionTypeId`: The region type id.
- `regionName`: The region name.
- `fate`: The fate.
- `order`: The order.

## Get country

To get a country simply write:

```js
const { status, data } = await c.countriyAPI.get.country(
  countryKey,
  marketId,
  fate,
  order,
);
```

It receives the following arguments:

- `countryKey`: The country key.
- `marketId`: The market id.
- `fate`: The fate.
- `order`: The order.
