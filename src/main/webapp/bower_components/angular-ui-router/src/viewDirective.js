/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=***REMOVED*** name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=***REMOVED*** autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll***REMOVED***. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=***REMOVED*** onload Expression to evaluate whenever the view updates.
 * 
 * @example
 * A view can be unnamed or named. 
 * <pre***REMOVED***
 * <!-- Unnamed --***REMOVED***
 * <div ui-view***REMOVED***</div***REMOVED*** 
 * 
 * <!-- Named --***REMOVED***
 * <div ui-view="viewName"***REMOVED***</div***REMOVED***
 * </pre***REMOVED***
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a 
 * single view and it is unnamed then you can populate it like so:
 * <pre***REMOVED***
 * <div ui-view***REMOVED***</div***REMOVED*** 
 * $stateProvider.state("home", {
 *   template: "<h1***REMOVED***HELLO!</h1***REMOVED***"
 * ***REMOVED***)
 * </pre***REMOVED***
 * 
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`***REMOVED***
 * config property, by name, in this case an empty name:
 * <pre***REMOVED***
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1***REMOVED***HELLO!</h1***REMOVED***"
 *     ***REMOVED***
 *   ***REMOVED***    
 * ***REMOVED***)
 * </pre***REMOVED***
 * 
 * But typically you'll only use the views property if you name your view or have more than one view 
 * in the same template. There's not really a compelling reason to name a view if its the only one, 
 * but you could if you wanted, like so:
 * <pre***REMOVED***
 * <div ui-view="main"***REMOVED***</div***REMOVED***
 * </pre***REMOVED*** 
 * <pre***REMOVED***
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1***REMOVED***HELLO!</h1***REMOVED***"
 *     ***REMOVED***
 *   ***REMOVED***    
 * ***REMOVED***)
 * </pre***REMOVED***
 * 
 * Really though, you'll use views to set up multiple views:
 * <pre***REMOVED***
 * <div ui-view***REMOVED***</div***REMOVED***
 * <div ui-view="chart"***REMOVED***</div***REMOVED*** 
 * <div ui-view="data"***REMOVED***</div***REMOVED*** 
 * </pre***REMOVED***
 * 
 * <pre***REMOVED***
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1***REMOVED***HELLO!</h1***REMOVED***"
 *     ***REMOVED***,
 *     "chart": {
 *       template: "<chart_thing/***REMOVED***"
 *     ***REMOVED***,
 *     "data": {
 *       template: "<data_thing/***REMOVED***"
 *     ***REMOVED***
 *   ***REMOVED***    
 * ***REMOVED***)
 * </pre***REMOVED***
 *
 * Examples for `autoscroll`:
 *
 * <pre***REMOVED***
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view --***REMOVED***
 * <ui-view autoscroll/***REMOVED***
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true --***REMOVED***
 * <ui-view autoscroll='true'/***REMOVED***
 * <ui-view autoscroll='false'/***REMOVED***
 * <ui-view autoscroll='scopeVariable'/***REMOVED***
 * </pre***REMOVED***
 */
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate'];
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate) {

  function getService() {
    return ($injector.has) ? function(service) {
      return $injector.has(service) ? $injector.get(service) : null;
    ***REMOVED*** : function(service) {
      try {
        return $injector.get(service);
***REMOVED*** catch (e) {
        return null;
***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  var service = getService(),
      $animator = service('$animator'),
      $animate = service('$animate');

  // Returns a set of DOM manipulation functions based on which Angular version
  // it should use
  function getRenderer(attrs, scope) {
    var statics = function() {
      return {
        enter: function (element, target, cb) { target.after(element); cb(); ***REMOVED***,
        leave: function (element, cb) { element.remove(); cb(); ***REMOVED***
***REMOVED***;
    ***REMOVED***;

    if ($animate) {
      return {
        enter: function(element, target, cb) {
          var promise = $animate.enter(element, null, target, cb);
          if (promise && promise.then) promise.then(cb);
  ***REMOVED***,
        leave: function(element, cb) {
          var promise = $animate.leave(element, cb);
          if (promise && promise.then) promise.then(cb);
  ***REMOVED***
***REMOVED***;
    ***REMOVED***

    if ($animator) {
      var animate = $animator && $animator(scope, attrs);

      return {
        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); ***REMOVED***,
        leave: function(element, cb) { animate.leave(element); cb(); ***REMOVED***
***REMOVED***;
    ***REMOVED***

    return statics();
  ***REMOVED***

  var directive = {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) {
      return function (scope, $element, attrs) {
        var previousEl, currentEl, currentScope, latestLocals,
            onloadExp     = attrs.onload || '',
            autoScrollExp = attrs.autoscroll,
            renderer      = getRenderer(attrs, scope);

        scope.$on('$stateChangeSuccess', function() {
          updateView(false);
  ***REMOVED***);
        scope.$on('$viewContentLoading', function() {
          updateView(false);
  ***REMOVED***);

        updateView(true);

        function cleanupLastView() {
          if (previousEl) {
            previousEl.remove();
            previousEl = null;
    ***REMOVED***

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
    ***REMOVED***

          if (currentEl) {
            renderer.leave(currentEl, function() {
              previousEl = null;
      ***REMOVED***);

            previousEl = currentEl;
            currentEl = null;
    ***REMOVED***
  ***REMOVED***

        function updateView(firstTime) {
          var newScope,
              name            = getUiViewName(scope, attrs, $element, $interpolate),
              previousLocals  = name && $state.$current && $state.$current.locals[name];

          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
          newScope = scope.$new();
          latestLocals = $state.$current.locals[name];

          var clone = $transclude(newScope, function(clone) {
            renderer.enter(clone, $element, function onUiViewEnter() {
              if(currentScope) {
                currentScope.$emit('$viewContentAnimationEnded');
        ***REMOVED***

              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                $uiViewScroll(clone);
        ***REMOVED***
      ***REMOVED***);
            cleanupLastView();
    ***REMOVED***);

          currentEl = clone;
          currentScope = newScope;
          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description           *
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object***REMOVED*** event Event object.
           */
          currentScope.$emit('$viewContentLoaded');
          currentScope.$eval(onloadExp);
  ***REMOVED***
***REMOVED***;
    ***REMOVED***
  ***REMOVED***;

  return directive;
***REMOVED***

$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {
  return {
    restrict: 'ECA',
    priority: -400,
    compile: function (tElement) {
      var initial = tElement.html();
      return function (scope, $element, attrs) {
        var current = $state.$current,
            name = getUiViewName(scope, attrs, $element, $interpolate),
            locals  = current && current.locals[name];

        if (! locals) {
          return;
  ***REMOVED***

        $element.data('$uiView', { name: name, state: locals.$$state ***REMOVED***);
        $element.html(locals.$template ? locals.$template : initial);

        var link = $compile($element.contents());

        if (locals.$$controller) {
          locals.$scope = scope;
          locals.$element = $element;
          var controller = $controller(locals.$$controller, locals);
          if (locals.$$controllerAs) {
            scope[locals.$$controllerAs] = controller;
    ***REMOVED***
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
  ***REMOVED***

        link(scope);
***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope, attrs, element, $interpolate) {
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
  var inherited = element.inheritedData('$uiView');
  return name.indexOf('@') ***REMOVED***= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));
***REMOVED***

angular.module('ui.router.state').directive('uiView', $ViewDirective);
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
