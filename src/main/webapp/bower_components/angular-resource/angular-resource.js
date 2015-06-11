/**
 * @license AngularJS v1.3.11
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

var $resourceMinErr = angular.$$minErr('$resource');

// Helper functions and regex to lookup a dotted path on an object
// stopping at undefined/null.  The path must be composed of ASCII
// identifiers (just like $parse)
var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;

function isValidDottedPath(path) {
  return (path != null && path !== '' && path !== 'hasOwnProperty' &&
      MEMBER_NAME_REGEX.test('.' + path));
***REMOVED***

function lookupDottedPath(obj, path) {
  if (!isValidDottedPath(path)) {
    throw $resourceMinErr('badmember', 'Dotted member path "@{0***REMOVED***" is invalid.', path);
  ***REMOVED***
  var keys = path.split('.');
  for (var i = 0, ii = keys.length; i < ii && obj !== undefined; i++) {
    var key = keys[i];
    obj = (obj !== null) ? obj[key] : undefined;
  ***REMOVED***
  return obj;
***REMOVED***

/**
 * Create a shallow copy of an object and clear other fields from the destination
 */
function shallowClearAndCopy(src, dst) {
  dst = dst || {***REMOVED***;

  angular.forEach(dst, function(value, key) {
    delete dst[key];
  ***REMOVED***);

  for (var key in src) {
    if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
      dst[key] = src[key];
    ***REMOVED***
  ***REMOVED***

  return dst;
***REMOVED***

/**
 * @ngdoc module
 * @name ngResource
 * @description
 *
 * # ngResource
 *
 * The `ngResource` module provides interaction support with RESTful services
 * via the $resource service.
 *
 *
 * <div doc-module-components="ngResource"***REMOVED***</div***REMOVED***
 *
 * See {@link ngResource.$resource `$resource`***REMOVED*** for usage.
 */

/**
 * @ngdoc service
 * @name $resource
 * @requires $http
 *
 * @description
 * A factory which creates a resource object that lets you interact with
 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
 *
 * The returned resource object has action methods which provide high-level behaviors without
 * the need to interact with the low level {@link ng.$http $http***REMOVED*** service.
 *
 * Requires the {@link ngResource `ngResource`***REMOVED*** module to be installed.
 *
 * By default, trailing slashes will be stripped from the calculated URLs,
 * which can pose problems with server backends that do not expect that
 * behavior.  This can be disabled by configuring the `$resourceProvider` like
 * this:
 *
 * ***REMOVED***js
     app.config(['$resourceProvider', function($resourceProvider) {
       // Don't strip trailing slashes from calculated URLs
       $resourceProvider.defaults.stripTrailingSlashes = false;
     ***REMOVED***]);
 * ***REMOVED***
 *
 * @param {string***REMOVED*** url A parametrized URL template with parameters prefixed by `:` as in
 *   `/user/:username`. If you are using a URL with a port number (e.g.
 *   `http://example.com:8080/api`), it will be respected.
 *
 *   If you are using a url with a suffix, just add the suffix, like this:
 *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
 *   or even `$resource('http://example.com/resource/:resource_id.:format')`
 *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
 *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
 *   can escape it with `/\.`.
 *
 * @param {Object=***REMOVED*** paramDefaults Default values for `url` parameters. These can be overridden in
 *   `actions` methods. If any of the parameter value is a function, it will be executed every time
 *   when a param value needs to be obtained for a request (unless the param was overridden).
 *
 *   Each key value in the parameter object is first bound to url template if present and then any
 *   excess keys are appended to the url search query after the `?`.
 *
 *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'***REMOVED***` results in
 *   URL `/path/greet?salutation=Hello`.
 *
 *   If the parameter value is prefixed with `@` then the value for that parameter will be extracted
 *   from the corresponding property on the `data` object (provided when calling an action method).  For
 *   example, if the `defaultParam` object is `{someParam: '@someProp'***REMOVED***` then the value of `someParam`
 *   will be `data.someProp`.
 *
 * @param {Object.<Object***REMOVED***=***REMOVED*** actions Hash with declaration of custom actions that should extend
 *   the default set of resource actions. The declaration should be created in the format of {@link
 *   ng.$http#usage $http.config***REMOVED***:
 *
 *       {action1: {method:?, params:?, isArray:?, headers:?, ***REMOVED******REMOVED***,
 *        action2: {method:?, params:?, isArray:?, headers:?, ***REMOVED******REMOVED***,
 *        ***REMOVED******REMOVED***
 *
 *   Where:
 *
 *   - **`action`** – {string***REMOVED*** – The name of action. This name becomes the name of the method on
 *     your resource object.
 *   - **`method`** – {string***REMOVED*** – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
 *     `DELETE`, `JSONP`, etc).
 *   - **`params`** – {Object=***REMOVED*** – Optional set of pre-bound parameters for this action. If any of
 *     the parameter value is a function, it will be executed every time when a param value needs to
 *     be obtained for a request (unless the param was overridden).
 *   - **`url`** – {string***REMOVED*** – action specific `url` override. The url templating is supported just
 *     like for the resource-level urls.
 *   - **`isArray`** – {boolean=***REMOVED*** – If true then the returned object for this action is an array,
 *     see `returns` section.
 *   - **`transformRequest`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)***REMOVED******REMOVED***` –
 *     transform function or an array of such functions. The transform function takes the http
 *     request body and headers and returns its transformed (typically serialized) version.
 *     By default, transformRequest will contain one function that checks if the request data is
 *     an object and serializes to using `angular.toJson`. To prevent this behavior, set
 *     `transformRequest` to an empty array: `transformRequest: []`
 *   - **`transformResponse`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)***REMOVED******REMOVED***` –
 *     transform function or an array of such functions. The transform function takes the http
 *     response body and headers and returns its transformed (typically deserialized) version.
 *     By default, transformResponse will contain one function that checks if the response looks like
 *     a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior, set
 *     `transformResponse` to an empty array: `transformResponse: []`
 *   - **`cache`** – `{boolean|Cache***REMOVED***` – If true, a default $http cache will be used to cache the
 *     GET request, otherwise if a cache instance built with
 *     {@link ng.$cacheFactory $cacheFactory***REMOVED***, this cache will be used for
 *     caching.
 *   - **`timeout`** – `{number|Promise***REMOVED***` – timeout in milliseconds, or {@link ng.$q promise***REMOVED*** that
 *     should abort the request when resolved.
 *   - **`withCredentials`** - `{boolean***REMOVED***` - whether to set the `withCredentials` flag on the
 *     XHR object. See
 *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)
 *     for more information.
 *   - **`responseType`** - `{string***REMOVED***` - see
 *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
 *   - **`interceptor`** - `{Object=***REMOVED***` - The interceptor object has two optional methods -
 *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
 *     with `http response` object. See {@link ng.$http $http interceptors***REMOVED***.
 *
 * @param {Object***REMOVED*** options Hash with custom settings that should extend the
 *   default `$resourceProvider` behavior.  The only supported option is
 *
 *   Where:
 *
 *   - **`stripTrailingSlashes`** – {boolean***REMOVED*** – If true then the trailing
 *   slashes from any calculated URL will be stripped. (Defaults to true.)
 *
 * @returns {Object***REMOVED*** A resource "class" object with methods for the default set of resource actions
 *   optionally extended with custom `actions`. The default set contains these actions:
 * ***REMOVED***js
 *   { 'get':    {method:'GET'***REMOVED***,
 *     'save':   {method:'POST'***REMOVED***,
 *     'query':  {method:'GET', isArray:true***REMOVED***,
 *     'remove': {method:'DELETE'***REMOVED***,
 *     'delete': {method:'DELETE'***REMOVED*** ***REMOVED***;
 * ***REMOVED***
 *
 *   Calling these methods invoke an {@link ng.$http***REMOVED*** with the specified http method,
 *   destination and parameters. When the data is returned from the server then the object is an
 *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
 *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
 *   read, update, delete) on server-side data like this:
 * ***REMOVED***js
 *   var User = $resource('/user/:userId', {userId:'@id'***REMOVED***);
 *   var user = User.get({userId:123***REMOVED***, function() {
 *     user.abc = true;
 *     user.$save();
 *   ***REMOVED***);
 * ***REMOVED***
 *
 *   It is important to realize that invoking a $resource object method immediately returns an
 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
 *   server the existing reference is populated with the actual data. This is a useful trick since
 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
 *   object results in no rendering, once the data arrives from the server then the object is
 *   populated with the data and the view automatically re-renders itself showing the new data. This
 *   means that in most cases one never has to write a callback function for the action methods.
 *
 *   The action methods on the class object or instance object can be invoked with the following
 * ***REMOVED***
 *
 *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
 *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
 *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
 *
 *   Success callback is called with (value, responseHeaders) arguments. Error callback is called
 *   with (httpResponse) argument.
 *
 *   Class actions return empty instance (with additional properties below).
 *   Instance actions return promise of the action.
 *
 *   The Resource instances and collection have these additional properties:
 *
 *   - `$promise`: the {@link ng.$q promise***REMOVED*** of the original server interaction that created this
 *     instance or collection.
 *
 *     On success, the promise is resolved with the same resource instance or collection object,
 *     updated with data from server. This makes it easy to use in
 *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()***REMOVED*** to defer view
 *     rendering until the resource(s) are loaded.
 *
 *     On failure, the promise is resolved with the {@link ng.$http http response***REMOVED*** object, without
 *     the `resource` property.
 *
 *     If an interceptor object was provided, the promise will instead be resolved with the value
 *     returned by the interceptor.
 *
 *   - `$resolved`: `true` after first server interaction is completed (either with success or
 *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
 *      data-binding.
 *
 * @example
 *
 * # Credit card resource
 *
 * ***REMOVED***js
     // Define CreditCard class
     var CreditCard = $resource('/user/:userId/card/:cardId',
      {userId:123, cardId:'@id'***REMOVED***, {
       charge: {method:'POST', params:{charge:true***REMOVED******REMOVED***
***REMOVED***);

     // We can retrieve a collection from the server
     var cards = CreditCard.query(function() {
       // GET: /user/123/card
       // server returns: [ {id:456, number:'1234', name:'Smith'***REMOVED*** ];

       var card = cards[0];
       // each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);
       card.name = "J. Smith";
       // non GET methods are mapped onto the instances
       card.$save();
       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'***REMOVED***
       // server returns: {id:456, number:'1234', name: 'J. Smith'***REMOVED***;

       // our custom method is mapped as well.
       card.$charge({amount:9.99***REMOVED***);
       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'***REMOVED***
     ***REMOVED***);

     // we can create an instance as well
     var newCard = new CreditCard({number:'0123'***REMOVED***);
     newCard.name = "Mike Smith";
     newCard.$save();
     // POST: /user/123/card {number:'0123', name:'Mike Smith'***REMOVED***
     // server returns: {id:789, number:'0123', name: 'Mike Smith'***REMOVED***;
     expect(newCard.id).toEqual(789);
 * ***REMOVED***
 *
 * The object returned from this function execution is a resource "class" which has "static" method
 * for each action in the definition.
 *
 * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
 * `headers`.
 * When the data is returned from the server then the object is an instance of the resource type and
 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
 * operations (create, read, update, delete) on server-side data.

 ***REMOVED***js
     var User = $resource('/user/:userId', {userId:'@id'***REMOVED***);
     User.get({userId:123***REMOVED***, function(user) {
       user.abc = true;
       user.$save();
     ***REMOVED***);
 ***REMOVED***
 *
 * It's worth noting that the success callback for `get`, `query` and other methods gets passed
 * in the response that came from the server as well as $http header getter function, so one
 * could rewrite the above example and get access to http headers as:
 *
 ***REMOVED***js
     var User = $resource('/user/:userId', {userId:'@id'***REMOVED***);
     User.get({userId:123***REMOVED***, function(u, getResponseHeaders){
       u.abc = true;
       u.$save(function(u, putResponseHeaders) {
         //u =***REMOVED*** saved user object
         //putResponseHeaders =***REMOVED*** $http header getter
 ***REMOVED***);
     ***REMOVED***);
 ***REMOVED***
 *
 * You can also access the raw `$http` promise via the `$promise` property on the object returned
 *
 ***REMOVED***
     var User = $resource('/user/:userId', {userId:'@id'***REMOVED***);
     User.get({userId:123***REMOVED***)
         .$promise.then(function(user) {
           $scope.user = user;
   ***REMOVED***);
 ***REMOVED***

 * # Creating a custom 'PUT' request
 * In this example we create a custom method on our resource to make a PUT request
 * ***REMOVED***js
 *    var app = angular.module('app', ['ngResource', 'ngRoute']);
 *
 *    // Some APIs expect a PUT request in the format URL/object/ID
 *    // Here we are creating an 'update' method
 *    app.factory('Notes', ['$resource', function($resource) {
 *    return $resource('/notes/:id', null,
 *        {
 *            'update': { method:'PUT' ***REMOVED***
 *  ***REMOVED***);
 *    ***REMOVED***]);
 *
 *    // In our controller we get the ID from the URL using ngRoute and $routeParams
 *    // We pass in $routeParams and our Notes factory along with $scope
 *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
                                      function($scope, $routeParams, Notes) {
 *    // First get a note object from the factory
 *    var note = Notes.get({ id:$routeParams.id ***REMOVED***);
 *    $id = note.id;
 *
 *    // Now call update passing in the ID first then the object you are updating
 *    Notes.update({ id:$id ***REMOVED***, note);
 *
 *    // This will PUT /notes/ID with the note object in the request payload
 *    ***REMOVED***]);
 * ***REMOVED***
 */
angular.module('ngResource', ['ng']).
  provider('$resource', function() {
    var provider = this;

    this.defaults = {
      // Strip slashes by default
      stripTrailingSlashes: true,

      // Default actions configuration
      actions: {
        'get': {method: 'GET'***REMOVED***,
        'save': {method: 'POST'***REMOVED***,
        'query': {method: 'GET', isArray: true***REMOVED***,
        'remove': {method: 'DELETE'***REMOVED***,
        'delete': {method: 'DELETE'***REMOVED***
***REMOVED***
    ***REMOVED***;

    this.$get = ['$http', '$q', function($http, $q) {

      var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction;

      /**
       * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
       * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
       * (pchar) allowed in path segments:
       *    segment       = *pchar
       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
       *    pct-encoded   = "%" HEXDIG HEXDIG
       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
       *                     / "*" / "+" / "," / ";" / "="
       */
      function encodeUriSegment(val) {
        return encodeUriQuery(val, true).
          replace(/%26/gi, '&').
          replace(/%3D/gi, '=').
          replace(/%2B/gi, '+');
***REMOVED***


      /**
       * This method is intended for encoding *key* or *value* parts of query component. We need a
       * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
       * have to be encoded per http://tools.ietf.org/html/rfc3986:
       *    query       = *( pchar / "/" / "?" )
       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
       *    pct-encoded   = "%" HEXDIG HEXDIG
       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
       *                     / "*" / "+" / "," / ";" / "="
       */
      function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).
          replace(/%40/gi, '@').
          replace(/%3A/gi, ':').
          replace(/%24/g, '$').
          replace(/%2C/gi, ',').
          replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
***REMOVED***

      function Route(template, defaults) {
        this.template = template;
        this.defaults = extend({***REMOVED***, provider.defaults, defaults);
        this.urlParams = {***REMOVED***;
***REMOVED***

      Route.prototype = {
        setUrlParams: function(config, params, actionUrl) {
          var self = this,
            url = actionUrl || self.template,
            val,
            encodedVal;

          var urlParams = self.urlParams = {***REMOVED***;
          forEach(url.split(/\W/), function(param) {
            if (param === 'hasOwnProperty') {
              throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
      ***REMOVED***
            if (!(new RegExp("^\\d+$").test(param)) && param &&
              (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
              urlParams[param] = true;
      ***REMOVED***
    ***REMOVED***);
          url = url.replace(/\\:/g, ':');

          params = params || {***REMOVED***;
          forEach(self.urlParams, function(_, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
            if (angular.isDefined(val) && val !== null) {
              encodedVal = encodeUriSegment(val);
              url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                return encodedVal + p1;
        ***REMOVED***);
      ***REMOVED*** else {
              url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
                  leadingSlashes, tail) {
                if (tail.charAt(0) == '/') {
                  return tail;
          ***REMOVED*** else {
                  return leadingSlashes + tail;
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);

          // strip trailing slashes and set the url (unless this behavior is specifically disabled)
          if (self.defaults.stripTrailingSlashes) {
            url = url.replace(/\/+$/, '') || '/';
    ***REMOVED***

          // then replace collapse `/.` if found in the last URL path segment before the query
          // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
          url = url.replace(/\/\.(?=\w+($|\?))/, '.');
          // replace escaped `/\.` with `/.`
          config.url = url.replace(/\/\\\./, '/.');


          // set params - delegate param encoding to $http
          forEach(params, function(value, key) {
            if (!self.urlParams[key]) {
              config.params = config.params || {***REMOVED***;
              config.params[key] = value;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;


      function resourceFactory(url, paramDefaults, actions, options) {
        var route = new Route(url, options);

        actions = extend({***REMOVED***, provider.defaults.actions, actions);

        function extractParams(data, actionParams) {
          var ids = {***REMOVED***;
          actionParams = extend({***REMOVED***, paramDefaults, actionParams);
          forEach(actionParams, function(value, key) {
            if (isFunction(value)) { value = value(); ***REMOVED***
            ids[key] = value && value.charAt && value.charAt(0) == '@' ?
              lookupDottedPath(data, value.substr(1)) : value;
    ***REMOVED***);
          return ids;
  ***REMOVED***

        function defaultResponseInterceptor(response) {
          return response.resource;
  ***REMOVED***

        function Resource(value) {
          shallowClearAndCopy(value || {***REMOVED***, this);
  ***REMOVED***

        Resource.prototype.toJSON = function() {
          var data = extend({***REMOVED***, this);
          delete data.$promise;
          delete data.$resolved;
          return data;
  ***REMOVED***;

        forEach(actions, function(action, name) {
          var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

          Resource[name] = function(a1, a2, a3, a4) {
            var params = {***REMOVED***, data, success, error;

            /* jshint -W086 */ /* (purposefully fall through case statements) */
            switch (arguments.length) {
              case 4:
                error = a4;
                success = a3;
              //fallthrough
              case 3:
              case 2:
                if (isFunction(a2)) {
                  if (isFunction(a1)) {
                    success = a1;
                    error = a2;
                    break;
            ***REMOVED***

                  success = a2;
                  error = a3;
                  //fallthrough
          ***REMOVED*** else {
                  params = a1;
                  data = a2;
                  success = a3;
                  break;
          ***REMOVED***
              case 1:
                if (isFunction(a1)) success = a1;
                else if (hasBody) data = a1;
                else params = a1;
                break;
              case 0: break;
              default:
                throw $resourceMinErr('badargs',
                  "Expected up to 4 arguments [params, data, success, error], got {0***REMOVED*** arguments",
                  arguments.length);
      ***REMOVED***
            /* jshint +W086 */ /* (purposefully fall through case statements) */

            var isInstanceCall = this instanceof Resource;
            var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
            var httpConfig = {***REMOVED***;
            var responseInterceptor = action.interceptor && action.interceptor.response ||
              defaultResponseInterceptor;
            var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
              undefined;

            forEach(action, function(value, key) {
              if (key != 'params' && key != 'isArray' && key != 'interceptor') {
                httpConfig[key] = copy(value);
        ***REMOVED***
      ***REMOVED***);

            if (hasBody) httpConfig.data = data;
            route.setUrlParams(httpConfig,
              extend({***REMOVED***, extractParams(data, action.params || {***REMOVED***), params),
              action.url);

            var promise = $http(httpConfig).then(function(response) {
              var data = response.data,
                promise = value.$promise;

              if (data) {
                // Need to convert action.isArray to boolean in case it is undefined
                // jshint -W018
                if (angular.isArray(data) !== (!!action.isArray)) {
                  throw $resourceMinErr('badcfg',
                      'Error in resource configuration for action `{0***REMOVED***`. Expected response to ' +
                      'contain an {1***REMOVED*** but got an {2***REMOVED***', name, action.isArray ? 'array' : 'object',
                    angular.isArray(data) ? 'array' : 'object');
          ***REMOVED***
                // jshint +W018
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function(item) {
                    if (typeof item === "object") {
                      value.push(new Resource(item));
              ***REMOVED*** else {
                      // Valid JSON values may be string literals, and these should not be converted
                      // into objects. These items will not have access to the Resource prototype
                      // methods, but unfortunately there
                      value.push(item);
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED*** else {
                  shallowClearAndCopy(data, value);
                  value.$promise = promise;
          ***REMOVED***
        ***REMOVED***

              value.$resolved = true;

              response.resource = value;

              return response;
      ***REMOVED***, function(response) {
              value.$resolved = true;

              (error || noop)(response);

              return $q.reject(response);
      ***REMOVED***);

            promise = promise.then(
              function(response) {
                var value = responseInterceptor(response);
                (success || noop)(value, response.headers);
                return value;
        ***REMOVED***,
              responseErrorInterceptor);

            if (!isInstanceCall) {
              // we are creating instance / collection
              // - set the initial promise
              // - return the instance / collection
              value.$promise = promise;
              value.$resolved = false;

              return value;
      ***REMOVED***

            // instance call
            return promise;
    ***REMOVED***;


          Resource.prototype['$' + name] = function(params, success, error) {
            if (isFunction(params)) {
              error = success; success = params; params = {***REMOVED***;
      ***REMOVED***
            var result = Resource[name].call(this, params, this, success, error);
            return result.$promise || result;
    ***REMOVED***;
  ***REMOVED***);

        Resource.bind = function(additionalParamDefaults) {
          return resourceFactory(url, extend({***REMOVED***, paramDefaults, additionalParamDefaults), actions);
  ***REMOVED***;

        return Resource;
***REMOVED***

      return resourceFactory;
    ***REMOVED***];
  ***REMOVED***);


***REMOVED***)(window, window.angular);
