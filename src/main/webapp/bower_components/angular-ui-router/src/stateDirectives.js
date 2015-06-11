function parseStateRef(ref, current) {
  var preparsed = ref.match(/^\s*({[^***REMOVED***]****REMOVED***)\s*$/), parsed;
  if (preparsed) ref = current + '(' + preparsed[1] + ')';
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
  return { state: parsed[1], paramExpr: parsed[3] || null ***REMOVED***;
***REMOVED***

function stateContext(el) {
  var stateData = el.parent().inheritedData('$uiView');

  if (stateData && stateData.state && stateData.state.name) {
    return stateData.state;
  ***REMOVED***
***REMOVED***

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a***REMOVED***` tag) to a state. If the state has an associated 
 * URL, the directive will automatically generate & update the `href` attribute via 
 * the {@link ui.router.state.$state#methods_href $state.href()***REMOVED*** method. Clicking 
 * the link will trigger a state transition with optional parameters. 
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative 
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the 
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()***REMOVED***
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
 * following template:
 * <pre***REMOVED***
 * <a ui-sref="home"***REMOVED***Home</a***REMOVED*** | <a ui-sref="about"***REMOVED***About</a***REMOVED*** | <a ui-sref="{page: 2***REMOVED***"***REMOVED***Next page</a***REMOVED***
 * 
 * <ul***REMOVED***
 *     <li ng-repeat="contact in contacts"***REMOVED***
 *         <a ui-sref="contacts.detail({ id: contact.id ***REMOVED***)"***REMOVED***{{ contact.name ***REMOVED******REMOVED***</a***REMOVED***
 *     </li***REMOVED***
 * </ul***REMOVED***
 * </pre***REMOVED***
 * 
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre***REMOVED***
 * <a href="#/home" ui-sref="home"***REMOVED***Home</a***REMOVED*** | <a href="#/about" ui-sref="about"***REMOVED***About</a***REMOVED*** | <a href="#/contacts?page=2" ui-sref="{page: 2***REMOVED***"***REMOVED***Next page</a***REMOVED***
 * 
 * <ul***REMOVED***
 *     <li ng-repeat="contact in contacts"***REMOVED***
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id ***REMOVED***)"***REMOVED***Joe</a***REMOVED***
 *     </li***REMOVED***
 *     <li ng-repeat="contact in contacts"***REMOVED***
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id ***REMOVED***)"***REMOVED***Alice</a***REMOVED***
 *     </li***REMOVED***
 *     <li ng-repeat="contact in contacts"***REMOVED***
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id ***REMOVED***)"***REMOVED***Bob</a***REMOVED***
 *     </li***REMOVED***
 * </ul***REMOVED***
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true***REMOVED***"***REMOVED***Home</a***REMOVED***
 * </pre***REMOVED***
 *
 * @param {string***REMOVED*** ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object***REMOVED*** ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()***REMOVED***
 */
$StateRefDirective.$inject = ['$state', '$timeout'];
function $StateRefDirective($state, $timeout) {
  var allowedOptions = ['location', 'inherit', 'reload'];

  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var ref = parseStateRef(attrs.uiSref, $state.current.name);
      var params = null, url = null, base = stateContext(element) || $state.$current;
      var newHref = null, isAnchor = element.prop("tagName") === "A";
      var isForm = element[0].nodeName === "FORM";
      var attr = isForm ? "action" : "href", nav = true;

      var options = { relative: base, inherit: true ***REMOVED***;
      var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {***REMOVED***;

      angular.forEach(allowedOptions, function(option) {
        if (option in optionsOverride) {
          options[option] = optionsOverride[option];
  ***REMOVED***
***REMOVED***);

      var update = function(newVal) {
        if (newVal) params = angular.copy(newVal);
        if (!nav) return;

        newHref = $state.href(ref.state, params, options);

        var activeDirective = uiSrefActive[1] || uiSrefActive[0];
        if (activeDirective) {
          activeDirective.$$setStateInfo(ref.state, params);
  ***REMOVED***
        if (newHref === null) {
          nav = false;
          return false;
  ***REMOVED***
        attrs.$set(attr, newHref);
***REMOVED***;

      if (ref.paramExpr) {
        scope.$watch(ref.paramExpr, function(newVal, oldVal) {
          if (newVal !== params) update(newVal);
  ***REMOVED***, true);
        params = angular.copy(scope.$eval(ref.paramExpr));
***REMOVED***
      update();

      if (isForm) return;

      element.bind("click", function(e) {
        var button = e.which || e.button;
        if ( !(button ***REMOVED*** 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target')) ) {
          // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
          var transition = $timeout(function() {
            $state.go(ref.state, params, options);
    ***REMOVED***);
          e.preventDefault();

          // if the state has no URL, ignore one preventDefault from the <a***REMOVED*** directive.
          var ignorePreventDefaultCount = isAnchor && !newHref ? 1: 0;
          e.preventDefault = function() {
            if (ignorePreventDefaultCount-- <= 0)
              $timeout.cancel(transition);
    ***REMOVED***;
  ***REMOVED***
***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq***REMOVED***
 *
 * @example
 * Given the following template:
 * <pre***REMOVED***
 * <ul***REMOVED***
 *   <li ui-sref-active="active" class="item"***REMOVED***
 *     <a href ui-sref="app.user({user: 'bilbobaggins'***REMOVED***)"***REMOVED***@bilbobaggins</a***REMOVED***
 *   </li***REMOVED***
 * </ul***REMOVED***
 * </pre***REMOVED***
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre***REMOVED***
 * <ul***REMOVED***
 *   <li ui-sref-active="active" class="item active"***REMOVED***
 *     <a ui-sref="app.user({user: 'bilbobaggins'***REMOVED***)" href="/users/bilbobaggins"***REMOVED***@bilbobaggins</a***REMOVED***
 *   </li***REMOVED***
 * </ul***REMOVED***
 * </pre***REMOVED***
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre***REMOVED***
 * <ul***REMOVED***
 *   <li ui-sref-active='class1 class2 class3'***REMOVED***
 *     <a ui-sref="app.user"***REMOVED***link</a***REMOVED***
 *   </li***REMOVED***
 * </ul***REMOVED***
 * </pre***REMOVED***
 */

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active***REMOVED*** but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
function $StateRefActiveDirective($state, $stateParams, $interpolate) {
  return  {
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      var state, params, activeClass;

      // There probably isn't much point in $observing this
      // uiSrefActive and uiSrefActiveEq share the same directive object with some
      // slight difference in logic routing
      activeClass = $interpolate($attrs.uiSrefActiveEq || $attrs.uiSrefActive || '', false)($scope);

      // Allow uiSref to communicate with uiSrefActive[Equals]
      this.$$setStateInfo = function (newState, newParams) {
        state = $state.get(newState, stateContext($element));
        params = newParams;
        update();
***REMOVED***;

      $scope.$on('$stateChangeSuccess', update);

      // Update route state
      function update() {
        if (isMatch()) {
          $element.addClass(activeClass);
  ***REMOVED*** else {
          $element.removeClass(activeClass);
  ***REMOVED***
***REMOVED***

      function isMatch() {
        if (typeof $attrs.uiSrefActiveEq !== 'undefined') {
          return state && $state.is(state.name, params);
  ***REMOVED*** else {
          return state && $state.includes(state.name, params);
  ***REMOVED***
***REMOVED***
    ***REMOVED***]
  ***REMOVED***;
***REMOVED***

angular.module('ui.router.state')
  .directive('uiSref', $StateRefDirective)
  .directive('uiSrefActive', $StateRefActiveDirective)
  .directive('uiSrefActiveEq', $StateRefActiveDirective);
