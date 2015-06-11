/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {

  var root, states = {***REMOVED***, $state, queue = {***REMOVED***, abstractKey = 'abstract';

  // Builds state properties from definition passed to registerState()
  var stateBuilder = {

    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
    // state.children = [];
    // if (parent) parent.children.push(state);
    parent: function(state) {
      if (isDefined(state.parent) && state.parent) return findState(state.parent);
      // regex matches any valid composite state name
      // would match "contact.list" but not "contacts"
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
      return compositeName ? findState(compositeName[1]) : root;
    ***REMOVED***,

    // inherit 'data' from parent and override by own values (if any)
    data: function(state) {
      if (state.parent && state.parent.data) {
        state.data = state.self.data = extend({***REMOVED***, state.parent.data, state.data);
***REMOVED***
      return state.data;
    ***REMOVED***,

    // Build a URLMatcher if necessary, either via a relative or absolute URL
    url: function(state) {
      var url = state.url, config = { params: state.params || {***REMOVED*** ***REMOVED***;

      if (isString(url)) {
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
        return (state.parent.navigable || root).url.concat(url, config);
***REMOVED***

      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
    ***REMOVED***,

    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
    navigable: function(state) {
      return state.url ? state : (state.parent ? state.parent.navigable : null);
    ***REMOVED***,

    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
    ownParams: function(state) {
      var params = state.url && state.url.params || new $$UMFP.ParamSet();
      forEach(state.params || {***REMOVED***, function(config, id) {
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
***REMOVED***);
      return params;
    ***REMOVED***,

    // Derive parameters for this state and ensure they're a super-set of parent's parameters
    params: function(state) {
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), state.ownParams) : new $$UMFP.ParamSet();
    ***REMOVED***,

    // If there is no explicit multi-view configuration, make one up so we don't have
    // to handle both cases in the view directive later. Note that having an explicit
    // 'views' property will mean the default unnamed view properties are ignored. This
    // is also a good time to resolve view names to absolute names, so everything is a
    // straight lookup at link time.
    views: function(state) {
      var views = {***REMOVED***;

      forEach(isDefined(state.views) ? state.views : { '': state ***REMOVED***, function (view, name) {
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
        views[name] = view;
***REMOVED***);
      return views;
    ***REMOVED***,

    // Keep a full path from the root down to this state as this is needed for state activation.
    path: function(state) {
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
    ***REMOVED***,

    // Speed up $state.contains() as it's used a lot
    includes: function(state) {
      var includes = state.parent ? extend({***REMOVED***, state.parent.includes) : {***REMOVED***;
      includes[state.name] = true;
      return includes;
    ***REMOVED***,

    $delegates: {***REMOVED***
  ***REMOVED***;

  function isRelative(stateName) {
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
  ***REMOVED***

  function findState(stateOrName, base) {
    if (!stateOrName) return undefined;

    var isStr = isString(stateOrName),
        name  = isStr ? stateOrName : stateOrName.name,
        path  = isRelative(name);

    if (path) {
      if (!base) throw new Error("No reference point given for path '"  + name + "'");
      base = findState(base);
      
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

      for (; i < pathLength; i++) {
        if (rel[i] === "" && i === 0) {
          current = base;
          continue;
  ***REMOVED***
        if (rel[i] === "^") {
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
          current = current.parent;
          continue;
  ***REMOVED***
        break;
***REMOVED***
      rel = rel.slice(i).join(".");
      name = current.name + (current.name && rel ? "." : "") + rel;
    ***REMOVED***
    var state = states[name];

    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
      return state;
    ***REMOVED***
    return undefined;
  ***REMOVED***

  function queueState(parentName, state) {
    if (!queue[parentName]) {
      queue[parentName] = [];
    ***REMOVED***
    queue[parentName].push(state);
  ***REMOVED***

  function flushQueuedChildren(parentName) {
    var queued = queue[parentName] || [];
    while(queued.length) {
      registerState(queued.shift());
    ***REMOVED***
  ***REMOVED***

  function registerState(state) {
    // Wrap a new object around the state so we can store our private details easily.
    state = inherit(state, {
      self: state,
      resolve: state.resolve || {***REMOVED***,
      toString: function() { return this.name; ***REMOVED***
    ***REMOVED***);

    var name = state.name;
    if (!isString(name) || name.indexOf('@') ***REMOVED***= 0) throw new Error("State must have a valid name");
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");

    // Get parent name
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
        : (isString(state.parent)) ? state.parent
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
        : '';

    // If parent is not registered yet, add state to queue and register later
    if (parentName && !states[parentName]) {
      return queueState(parentName, state.self);
    ***REMOVED***

    for (var key in stateBuilder) {
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
    ***REMOVED***
    states[name] = state;

    // Register the state in the global state list and with $urlRouter if necessary.
    if (!state[abstractKey] && state.url) {
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
          $state.transitionTo(state, $match, { inherit: true, location: false ***REMOVED***);
  ***REMOVED***
***REMOVED***]);
    ***REMOVED***

    // Register any queued children
    flushQueuedChildren(name);

    return state;
  ***REMOVED***

  // Checks text to see if it looks like a glob.
  function isGlob (text) {
    return text.indexOf('*') ***REMOVED*** -1;
  ***REMOVED***

  // Returns true if glob matches current $state name.
  function doesStateMatchGlob (glob) {
    var globSegments = glob.split('.'),
        segments = $state.$current.name.split('.');

    //match greedy starts
    if (globSegments[0] === '**') {
       segments = segments.slice(indexOf(segments, globSegments[1]));
       segments.unshift('**');
    ***REMOVED***
    //match greedy ends
    if (globSegments[globSegments.length - 1] === '**') {
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
       segments.push('**');
    ***REMOVED***

    if (globSegments.length != segments.length) {
      return false;
    ***REMOVED***

    //match single stars
    for (var i = 0, l = globSegments.length; i < l; i++) {
      if (globSegments[i] === '*') {
        segments[i] = '*';
***REMOVED***
    ***REMOVED***

    return segments.join('') === globSegments.join('');
  ***REMOVED***


  // Implicit root state that is always active
  root = registerState({
    name: '',
    url: '^',
    views: null,
    'abstract': true
  ***REMOVED***);
  root.navigable = null;


  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object***REMOVED***` - returns the parent state object.
   * - **data** `{object***REMOVED***` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object***REMOVED***` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher***REMOVED***
   *   or `null`.
   * - **navigable** `{object***REMOVED***` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object***REMOVED***` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object***REMOVED***` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object***REMOVED***` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string***REMOVED***` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object***REMOVED***` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre***REMOVED***
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {***REMOVED***,
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   ***REMOVED***);
   *   return result;
   * ***REMOVED***);
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' ***REMOVED***,
   *     'contact.item': { controller: 'ItemController' ***REMOVED***
   *   ***REMOVED***
   * ***REMOVED***);
   *
   * // ***REMOVED***
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre***REMOVED***
   *
   * @param {string***REMOVED*** name The name of the builder function to decorate. 
   * @param {object***REMOVED*** func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object***REMOVED***` - state - The state config object.
   *   - `{object***REMOVED***` - super - The original builder function.
   *
   * @return {object***REMOVED*** $stateProvider - $stateProvider instance
   */
  this.decorator = decorator;
  function decorator(name, func) {
    /*jshint validthis: true */
    if (isString(name) && !isDefined(func)) {
      return stateBuilder[name];
    ***REMOVED***
    if (!isFunction(func) || !isString(name)) {
      return this;
    ***REMOVED***
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
      stateBuilder.$delegates[name] = stateBuilder[name];
    ***REMOVED***
    stateBuilder[name] = func;
    return this;
  ***REMOVED***

  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string***REMOVED*** name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object***REMOVED*** stateConfig State configuration object.
   * @param {string|function=***REMOVED*** stateConfig.template
   * <a id='template'***REMOVED***</a***REMOVED***
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;***REMOVED*** - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre***REMOVED***template:
   *   "<h1***REMOVED***inline template definition</h1***REMOVED***" +
   *   "<div ui-view***REMOVED***</div***REMOVED***"</pre***REMOVED***
   * <pre***REMOVED***template: function(params) {
   *       return "<h1***REMOVED***generated template</h1***REMOVED***"; ***REMOVED***</pre***REMOVED***
   * </div***REMOVED***
   *
   * @param {string|function=***REMOVED*** stateConfig.templateUrl
   * <a id='templateUrl'***REMOVED***</a***REMOVED***
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;***REMOVED*** - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre***REMOVED***templateUrl: "home.html"</pre***REMOVED***
   * <pre***REMOVED***templateUrl: function(params) {
   *     return myTemplates[params.pageId]; ***REMOVED***</pre***REMOVED***
   *
   * @param {function=***REMOVED*** stateConfig.templateProvider
   * <a id='templateProvider'***REMOVED***</a***REMOVED***
   *    Provider function that returns HTML content string.
   * <pre***REMOVED*** templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   * ***REMOVED***</pre***REMOVED***
   *
   * @param {string|function=***REMOVED*** stateConfig.controller
   * <a id='controller'***REMOVED***</a***REMOVED***
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre***REMOVED***controller: "MyRegisteredController"</pre***REMOVED***
   * <pre***REMOVED***controller:
   *     "MyRegisteredController as fooCtrl"***REMOVED***</pre***REMOVED***
   * <pre***REMOVED***controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); ***REMOVED***</pre***REMOVED***
   *
   * @param {function=***REMOVED*** stateConfig.controllerProvider
   * <a id='controllerProvider'***REMOVED***</a***REMOVED***
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre***REMOVED***controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     ***REMOVED***
   *   ***REMOVED***</pre***REMOVED***
   *
   * @param {string=***REMOVED*** stateConfig.controllerAs
   * <a id='controllerAs'***REMOVED***</a***REMOVED***
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre***REMOVED***controllerAs: "myCtrl"</pre***REMOVED***
   *
   * @param {object=***REMOVED*** stateConfig.resolve
   * <a id='resolve'***REMOVED***</a***REMOVED***
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string***REMOVED***: name of dependency to be injected into controller
   *   - factory - {string|function***REMOVED***: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre***REMOVED***resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   * ***REMOVED***
   *     ***REMOVED***</pre***REMOVED***
   *
   * @param {string=***REMOVED*** stateConfig.url
   * <a id='url'***REMOVED***</a***REMOVED***
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   * examples:
   * <pre***REMOVED***url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]***REMOVED***"
   * url: "/books/{categoryid:int***REMOVED***"
   * url: "/books/{publishername:string***REMOVED***/{categoryid:int***REMOVED***"
   * url: "/messages?before&after"
   * url: "/messages?{before:date***REMOVED***&{after:date***REMOVED***"</pre***REMOVED***
   * url: "/messages/:mailboxid?{before:date***REMOVED***&{after:date***REMOVED***"
   *
   * @param {object=***REMOVED*** stateConfig.views
   * <a id='views'***REMOVED***</a***REMOVED***
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre***REMOVED***views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     ***REMOVED***, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     ***REMOVED***, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     ***REMOVED***
   *   ***REMOVED***</pre***REMOVED***
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre***REMOVED***views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     ***REMOVED***, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     ***REMOVED***
   *   ***REMOVED***</pre***REMOVED***
   *
   * @param {boolean=***REMOVED*** [stateConfig.abstract=false]
   * <a id='abstract'***REMOVED***</a***REMOVED***
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre***REMOVED***abstract: true</pre***REMOVED***
   *
   * @param {function=***REMOVED*** stateConfig.onEnter
   * <a id='onEnter'***REMOVED***</a***REMOVED***
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre***REMOVED***onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * ***REMOVED***</pre***REMOVED***
   *
   * @param {function=***REMOVED*** stateConfig.onExit
   * <a id='onExit'***REMOVED***</a***REMOVED***
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre***REMOVED***onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * ***REMOVED***</pre***REMOVED***
   *
   * @param {boolean=***REMOVED*** [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'***REMOVED***</a***REMOVED***
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre***REMOVED***reloadOnSearch: false</pre***REMOVED***
   *
   * @param {object=***REMOVED*** stateConfig.data
   * <a id='data'***REMOVED***</a***REMOVED***
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre***REMOVED***data: {
   *     requiredRole: 'foo'
   * ***REMOVED*** </pre***REMOVED***
   *
   * @param {object=***REMOVED*** stateConfig.params
   * <a id='params'***REMOVED***</a***REMOVED***
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=***REMOVED***: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre***REMOVED***// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" ***REMOVED***
   * ***REMOVED***
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * ***REMOVED***</pre***REMOVED***
   *
   *   - ** array ** - {boolean=***REMOVED***: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] ***REMOVED***`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' ***REMOVED***`).
   *
   * <pre***REMOVED***params: {
   *     param1: { array: true ***REMOVED***
   * ***REMOVED***</pre***REMOVED***
   *
   *   - ** squash ** - {bool|string=***REMOVED***: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`***REMOVED***)
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string***REMOVED***"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre***REMOVED***params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * ***REMOVED*** ***REMOVED***
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * ***REMOVED*** ***REMOVED***
   * </pre***REMOVED***
   *
   *
   * @example
   * <pre***REMOVED***
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {***REMOVED***);
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {***REMOVED***);
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {***REMOVED***);
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {***REMOVED***)
   *   .state("about", {***REMOVED***)
   *   .state("contacts", {***REMOVED***);
   * </pre***REMOVED***
   *
   */
  this.state = state;
  function state(name, definition) {
    /*jshint validthis: true */
    if (isObject(name)) definition = name;
    else definition.name = name;
    registerState(definition);
    return this;
  ***REMOVED***

  /**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object***REMOVED*** params A param object, e.g. {sectionId: section.id)***REMOVED***, that 
   * you'd like to test against the current active state.
   * @property {object***REMOVED*** current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object***REMOVED*** transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
  this.$get = $get;
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {

    var TransitionSuperseded = $q.reject(new Error('transition superseded'));
    var TransitionPrevented = $q.reject(new Error('transition prevented'));
    var TransitionAborted = $q.reject(new Error('transition aborted'));
    var TransitionFailed = $q.reject(new Error('transition failed'));

    // Handles the case where a state which is the target of a transition is not found, and the user
    // can optionally retry or defer the transition
    function handleRedirect(redirect, state, params, options) {
      /**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object***REMOVED*** event Event object.
       * @param {Object***REMOVED*** unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State***REMOVED*** fromState Current state object.
       * @param {Object***REMOVED*** fromParams Current state params.
       *
       * @example
       *
       * <pre***REMOVED***
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2***REMOVED***, {inherit:false***REMOVED***);
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2***REMOVED***
       *     console.log(unfoundState.options); // {inherit:false***REMOVED*** + default options
       * ***REMOVED***)
       * </pre***REMOVED***
       */
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

      if (evt.defaultPrevented) {
        $urlRouter.update();
        return TransitionAborted;
***REMOVED***

      if (!evt.retry) {
        return null;
***REMOVED***

      // Allow the handler to return a promise to defer state lookup retry
      if (options.$retry) {
        $urlRouter.update();
        return TransitionFailed;
***REMOVED***
      var retryTransition = $state.transition = $q.when(evt.retry);

      retryTransition.then(function() {
        if (retryTransition !== $state.transition) return TransitionSuperseded;
        redirect.options.$retry = true;
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
***REMOVED***, function() {
        return TransitionAborted;
***REMOVED***);
      $urlRouter.update();

      return retryTransition;
    ***REMOVED***

    root.locals = { resolve: null, globals: { $stateParams: {***REMOVED*** ***REMOVED*** ***REMOVED***;

    $state = {
      params: {***REMOVED***,
      current: root.self,
      $current: root,
      transition: null
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved, events are not re-fired, 
     * and controllers reinstantiated (bug with controllers reinstantiating right now, fixing soon).
     *
     * @example
     * <pre***REMOVED***
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   ***REMOVED***
     * ***REMOVED***);
     * </pre***REMOVED***
     *
     * `reload()` is just an alias for:
     * <pre***REMOVED***
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * ***REMOVED***);
     * </pre***REMOVED***
     *
     * @returns {promise***REMOVED*** A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go***REMOVED***.
     */
    $state.reload = function reload() {
      return $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true ***REMOVED***);
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true ***REMOVED***`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre***REMOVED***
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   ***REMOVED***;
     * ***REMOVED***);
     * </pre***REMOVED***
     * <img src='../ngdoc_assets/StateGoExamples.png'/***REMOVED***
     *
     * @param {string***REMOVED*** to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=***REMOVED*** params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=***REMOVED*** options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=***REMOVED*** - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true***REMOVED***, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false***REMOVED***, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise***REMOVED*** A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/***REMOVED***Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
    $state.go = function go(to, params, options) {
      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current ***REMOVED***, options));
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go***REMOVED***
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre***REMOVED***
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   ***REMOVED***;
     * ***REMOVED***);
     * </pre***REMOVED***
     *
     * @param {string***REMOVED*** to State name.
     * @param {object=***REMOVED*** toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=***REMOVED*** options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=***REMOVED*** - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true***REMOVED***, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false***REMOVED***, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise***REMOVED*** A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go***REMOVED***.
     */
    $state.transitionTo = function transitionTo(to, toParams, options) {
      toParams = toParams || {***REMOVED***;
      options = extend({
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
***REMOVED***, options || {***REMOVED***);

      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
      var evt, toState = findState(to, options.relative);

      if (!isDefined(toState)) {
        var redirect = { to: to, toParams: toParams, options: options ***REMOVED***;
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

        if (redirectResult) {
          return redirectResult;
  ***REMOVED***

        // Always retry once if the $stateNotFound was not prevented
        // (handles either redirect changed or state lazy-definition)
        to = redirect.to;
        toParams = redirect.toParams;
        options = redirect.options;
        toState = findState(to, options.relative);

        if (!isDefined(toState)) {
          if (!options.relative) throw new Error("No such state '" + to + "'");
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
  ***REMOVED***
***REMOVED***
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
      if (options.inherit) toParams = inheritParams($stateParams, toParams || {***REMOVED***, $state.$current, toState);
      if (!toState.params.$$validates(toParams)) return TransitionFailed;

      toParams = toState.params.$$values(toParams);
      to = toState;

      var toPath = to.path;

      // Starting from the root of the path, keep all levels that haven't changed
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

      if (!options.reload) {
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
  ***REMOVED***
***REMOVED***

      // If we're going to the same state and all locals are kept, we've got nothing to do.
      // But clear 'transition', as we still want to cancel any other pending transitions.
      // TODO: We may not want to bump 'transition' if we're called from a location change
      // that we've initiated ourselves, because we might accidentally abort a legitimate
      // transition initiated from code?
      if (shouldTriggerReload(to, from, locals, options)) {
        if (to.self.reloadOnSearch !== false) $urlRouter.update();
        $state.transition = null;
        return $q.when($state.current);
***REMOVED***

      // Filter parameters before we pass them to event handlers etc.
      toParams = filterByKeys(to.params.$$keys(), toParams || {***REMOVED***);

      // Broadcast start event and cancel the transition if requested
      if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeStart
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when the state transition **begins**. You can use `event.preventDefault()`
         * to prevent the transition from happening and then the transition promise will be
         * rejected with a `'transition prevented'` value.
         *
         * @param {Object***REMOVED*** event Event object.
         * @param {State***REMOVED*** toState The state being transitioned to.
         * @param {Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param {State***REMOVED*** fromState The current state, pre-transition.
         * @param {Object***REMOVED*** fromParams The params supplied to the `fromState`.
         *
         * @example
         *
         * <pre***REMOVED***
         * $rootScope.$on('$stateChangeStart',
         * function(event, toState, toParams, fromState, fromParams){
         *     event.preventDefault();
         *     // transitionTo() promise will be rejected with
         *     // a 'transition prevented' error
         * ***REMOVED***)
         * </pre***REMOVED***
         */
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams).defaultPrevented) {
          $urlRouter.update();
          return TransitionPrevented;
  ***REMOVED***
***REMOVED***

      // Resolve locals for the remaining states, but don't update any global state just
      // yet -- if anything fails to resolve the current state needs to remain untouched.
      // We also set up an inheritance chain for the locals here. This allows the view directive
      // to quickly look up the correct definition for each view in the current state. Even
      // though we create the locals object itself outside resolveState(), it is initially
      // empty and gets filled asynchronously. We need to keep track of the promise for the
      // (fully resolved) current locals, and pass this down the chain.
      var resolved = $q.when(locals);

      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
        locals = toLocals[l] = inherit(locals);
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
***REMOVED***

      // Once everything is resolved, we are ready to perform the actual transition
      // and return a promise for the new state. We also keep track of what the
      // current promise is, so that we can detect overlapping transitions and
      // keep only the outcome of the last transition.
      var transition = $state.transition = resolved.then(function () {
        var l, entering, exiting;

        if ($state.transition !== transition) return TransitionSuperseded;

        // Exit 'from' states not kept
        for (l = fromPath.length - 1; l ***REMOVED***= keep; l--) {
          exiting = fromPath[l];
          if (exiting.self.onExit) {
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
    ***REMOVED***
          exiting.locals = null;
  ***REMOVED***

        // Enter 'to' states not kept
        for (l = keep; l < toPath.length; l++) {
          entering = toPath[l];
          entering.locals = toLocals[l];
          if (entering.self.onEnter) {
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
    ***REMOVED***
  ***REMOVED***

        // Run it again, to catch any transitions in callbacks
        if ($state.transition !== transition) return TransitionSuperseded;

        // Update globals in $state
        $state.$current = to;
        $state.current = to.self;
        $state.params = toParams;
        copy($state.params, $stateParams);
        $state.transition = null;

        if (options.location && to.navigable) {
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
            $$avoidResync: true, replace: options.location === 'replace'
    ***REMOVED***);
  ***REMOVED***

        if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object***REMOVED*** event Event object.
         * @param {State***REMOVED*** toState The state being transitioned to.
         * @param {Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param {State***REMOVED*** fromState The current state, pre-transition.
         * @param {Object***REMOVED*** fromParams The params supplied to the `fromState`.
         */
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
  ***REMOVED***
        $urlRouter.update(true);

        return $state.current;
***REMOVED***, function (error) {
        if ($state.transition !== transition) return TransitionSuperseded;

        $state.transition = null;
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object***REMOVED*** event Event object.
         * @param {State***REMOVED*** toState The state being transitioned to.
         * @param {Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param {State***REMOVED*** fromState The current state, pre-transition.
         * @param {Object***REMOVED*** fromParams The params supplied to the `fromState`.
         * @param {Error***REMOVED*** error The resolve error object.
         */
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

        if (!evt.defaultPrevented) {
            $urlRouter.update();
  ***REMOVED***

        return $q.reject(error);
***REMOVED***);

      return transition;
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes***REMOVED***,
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre***REMOVED***
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')***REMOVED***"***REMOVED***Item</div***REMOVED***
     * </pre***REMOVED***
     *
     * @param {string|object***REMOVED*** stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=***REMOVED*** params A param object, e.g. `{sectionId: section.id***REMOVED***`, that you'd like
     * to test against the current active state.
     * @param {object=***REMOVED*** options An options object.  The options are:
     *
     * - **`relative`** - {string|object***REMOVED*** -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean***REMOVED*** Returns true if it is the state.
     */
    $state.is = function is(stateOrName, params, options) {
      options = extend({ relative: $state.$current ***REMOVED***, options || {***REMOVED***);
      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) { return undefined; ***REMOVED***
      if ($state.$current !== state) { return false; ***REMOVED***
      return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre***REMOVED***
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')***REMOVED***"***REMOVED***Item</div***REMOVED***
     * </pre***REMOVED***
     *
     * Basic globbing patterns
     * <pre***REMOVED***
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre***REMOVED***
     *
     * @param {string***REMOVED*** stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=***REMOVED*** params A param object, e.g. `{sectionId: section.id***REMOVED***`,
     * that you'd like to test against the current active state.
     * @param {object=***REMOVED*** options An options object.  The options are:
     *
     * - **`relative`** - {string|object=***REMOVED*** -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean***REMOVED*** Returns true if it does include the state
     */
    $state.includes = function includes(stateOrName, params, options) {
      options = extend({ relative: $state.$current ***REMOVED***, options || {***REMOVED***);
      if (isString(stateOrName) && isGlob(stateOrName)) {
        if (!doesStateMatchGlob(stateOrName)) {
          return false;
  ***REMOVED***
        stateOrName = $state.$current.name;
***REMOVED***

      var state = findState(stateOrName, options.relative);
      if (!isDefined(state)) { return undefined; ***REMOVED***
      if (!isDefined($state.$current.includes[state.name])) { return false; ***REMOVED***
      return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;
    ***REMOVED***;


    /**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre***REMOVED***
     * expect($state.href("about.person", { person: "bob" ***REMOVED***)).toEqual("/about/bob");
     * </pre***REMOVED***
     *
     * @param {string|object***REMOVED*** stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=***REMOVED*** params An object of parameter values to fill the state's required parameters.
     * @param {object=***REMOVED*** options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true***REMOVED*** -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false***REMOVED***,  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string***REMOVED*** compiled state url
     */
    $state.href = function href(stateOrName, params, options) {
      options = extend({
        lossy:    true,
        inherit:  true,
        absolute: false,
        relative: $state.$current
***REMOVED***, options || {***REMOVED***);

      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) return null;
      if (options.inherit) params = inheritParams($stateParams, params || {***REMOVED***, $state.$current, state);
      
      var nav = (state && options.lossy) ? state.navigable : state;

      if (!nav || nav.url === undefined || nav.url === null) {
        return null;
***REMOVED***
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys(), params || {***REMOVED***), {
        absolute: options.absolute
***REMOVED***);
    ***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=***REMOVED*** stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=***REMOVED*** context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array***REMOVED*** State configuration object or array of all objects.
     */
    $state.get = function (stateOrName, context) {
      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; ***REMOVED***);
      var state = findState(stateOrName, context || $state.$current);
      return (state && state.self) ? state.self : null;
    ***REMOVED***;

    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = { $stateParams: $stateParams ***REMOVED***;

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) {
        dst.globals = globals;
***REMOVED***)];
      if (inherited) promises.push(inherited);

      // Resolve template and dependencies for all views.
      forEach(state.views, function (view, name) {
        var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {***REMOVED***);
        injectables.$template = [ function () {
          return $view.load(name, { view: view, locals: locals, params: $stateParams, notify: options.notify ***REMOVED***) || '';
  ***REMOVED***];

        promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function (result) {
          // References to the controller (only instantiated at link time)
          if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
            var injectLocals = angular.extend({***REMOVED***, injectables, locals);
            result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
    ***REMOVED*** else {
            result.$$controller = view.controller;
    ***REMOVED***
          // Provide access to the state itself for internal use
          result.$$state = state;
          result.$$controllerAs = view.controllerAs;
          dst[name] = result;
  ***REMOVED***));
***REMOVED***);

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(function (values) {
        return dst;
***REMOVED***);
    ***REMOVED***

    return $state;
  ***REMOVED***

  function shouldTriggerReload(to, from, locals, options) {
    if (to === from && ((locals === from.locals && !options.reload) || (to.self.reloadOnSearch === false))) {
      return true;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

angular.module('ui.router.state')
  .value('$stateParams', {***REMOVED***)
  .provider('$state', $StateProvider);
