/**
 * @license AngularJS v1.3.11
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route***REMOVED*** for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"***REMOVED***</div***REMOVED***
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider),
    $routeMinErr = angular.$$minErr('ngRoute');

/**
 * @ngdoc provider
 * @name $routeProvider
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route***REMOVED*** for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the {@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 */
function $RouteProvider() {
  function inherit(parent, extra) {
    return angular.extend(Object.create(parent), extra);
  ***REMOVED***

  var routes = {***REMOVED***;

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param {string***REMOVED*** path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param {Object***REMOVED*** route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `{(string|function()=***REMOVED***` – Controller fn that should be associated with
   *      newly created scope or the name of a {@link angular.Module#controller registered
   *      controller***REMOVED*** if passed as a string.
   *    - `controllerAs` – `{string=***REMOVED***` – A controller alias name. If present the controller will be
   *      published to scope under the `controllerAs` name.
   *    - `template` – `{string=|function()=***REMOVED***` – html template as a string or a function that
   *      returns an html template as a string which should be used by {@link
   *      ngRoute.directive:ngView ngView***REMOVED*** or {@link ng.directive:ngInclude ngInclude***REMOVED*** directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object***REMOVED******REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `{string=|function()=***REMOVED***` – path or function that returns a path to an html
   *      template that should be used by {@link ngRoute.directive:ngView ngView***REMOVED***.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object***REMOVED******REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `{Object.<string, function***REMOVED***=***REMOVED***` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess***REMOVED*** event is
   *      fired. If any of the promises are rejected the
   *      {@link ngRoute.$route#$routeChangeError $routeChangeError***REMOVED*** event is fired. The map object
   *      is:
   *
   *      - `key` – `{string***REMOVED***`: a name of a dependency to be injected into the controller.
   *      - `factory` - `{string|function***REMOVED***`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is {@link auto.$injector#invoke injected***REMOVED***
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `redirectTo` – {(string|function())=***REMOVED*** – value to update
   *      {@link ng.$location $location***REMOVED*** path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `{Object.<string***REMOVED******REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `{string***REMOVED***` - current `$location.path()`
   *      - `{Object***REMOVED***` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - {boolean=***REMOVED*** - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - {boolean=***REMOVED*** - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns {Object***REMOVED*** self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) {
    //copy original route object to preserve params inherited from proto chain
    var routeCopy = angular.copy(route);
    if (angular.isUndefined(routeCopy.reloadOnSearch)) {
      routeCopy.reloadOnSearch = true;
    ***REMOVED***
    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
    ***REMOVED***
    routes[path] = angular.extend(
      routeCopy,
      path && pathRegExp(path, routeCopy)
    );

    // create redirection for trailing slashes
    if (path) {
      var redirectPath = (path[path.length - 1] == '/')
            ? path.substr(0, path.length - 1)
            : path + '/';

      routes[redirectPath] = angular.extend(
        {redirectTo: path***REMOVED***,
        pathRegExp(redirectPath, routeCopy)
      );
    ***REMOVED***

    return this;
  ***REMOVED***;

  /**
   * @ngdoc property
   * @name $routeProvider#caseInsensitiveMatch
   * @description
   *
   * A boolean property indicating if routes defined
   * using this provider should be matched using a case insensitive
   * algorithm. Defaults to `false`.
   */
  this.caseInsensitiveMatch = false;

   /**
    * @param path {string***REMOVED*** path
    * @param opts {Object***REMOVED*** options
    * @return {?Object***REMOVED***
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) {
    var insensitive = opts.caseInsensitiveMatch,
        ret = {
          originalPath: path,
          regexp: path
  ***REMOVED***,
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional ***REMOVED***);
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
***REMOVED***)
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  ***REMOVED***

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param {Object|string***REMOVED*** params Mapping information to be assigned to `$route.current`.
   * If called with a string, the value maps to `redirectTo`.
   * @returns {Object***REMOVED*** self
   */
  this.otherwise = function(params) {
    if (typeof params === 'string') {
      params = {redirectTo: params***REMOVED***;
    ***REMOVED***
    this.when(null, params);
    return this;
  ***REMOVED***;


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$templateRequest',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property {Object***REMOVED*** current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as define in route definition.
     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller***REMOVED*** service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     * @property {Object***REMOVED*** routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the {@link ngRoute `ngRoute`***REMOVED*** module to be installed.
     *
     * You can define routes through {@link ngRoute.$routeProvider $routeProvider***REMOVED***'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * {@link ngRoute.directive:ngView `ngView`***REMOVED*** directive and the
     * {@link ngRoute.$routeParams `$routeParams`***REMOVED*** service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true"***REMOVED***
     *   <file name="index.html"***REMOVED***
     *     <div ng-controller="MainController"***REMOVED***
     *       Choose:
     *       <a href="Book/Moby"***REMOVED***Moby</a***REMOVED*** |
     *       <a href="Book/Moby/ch/1"***REMOVED***Moby: Ch1</a***REMOVED*** |
     *       <a href="Book/Gatsby"***REMOVED***Gatsby</a***REMOVED*** |
     *       <a href="Book/Gatsby/ch/4?key=value"***REMOVED***Gatsby: Ch4</a***REMOVED*** |
     *       <a href="Book/Scarlet"***REMOVED***Scarlet Letter</a***REMOVED***<br/***REMOVED***
     *
     *       <div ng-view***REMOVED***</div***REMOVED***
     *
     *       <hr /***REMOVED***
     *
     *       <pre***REMOVED***$location.path() = {{$location.path()***REMOVED******REMOVED***</pre***REMOVED***
     *       <pre***REMOVED***$route.current.templateUrl = {{$route.current.templateUrl***REMOVED******REMOVED***</pre***REMOVED***
     *       <pre***REMOVED***$route.current.params = {{$route.current.params***REMOVED******REMOVED***</pre***REMOVED***
     *       <pre***REMOVED***$route.current.scope.name = {{$route.current.scope.name***REMOVED******REMOVED***</pre***REMOVED***
     *       <pre***REMOVED***$routeParams = {{$routeParams***REMOVED******REMOVED***</pre***REMOVED***
     *     </div***REMOVED***
     *   </file***REMOVED***
     *
     *   <file name="book.html"***REMOVED***
     *     controller: {{name***REMOVED******REMOVED***<br /***REMOVED***
     *     Book Id: {{params.bookId***REMOVED******REMOVED***<br /***REMOVED***
     *   </file***REMOVED***
     *
     *   <file name="chapter.html"***REMOVED***
     *     controller: {{name***REMOVED******REMOVED***<br /***REMOVED***
     *     Book Id: {{params.bookId***REMOVED******REMOVED***<br /***REMOVED***
     *     Chapter Id: {{params.chapterId***REMOVED******REMOVED***
     *   </file***REMOVED***
     *
     *   <file name="script.js"***REMOVED***
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) {
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     ****REMOVED***)
     *
     *      .controller('BookController', function($scope, $routeParams) {
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     ****REMOVED***)
     *
     *      .controller('ChapterController', function($scope, $routeParams) {
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     ****REMOVED***)
     *
     *     .config(function($routeProvider, $locationProvider) {
     *       $routeProvider
     *        .when('/Book/:bookId', {
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: {
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) {
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *     ***REMOVED***
     *   ***REMOVED***
     * ***REMOVED***)
     *       .when('/Book/:bookId/ch/:chapterId', {
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     * ***REMOVED***);
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     ***REMOVED***);
     *
     *   </file***REMOVED***
     *
     *   <file name="protractor.js" type="protractor"***REMOVED***
     *     it('should load and compile correct template', function() {
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     ***REMOVED***);
     *   </file***REMOVED***
     * </example***REMOVED***
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * The route change (and the `$location` change that triggered it) can be prevented
     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on***REMOVED***
     * for more details about event object.
     *
     * @param {Object***REMOVED*** angularEvent Synthetic event object.
     * @param {Route***REMOVED*** next Future route information.
     * @param {Route***REMOVED*** current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route dependencies are resolved.
     * {@link ngRoute.directive:ngView ngView***REMOVED*** listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param {Object***REMOVED*** angularEvent Synthetic event object.
     * @param {Route***REMOVED*** current Current route information.
     * @param {Route|Undefined***REMOVED*** previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param {Object***REMOVED*** angularEvent Synthetic event object
     * @param {Route***REMOVED*** current Current route information.
     * @param {Route***REMOVED*** previous Previous route information.
     * @param {Route***REMOVED*** rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     *
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     */

    var forceReload = false,
        preparedRoute,
        preparedRouteIsUpdateOnly,
        $route = {
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * {@link ng.$location $location***REMOVED*** hasn't changed.
           *
           * As a result of that, {@link ngRoute.directive:ngView ngView***REMOVED***
           * creates new scope and reinstantiates the controller.
           */
    ***REMOVED*** function() {
            forceReload = true;
            $rootScope.$evalAsync(function() {
              // Don't support cancellation of a reload for now***REMOVED***
              prepareRoute();
              commitRoute();
      ***REMOVED***);
    ***REMOVED***,

          /**
           * @ngdoc method
           * @name $route#updateParams
           *
           * @description
           * Causes `$route` service to update the current URL, replacing
           * current route parameters with those specified in `newParams`.
           * Provided property names that match the route's path segment
           * definitions will be interpolated into the location's path, while
           * remaining properties will be treated as query params.
           *
           * @param {Object***REMOVED*** newParams mapping of URL parameter names to values
           */
          updateParams: function(newParams) {
            if (this.current && this.current.$$route) {
              var searchParams = {***REMOVED***, self=this;

              angular.forEach(Object.keys(newParams), function(key) {
                if (!self.current.pathParams[key]) searchParams[key] = newParams[key];
        ***REMOVED***);

              newParams = angular.extend({***REMOVED***, this.current.params, newParams);
              $location.path(interpolate(this.current.$$route.originalPath, newParams));
              $location.search(angular.extend({***REMOVED***, $location.search(), searchParams));
      ***REMOVED***
            else {
              throw $routeMinErr('norout', 'Tried updating route when with no current route');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

    $rootScope.$on('$locationChangeStart', prepareRoute);
    $rootScope.$on('$locationChangeSuccess', commitRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on {string***REMOVED*** current url
     * @param route {Object***REMOVED*** route regexp to match the url against
     * @return {?Object***REMOVED***
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) {
      var keys = route.keys,
          params = {***REMOVED***;

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = m[i];

        if (key && val) {
          params[key.name] = val;
  ***REMOVED***
***REMOVED***
      return params;
    ***REMOVED***

    function prepareRoute($locationEvent) {
      var lastRoute = $route.current;

      preparedRoute = parseRoute();
      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route
          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)
          && !preparedRoute.reloadOnSearch && !forceReload;

      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
          if ($locationEvent) {
            $locationEvent.preventDefault();
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    ***REMOVED***

    function commitRoute() {
      var lastRoute = $route.current;
      var nextRoute = preparedRoute;

      if (preparedRouteIsUpdateOnly) {
        lastRoute.params = nextRoute.params;
        angular.copy(lastRoute.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', lastRoute);
***REMOVED*** else if (nextRoute || lastRoute) {
        forceReload = false;
        $route.current = nextRoute;
        if (nextRoute) {
          if (nextRoute.redirectTo) {
            if (angular.isString(nextRoute.redirectTo)) {
              $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params)
                       .replace();
      ***REMOVED*** else {
              $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search()))
                       .replace();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

        $q.when(nextRoute).
          then(function() {
            if (nextRoute) {
              var locals = angular.extend({***REMOVED***, nextRoute.resolve),
                  template, templateUrl;

              angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ?
                    $injector.get(value) : $injector.invoke(value, null, null, key);
        ***REMOVED***);

              if (angular.isDefined(template = nextRoute.template)) {
                if (angular.isFunction(template)) {
                  template = template(nextRoute.params);
          ***REMOVED***
        ***REMOVED*** else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(nextRoute.params);
          ***REMOVED***
                templateUrl = $sce.getTrustedResourceUrl(templateUrl);
                if (angular.isDefined(templateUrl)) {
                  nextRoute.loadedTemplateUrl = templateUrl;
                  template = $templateRequest(templateUrl);
          ***REMOVED***
        ***REMOVED***
              if (angular.isDefined(template)) {
                locals['$template'] = template;
        ***REMOVED***
              return $q.all(locals);
      ***REMOVED***
    ***REMOVED***).
          // after route change
          then(function(locals) {
            if (nextRoute == $route.current) {
              if (nextRoute) {
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
        ***REMOVED***
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
      ***REMOVED***
    ***REMOVED***, function(error) {
            if (nextRoute == $route.current) {
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
      ***REMOVED***
    ***REMOVED***);
***REMOVED***
    ***REMOVED***


    /**
     * @returns {Object***REMOVED*** the current active route, by matching it against the URL
     */
    function parseRoute() {
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) {
        if (!match && (params = switchRouteMatcher($location.path(), route))) {
          match = inherit(route, {
            params: angular.extend({***REMOVED***, $location.search(), params),
            pathParams: params***REMOVED***);
          match.$$route = route;
  ***REMOVED***
***REMOVED***);
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], {params: {***REMOVED***, pathParams:{***REMOVED******REMOVED***);
    ***REMOVED***

    /**
     * @returns {string***REMOVED*** interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) {
      var result = [];
      angular.forEach((string || '').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
  ***REMOVED*** else {
          var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
  ***REMOVED***
***REMOVED***);
      return result.join('');
    ***REMOVED***
  ***REMOVED***];
***REMOVED***

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the {@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 *
 * The route parameters are a combination of {@link ng.$location `$location`***REMOVED***'s
 * {@link ng.$location#search `search()`***REMOVED*** and {@link ng.$location#path `path()`***REMOVED***.
 * The `path` parameters are extracted when the {@link ngRoute.$route `$route`***REMOVED*** path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ***REMOVED***js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==***REMOVED*** {chapterId:'1', sectionId:'2', search:'moby'***REMOVED***
 * ***REMOVED***
 */
function $RouteParamsProvider() {
  this.$get = function() { return {***REMOVED***; ***REMOVED***;
***REMOVED***

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the {@link ngRoute.$route $route***REMOVED*** service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the {@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 *
 * @animations
 * enter - animation is used to bring new content into the browser.
 * leave - animation is used to animate existing content away.
 *
 * The enter and leave animation occur concurrently.
 *
 * @scope
 * @priority 400
 * @param {string=***REMOVED*** onload Expression to evaluate whenever the view updates.
 *
 * @param {string=***REMOVED*** autoscroll Whether `ngView` should call {@link ng.$anchorScroll
 *                  $anchorScroll***REMOVED*** to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true"***REMOVED***
      <file name="index.html"***REMOVED***
        <div ng-controller="MainCtrl as main"***REMOVED***
          Choose:
          <a href="Book/Moby"***REMOVED***Moby</a***REMOVED*** |
          <a href="Book/Moby/ch/1"***REMOVED***Moby: Ch1</a***REMOVED*** |
          <a href="Book/Gatsby"***REMOVED***Gatsby</a***REMOVED*** |
          <a href="Book/Gatsby/ch/4?key=value"***REMOVED***Gatsby: Ch4</a***REMOVED*** |
          <a href="Book/Scarlet"***REMOVED***Scarlet Letter</a***REMOVED***<br/***REMOVED***

          <div class="view-animate-container"***REMOVED***
            <div ng-view class="view-animate"***REMOVED***</div***REMOVED***
          </div***REMOVED***
          <hr /***REMOVED***

          <pre***REMOVED***$location.path() = {{main.$location.path()***REMOVED******REMOVED***</pre***REMOVED***
          <pre***REMOVED***$route.current.templateUrl = {{main.$route.current.templateUrl***REMOVED******REMOVED***</pre***REMOVED***
          <pre***REMOVED***$route.current.params = {{main.$route.current.params***REMOVED******REMOVED***</pre***REMOVED***
          <pre***REMOVED***$routeParams = {{main.$routeParams***REMOVED******REMOVED***</pre***REMOVED***
        </div***REMOVED***
      </file***REMOVED***

      <file name="book.html"***REMOVED***
        <div***REMOVED***
          controller: {{book.name***REMOVED******REMOVED***<br /***REMOVED***
          Book Id: {{book.params.bookId***REMOVED******REMOVED***<br /***REMOVED***
        </div***REMOVED***
      </file***REMOVED***

      <file name="chapter.html"***REMOVED***
        <div***REMOVED***
          controller: {{chapter.name***REMOVED******REMOVED***<br /***REMOVED***
          Book Id: {{chapter.params.bookId***REMOVED******REMOVED***<br /***REMOVED***
          Chapter Id: {{chapter.params.chapterId***REMOVED******REMOVED***
        </div***REMOVED***
      </file***REMOVED***

      <file name="animations.css"***REMOVED***
        .view-animate-container {
          position:relative;
          height:100px!important;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
  ***REMOVED***

        .view-animate {
          padding:10px;
  ***REMOVED***

        .view-animate.ng-enter, .view-animate.ng-leave {
          -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
  ***REMOVED***

        .view-animate.ng-enter {
          left:100%;
  ***REMOVED***
        .view-animate.ng-enter.ng-enter-active {
          left:0;
  ***REMOVED***
        .view-animate.ng-leave.ng-leave-active {
          left:-100%;
  ***REMOVED***
      </file***REMOVED***

      <file name="script.js"***REMOVED***
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
              $routeProvider
                .when('/Book/:bookId', {
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
          ***REMOVED***)
                .when('/Book/:bookId/ch/:chapterId', {
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
          ***REMOVED***);

              $locationProvider.html5Mode(true);
    ***REMOVED***])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
    ***REMOVED***])
          .controller('BookCtrl', ['$routeParams', function($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
    ***REMOVED***])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
    ***REMOVED***]);

      </file***REMOVED***

      <file name="protractor.js" type="protractor"***REMOVED***
        it('should load and compile correct template', function() {
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
  ***REMOVED***);
      </file***REMOVED***
    </example***REMOVED***
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory($route, $anchorScroll, $animate) {
  return {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if (previousLeaveAnimation) {
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
    ***REMOVED***

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
    ***REMOVED***
          if (currentElement) {
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function() {
              previousLeaveAnimation = null;
      ***REMOVED***);
            currentElement = null;
    ***REMOVED***
  ***REMOVED***

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ***REMOVED*** they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense***REMOVED***
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) {
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
          ***REMOVED***
        ***REMOVED***);
              cleanupLastView();
      ***REMOVED***);

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
    ***REMOVED*** else {
            cleanupLastView();
    ***REMOVED***
  ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) {
  return {
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) {
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) {
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) {
          scope[current.controllerAs] = controller;
  ***REMOVED***
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
***REMOVED***

      link(scope);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***


***REMOVED***)(window, window.angular);
