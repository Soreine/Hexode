"use strict";
/**
 Detailed behavior
 -----------------

 1. The client is making http request through SSL. It is able to
 substitute query parameters from given parameters in the given path
 and send only remaining parameters in the query data.

 2. If the header `Content-type` equals `application/json` data should
 be sent as a json stringified object. If no header `Content-type` is
 precised, then the header `Content-type` is set by default to
 `application/json`.

 3. In case of an errored response, the promise is rejected with an
 object of the following shape:

 {
 "error": <String>,
 "code": <Number>
 }

 Where error being the error message from the server and code the http
 error code.

 4. If the server response header contains a `Content-type` equals to
 `application/json` then the promised should be resolved with a parsed
 and formatted JSON object. In case of parsing failure, the promise is
 rejected with an appropriate http code and message.

 5. The HTTPClient holds its own default timeout (not configurable)
 and will be in charge of automatically retransmitting the request
 after a timeout. The returned promise is rejected only if a given
 number (not configurable) of successive request timeouts.
 */


var HTTPClient = (function () {
  var proto = {};
  /** Create an instance of an HTTPClient. Optionnaly injects a
   replacement for the XMLHttpRequest object.

   (XMLHttpRequest) -> HTTPClient
   */
  function create(xmlHttpRequest) {
    var httpClient = Object.create(proto, {
      xhr: {value: xmlHttpRequest | XMLHttpRequest }
    });
    return httpClient;
  }

  /**
   * Usage example
   * -------------
   *
   * HTTPClient
   *   .send("https://api.com", "/games/:gameId", "GET",
   *     { gameId: "thc87nw6" }, { Authorization: "094ba65" })
   *   .then(handleSuccess)
   *   .catch(handleError)
   *
   * M:"GET"|"POST"|"PUT"|"DELETE" =>
   * String -> String, M, Object, Object -> Promise(String, Object)
   */
  proto.send = function (host, path, method, params, headers) {
    // TODO Should I curry the host part ?
    
  };


  /* -------------- prototype ------------------ */

  /**
   * Substitutes all the parameters's values in a path with value in
   * the params object.
   *
   * String, Object -> String
   */
  function replacePathParameters(path, params) {
    var re = /:\w*/g;
    var inlineParams = findPathParameters(path);
    var splitted = path.split(re);
    var replaced = [splitted[0]];
    inlineParams.forEach(function insertValue(item, index) {
      replaced.push(encodeURIComponent(params[item]));
      replaced.push(splitted[index+1]);
    });
    return replaced.join('');
  };

  /** Returns a copy of the object with all the listed properties deleted.
   * TODO: change this function so it returns a new object
   *
   * [String], Object -> ()
   */
  function deleteProperties(properties, object) {
    properties.forEach(function del(prop) {
      delete object[prop];
    });
  }
  
  /**
   * Append query parameters to a path for all the values in the
   * params object.
   *
   * String, Object -> String
   */
  function addQueryParameters(path, params) {
    var queryParams = Object.getOwnPropertyNames(params).map(
      function toQuery(prop) {
        return prop + "=" + encodeURIComponent(params[prop]);
      });
    if(queryParams.length === 0) {
      return path;
    } else {
      return path + "?" + queryParams.join("&");
    }
  }
  
  /** Returns the list of all parameters found in the path string, in
   * order. A parameter is delimited by a ':' colon and followed by a
   * string of alphanumerical characters.
   * 
   * String -> [String]
   */
  function findPathParameters(path) {
    var re = /:(\w*)/g;
    var params = []; // All the parameters found
    var match;
    while((match = re.exec(path))) {
      params.push(match[1]);
    }
    return params;
  };

  return Object.create({
    create: create,
    // Functions here are available, but not needed (useful for testing).
    // Should we write them as "_function" ?
    findPathParameters: findPathParameters,
    addQueryParameters: addQueryParameters,
    deleteProperties: deleteProperties,
    replacePathParameters: replacePathParameters
  });
})();
