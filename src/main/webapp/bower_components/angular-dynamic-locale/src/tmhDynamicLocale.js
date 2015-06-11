(function(window) {
'use strict';
angular.module('tmh.dynamicLocale', []).config(['$provide', function ($provide) {
  function makeStateful($delegate) {
    $delegate.$stateful = true;
    return $delegate;
  ***REMOVED***

  $provide.decorator('dateFilter', ['$delegate', makeStateful]);
  $provide.decorator('numberFilter', ['$delegate', makeStateful]);
  $provide.decorator('currencyFilter', ['$delegate', makeStateful]);

***REMOVED***])
.constant('tmhDynamicLocale.STORAGE_KEY', 'tmhDynamicLocale.locale')
.provider('tmhDynamicLocale', ['tmhDynamicLocale.STORAGE_KEY', function(STORAGE_KEY) {

  var defaultLocale,
    localeLocationPattern = 'angular/i18n/angular-locale_{{locale***REMOVED******REMOVED***.js',
    storageFactory = 'tmhDynamicLocaleStorageCache',
    storage,
    storageKey = STORAGE_KEY,
    promiseCache = {***REMOVED***,
    activeLocale;

  /**
   * Loads a script asynchronously
   *
   * @param {string***REMOVED*** url The url for the script
   @ @param {function) callback A function to be called once the script is loaded
   */
  function loadScript(url, callback, errorCallback, $timeout) {
    var script = document.createElement('script'),
      body = document.getElementsByTagName('body')[0],
      removed = false;

    script.type = 'text/javascript';
    if (script.readyState) { // IE
      script.onreadystatechange = function () {
        if (script.readyState === 'complete' ||
            script.readyState === 'loaded') {
          script.onreadystatechange = null;
          $timeout(
            function () {
              if (removed) return;
              removed = true;
              body.removeChild(script);
              callback();
      ***REMOVED***, 30, false);
  ***REMOVED***
***REMOVED***;
    ***REMOVED*** else { // Others
      script.onload = function () {
        if (removed) return;
        removed = true;
        body.removeChild(script);
        callback();
***REMOVED***;
      script.onerror = function () {
        if (removed) return;
        removed = true;
        body.removeChild(script);
        errorCallback();
***REMOVED***;
    ***REMOVED***
    script.src = url;
    script.async = false;
    body.appendChild(script);
  ***REMOVED***

  /**
   * Loads a locale and replaces the properties from the current locale with the new locale information
   *
   * @param localeUrl The path to the new locale
   * @param $locale The locale at the curent scope
   */
  function loadLocale(localeUrl, $locale, localeId, $rootScope, $q, localeCache, $timeout) {

    function overrideValues(oldObject, newObject) {
      if (activeLocale !== localeId) {
        return;
***REMOVED***
      angular.forEach(oldObject, function(value, key) {
        if (!newObject[key]) {
          delete oldObject[key];
  ***REMOVED*** else if (angular.isArray(newObject[key])) {
          oldObject[key].length = newObject[key].length;
  ***REMOVED***
***REMOVED***);
      angular.forEach(newObject, function(value, key) {
        if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
          if (!oldObject[key]) {
            oldObject[key] = angular.isArray(newObject[key]) ? [] : {***REMOVED***;
    ***REMOVED***
          overrideValues(oldObject[key], newObject[key]);
  ***REMOVED*** else {
          oldObject[key] = newObject[key];
  ***REMOVED***
***REMOVED***);
    ***REMOVED***


    if (promiseCache[localeId]) return promiseCache[localeId];

    var cachedLocale,
      deferred = $q.defer();
    if (localeId === activeLocale) {
      deferred.resolve($locale);
    ***REMOVED*** else if ((cachedLocale = localeCache.get(localeId))) {
      activeLocale = localeId;
      $rootScope.$evalAsync(function() {
        overrideValues($locale, cachedLocale);
        $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
        storage.put(storageKey, localeId);
        deferred.resolve($locale);
***REMOVED***);
    ***REMOVED*** else {
      activeLocale = localeId;
      promiseCache[localeId] = deferred.promise;
      loadScript(localeUrl, function () {
        // Create a new injector with the new locale
        var localInjector = angular.injector(['ngLocale']),
          externalLocale = localInjector.get('$locale');

        overrideValues($locale, externalLocale);
        localeCache.put(localeId, externalLocale);
        delete promiseCache[localeId];

        $rootScope.$apply(function () {
          $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
          storage.put(storageKey, localeId);
          deferred.resolve($locale);
  ***REMOVED***);
***REMOVED***, function () {
        delete promiseCache[localeId];

        $rootScope.$apply(function () {
          if (activeLocale === localeId) activeLocale = $locale.id;
          $rootScope.$broadcast('$localeChangeError', localeId);
          deferred.reject(localeId);
  ***REMOVED***);
***REMOVED***, $timeout);
    ***REMOVED***
    return deferred.promise;
  ***REMOVED***

  this.localeLocationPattern = function(value) {
    if (value) {
      localeLocationPattern = value;
      return this;
    ***REMOVED*** else {
      return localeLocationPattern;
    ***REMOVED***
  ***REMOVED***;

  this.useStorage = function(storageName) {
    storageFactory = storageName;
  ***REMOVED***;

  this.useCookieStorage = function() {
    this.useStorage('$cookieStore');
  ***REMOVED***;

  this.defaultLocale = function (value) {
    defaultLocale = value;
  ***REMOVED***;

  this.storageKey = function (value) {
    if (value) {
      storageKey = value;
      return this;
    ***REMOVED*** else {
      return storageKey;
    ***REMOVED***
  ***REMOVED***;

  this.$get = ['$rootScope', '$injector', '$interpolate', '$locale', '$q', 'tmhDynamicLocaleCache', '$timeout', function($rootScope, $injector, interpolate, locale, $q, tmhDynamicLocaleCache, $timeout) {
    var localeLocation = interpolate(localeLocationPattern);

    storage = $injector.get(storageFactory);
    $rootScope.$evalAsync(function () {
      var initialLocale;
      if ((initialLocale = (storage.get(storageKey) || defaultLocale))) {
        loadLocale(localeLocation({locale: initialLocale***REMOVED***), locale, initialLocale, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
***REMOVED***
    ***REMOVED***);
    return {
      /**
       * @ngdoc method
       * @description
       * @param {string=***REMOVED*** value Sets the locale to the new locale. Changing the locale will trigger
       *    a background task that will retrieve the new locale and configure the current $locale
       *    instance with the information from the new locale
       */
      set: function(value) {
        return loadLocale(localeLocation({locale: value***REMOVED***), locale, value, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
***REMOVED***,
      /**
       * @ngdoc method
       * @description Returns the configured locale
       */
      get: function() {
        return activeLocale;
***REMOVED***
    ***REMOVED***;
  ***REMOVED***];
***REMOVED***]).provider('tmhDynamicLocaleCache', function() {
  this.$get = ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('tmh.dynamicLocales');
  ***REMOVED***];
***REMOVED***).provider('tmhDynamicLocaleStorageCache', function() {
  this.$get = ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('tmh.dynamicLocales.store');
  ***REMOVED***];
***REMOVED***).run(['tmhDynamicLocale', angular.noop]);
***REMOVED***(window));
