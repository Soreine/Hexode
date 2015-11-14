#### Description
Build an HTTPClient that has the following interface:

```
/**
 * M:"GET"|"POST"|"PUT"|"DELETE" =>
 * String -> String, M, Object, Object -> Promise(String, Object)
 */
send(host, path, method, params, headers)
```

For instance, with and `HTTPClient` package:

```
HTTPClient
    .send("https://api.com", "/games/:gameId", "GET", { gameId: "thc87nw6" }, { Authorization: "094ba65" })
    .then(handleSuccess)
    .catch(handleError)
```

#### Specifications

1. The client is making http request through SSL. It is able to substitute query parameters from given
parameters in the given path and send only remaining parameters in the query data.

2. If the header `Content-type` equals `application/json` data should be sent as a json stringified
object. If no header `Content-type` is precised, then the header `Content-type` is set by default to
`application/json`.

3. In case of an errored response, the promise is rejected with an object of the following shape:
```
{
    "error": <String>,
    "code": <Number>
}
```
Where error being the error message from the server and code the http error code.

4. If the server response header contains a `Content-type` equals to `application/json` then the
promised should be resolved with a parsed and formatted JSON object. In case of parsing failure,
the promise is rejected with an appropriate http code and message.

5. The HTTPClient holds its own default timeout (not configurable) and will be in charge of
automatically retransmitting the request after a timeout. The returned promise is rejected only if a
given number (not configurable) of successive request timeouts.
