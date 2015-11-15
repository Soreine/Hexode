/* global HTTPClient */

describe("An HTTPClient", function() {
  var client = HTTPClient.create();

  it("finds parameters in a path",
     function() {
       var path = "/snoop/:d0gg/smoke?weed=:everyday&is=:swag42";
       var params = ["d0gg", "everyday", "swag42"];
       expect(HTTPClient.findPathParameters(path)).toEqual(params);
     });
  
  it("substitutes parameters's values in a path",
     function() {
       var path = "/ratatouille/is/:description/:action";
       var params = {
         description: "delicious",
         action: "I want"
       };
       var result = "/ratatouille/is/delicious/I%20want";
       expect(HTTPClient.replacePathParameters(path, params)).toEqual(result);
     });

  it("adds properties as encoded query parameters",
     function() {
       var path = "/ratatouille/is/delicious/I20%want";
       var params = {
         howmany: "one",
         when: "right now"
       };
       var result = path + "?howmany=one&when=right%20now";
       expect(HTTPClient.addQueryParameters(path, params)).toEqual(result);
     });

  it("deletes properties from an object",
     function() {
       var object = {
         toDelete1: 1,
         pleaseKeep: 2,
         toDelete2: 3
       };
       var properties = ['toDelete1', 'toDelete2'];
       var result = {
         pleaseKeep: 2
       };
       HTTPClient.deleteProperties(properties, object);
       expect(object).toEqual(result);
     });
});
