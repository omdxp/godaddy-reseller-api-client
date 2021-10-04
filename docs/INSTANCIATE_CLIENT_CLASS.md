# Instanciate a Client object

To start using the client you should import and instanciate it. The client is a wrapper around the API. It provides a simple interface to the API. The client is a singleton, so you can instanciate it only once.

```js
import Client from "godaddy-reseller-api-client";

const c = new Client("{your-rcc-sandbox-key}", "{your-api-secret}");
```

As you can see, the `Client` class has a constructor with 2 arguments which are the `rcc-sandbox-key` and the `api-secret`. The `rcc-sandbox-key` is the key you got from the RCC Sandbox and the `api-secret` is the secret you got from the Godaddy api secret.

Once you have this client, you can use it to make calls to the API.

All methods returns returns a `Promise` object. It contains the `status` (the response status) and `data` (the json response) properties.
