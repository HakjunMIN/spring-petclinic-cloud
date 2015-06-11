
$ViewProvider.$inject = [];
function $ViewProvider() {

  this.$get = $get;
  /**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
  $get.$inject = ['$rootScope', '$templateFactory'];
  function $get(   $rootScope,   $templateFactory) {
    return {
      // $view.load('full.viewName', { template: ***REMOVED***, controller: ***REMOVED***, resolve: ***REMOVED***, async: false, params: ***REMOVED*** ***REMOVED***)
      /**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string***REMOVED*** name name
       * @param {object***REMOVED*** options option object.
       */
      load: function load(name, options) {
        var result, defaults = {
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {***REMOVED***
  ***REMOVED***;
        options = extend(defaults, options);

        if (options.view) {
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
  ***REMOVED***
        if (result && options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$viewContentLoading
         * @eventOf ui.router.state.$view
         * @eventType broadcast on root scope
         * @description
         *
         * Fired once the view **begins loading**, *before* the DOM is rendered.
         *
         * @param {Object***REMOVED*** event Event object.
         * @param {Object***REMOVED*** viewConfig The view config properties (template, controller, etc).
         *
         * @example
         *
         * <pre***REMOVED***
         * $scope.$on('$viewContentLoading',
         * function(event, viewConfig){
         *     // Access to all the view config properties.
         *     // and one special property 'targetView'
         *     // viewConfig.targetView
         * ***REMOVED***);
         * </pre***REMOVED***
         */
          $rootScope.$broadcast('$viewContentLoading', options);
  ***REMOVED***
        return result;
***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***

angular.module('ui.router.state').provider('$view', $ViewProvider);
