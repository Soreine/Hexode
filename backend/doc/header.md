The application backend is able to respond to request coming from the client. Unless the client
has explicitely set the `X-Requested-With` header to `XMLHttpRequest`, the backend will not
proceed the request and would rather return a game client as a plain html page. Otherwise, all
endpoints will return a json object (success as well as errors).
