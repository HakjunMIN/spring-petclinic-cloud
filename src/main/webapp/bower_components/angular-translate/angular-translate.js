/*!
 * angular-translate - v2.6.1 - 2015-03-01
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2015 ; Licensed MIT
 */
/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
angular.module('pascalprecht.translate', ['ng'])

.run(['$translate', function ($translate) {

  var key = $translate.storageKey(),
      storage = $translate.storage();

  var fallbackFromIncorrectStorageValue = function() {
    var preferred = $translate.preferredLanguage();
    if (angular.isString(preferred)) {
      $translate.use(preferred);
      // $translate.use() will also remember the language.
      // So, we don't need to call storage.put() here.
    ***REMOVED*** else {
      storage.put(key, $translate.use());
    ***REMOVED***
  ***REMOVED***;

  if (storage) {
    if (!storage.get(key)) {
      fallbackFromIncorrectStorageValue();
    ***REMOVED*** else {
      $translate.use(storage.get(key))['catch'](fallbackFromIncorrectStorageValue);
    ***REMOVED***
  ***REMOVED*** else if (angular.isString($translate.preferredLanguage())) {
    $translate.use($translate.preferredLanguage());
  ***REMOVED***
***REMOVED***]);

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateProvider
 * @description
 *
 * $translateProvider allows developers to register translation-tables, asynchronous loaders
 * and similar to configure translation behavior directly inside of a module.
 *
 */
angular.module('pascalprecht.translate').provider('$translate', ['$STORAGE_KEY', '$windowProvider', function ($STORAGE_KEY, $windowProvider) {

  var $translationTable = {***REMOVED***,
      $preferredLanguage,
      $availableLanguageKeys = [],
      $languageKeyAliases,
      $fallbackLanguage,
      $fallbackWasString,
      $uses,
      $nextLang,
      $storageFactory,
      $storageKey = $STORAGE_KEY,
      $storagePrefix,
      $missingTranslationHandlerFactory,
      $interpolationFactory,
      $interpolatorFactories = [],
      $interpolationSanitizationStrategy = false,
      $loaderFactory,
      $cloakClassName = 'translate-cloak',
      $loaderOptions,
      $notFoundIndicatorLeft,
      $notFoundIndicatorRight,
      $postCompilingEnabled = false,
      NESTED_OBJECT_DELIMITER = '.',
      loaderCache,
      directivePriority = 0;

  var version = '2.6.1';

  // tries to determine the browsers language
  var getFirstBrowserLanguage = function () {
    var nav = $windowProvider.$get().navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
  ***REMOVED***
***REMOVED***
    ***REMOVED***

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
***REMOVED***
    ***REMOVED***

    return null;
  ***REMOVED***;
  getFirstBrowserLanguage.displayName = 'angular-translate/service: getFirstBrowserLanguage';

  // tries to determine the browsers locale
  var getLocale = function () {
    return (getFirstBrowserLanguage() || '').split('-').join('_');
  ***REMOVED***;
  getLocale.displayName = 'angular-translate/service: getLocale';

  /**
   * @name indexOf
   * @private
   *
   * @description
   * indexOf polyfill. Kinda sorta.
   *
   * @param {array***REMOVED*** array Array to search in.
   * @param {string***REMOVED*** searchElement Element to search for.
   *
   * @returns {int***REMOVED*** Index of search element.
   */
  var indexOf = function(array, searchElement) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === searchElement) {
        return i;
***REMOVED***
    ***REMOVED***
    return -1;
  ***REMOVED***;

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string***REMOVED*** The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  ***REMOVED***;

  var negotiateLocale = function (preferred) {

    var avail = [],
        locale = angular.lowercase(preferred),
        i = 0,
        n = $availableLanguageKeys.length;

    for (; i < n; i++) {
      avail.push(angular.lowercase($availableLanguageKeys[i]));
    ***REMOVED***

    if (indexOf(avail, locale) ***REMOVED*** -1) {
      return preferred;
    ***REMOVED***

    if ($languageKeyAliases) {
      var alias;
      for (var langKeyAlias in $languageKeyAliases) {
        var hasWildcardKey = false;
        var hasExactKey = Object.prototype.hasOwnProperty.call($languageKeyAliases, langKeyAlias) &&
          angular.lowercase(langKeyAlias) === angular.lowercase(preferred);

        if (langKeyAlias.slice(-1) === '*') {
          hasWildcardKey = langKeyAlias.slice(0, -1) === preferred.slice(0, langKeyAlias.length-1);
  ***REMOVED***
        if (hasExactKey || hasWildcardKey) {
          alias = $languageKeyAliases[langKeyAlias];
          if (indexOf(avail, angular.lowercase(alias)) ***REMOVED*** -1) {
            return alias;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    ***REMOVED***

    var parts = preferred.split('_');

    if (parts.length ***REMOVED*** 1 && indexOf(avail, angular.lowercase(parts[0])) ***REMOVED*** -1) {
      return parts[0];
    ***REMOVED***

    // If everything fails, just return the preferred, unchanged.
    return preferred;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translations
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a new translation table for specific language key.
   *
   * To register a translation table for specific language, pass a defined language
   * key as first parameter.
   *
   * <pre***REMOVED***
   *  // register translation table for language: 'de_DE'
   *  $translateProvider.translations('de_DE', {
   *    'GREETING': 'Hallo Welt!'
   *  ***REMOVED***);
   *
   *  // register another one
   *  $translateProvider.translations('en_US', {
   *    'GREETING': 'Hello world!'
   *  ***REMOVED***);
   * </pre***REMOVED***
   *
   * When registering multiple translation tables for for the same language key,
   * the actual translation table gets extended. This allows you to define module
   * specific translation which only get added, once a specific module is loaded in
   * your app.
   *
   * Invoking this method with no arguments returns the translation table which was
   * registered with no language key. Invoking it with a language key returns the
   * related translation table.
   *
   * @param {string***REMOVED*** key A language key.
   * @param {object***REMOVED*** translationTable A plain old JavaScript object that represents a translation table.
   *
   */
  var translations = function (langKey, translationTable) {

    if (!langKey && !translationTable) {
      return $translationTable;
    ***REMOVED***

    if (langKey && !translationTable) {
      if (angular.isString(langKey)) {
        return $translationTable[langKey];
***REMOVED***
    ***REMOVED*** else {
      if (!angular.isObject($translationTable[langKey])) {
        $translationTable[langKey] = {***REMOVED***;
***REMOVED***
      angular.extend($translationTable[langKey], flatObject(translationTable));
    ***REMOVED***
    return this;
  ***REMOVED***;

  this.translations = translations;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#cloakClassName
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the class name for `translate-cloak` directive.
   * Default class name is `translate-cloak`.
   *
   * @param {string***REMOVED*** name translate-cloak class name
   */
  this.cloakClassName = function (name) {
    if (!name) {
      return $cloakClassName;
    ***REMOVED***
    $cloakClassName = name;
    return this;
  ***REMOVED***;

  /**
   * @name flatObject
   * @private
   *
   * @description
   * Flats an object. This function is used to flatten given translation data with
   * namespaces, so they are later accessible via dot notation.
   */
  var flatObject = function (data, path, result, prevKey) {
    var key, keyWithPath, keyWithShortPath, val;

    if (!path) {
      path = [];
    ***REMOVED***
    if (!result) {
      result = {***REMOVED***;
    ***REMOVED***
    for (key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
***REMOVED***
      val = data[key];
      if (angular.isObject(val)) {
        flatObject(val, path.concat(key), result, key);
***REMOVED*** else {
        keyWithPath = path.length ? ('' + path.join(NESTED_OBJECT_DELIMITER) + NESTED_OBJECT_DELIMITER + key) : key;
        if(path.length && key === prevKey){
          // Create shortcut path (foo.bar == foo.bar.bar)
          keyWithShortPath = '' + path.join(NESTED_OBJECT_DELIMITER);
          // Link it to original path
          result[keyWithShortPath] = '@:' + keyWithPath;
  ***REMOVED***
        result[keyWithPath] = val;
***REMOVED***
    ***REMOVED***
    return result;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#addInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Adds interpolation services to angular-translate, so it can manage them.
   *
   * @param {object***REMOVED*** factory Interpolation service factory
   */
  this.addInterpolation = function (factory) {
    $interpolatorFactories.push(factory);
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMessageFormatInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use interpolation functionality of messageformat.js.
   * This is useful when having high level pluralization and gender selection.
   */
  this.useMessageFormatInterpolation = function () {
    return this.useInterpolation('$translateMessageFormatInterpolation');
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which interpolation style to use as default, application-wide.
   * Simply pass a factory/service name. The interpolation service has to implement
   * the correct interface.
   *
   * @param {string***REMOVED*** factory Interpolation service name.
   */
  this.useInterpolation = function (factory) {
    $interpolationFactory = factory;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useSanitizeStrategy
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Simply sets a sanitation strategy type.
   *
   * @param {string***REMOVED*** value Strategy type.
   */
  this.useSanitizeValueStrategy = function (value) {
    $interpolationSanitizationStrategy = value;
    return this;
  ***REMOVED***;

 /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#preferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use for translation
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **prefer**.
   *
   * @param {string***REMOVED*** langKey A language key.
   *
   */
  this.preferredLanguage = function(langKey) {
    setupPreferredLanguage(langKey);
    return this;

  ***REMOVED***;
  var setupPreferredLanguage = function (langKey) {
    if (langKey) {
      $preferredLanguage = langKey;
    ***REMOVED***
    return $preferredLanguage;
  ***REMOVED***;
  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicator
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found. E.g. when
   * setting the indicator as 'X' and one tries to translate a translation id
   * called `NOT_FOUND`, this will result in `X NOT_FOUND X`.
   *
   * Internally this methods sets a left indicator and a right indicator using
   * `$translateProvider.translationNotFoundIndicatorLeft()` and
   * `$translateProvider.translationNotFoundIndicatorRight()`.
   *
   * **Note**: These methods automatically add a whitespace between the indicators
   * and the translation id.
   *
   * @param {string***REMOVED*** indicator An indicator, could be any string.
   */
  this.translationNotFoundIndicator = function (indicator) {
    this.translationNotFoundIndicatorLeft(indicator);
    this.translationNotFoundIndicatorRight(indicator);
    return this;
  ***REMOVED***;

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found left to the
   * translation id.
   *
   * @param {string***REMOVED*** indicator An indicator.
   */
  this.translationNotFoundIndicatorLeft = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorLeft;
    ***REMOVED***
    $notFoundIndicatorLeft = indicator;
    return this;
  ***REMOVED***;

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found right to the
   * translation id.
   *
   * @param {string***REMOVED*** indicator An indicator.
   */
  this.translationNotFoundIndicatorRight = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorRight;
    ***REMOVED***
    $notFoundIndicatorRight = indicator;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#fallbackLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use when missing translations
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **fallback**.
   *
   * @param {string||array***REMOVED*** langKey A language key.
   *
   */
  this.fallbackLanguage = function (langKey) {
    fallbackStack(langKey);
    return this;
  ***REMOVED***;

  var fallbackStack = function (langKey) {
    if (langKey) {
      if (angular.isString(langKey)) {
        $fallbackWasString = true;
        $fallbackLanguage = [ langKey ];
***REMOVED*** else if (angular.isArray(langKey)) {
        $fallbackWasString = false;
        $fallbackLanguage = langKey;
***REMOVED***
      if (angular.isString($preferredLanguage)  && indexOf($fallbackLanguage, $preferredLanguage) < 0) {
        $fallbackLanguage.push($preferredLanguage);
***REMOVED***

      return this;
    ***REMOVED*** else {
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
***REMOVED*** else {
        return $fallbackLanguage;
***REMOVED***
    ***REMOVED***
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#use
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Set which translation table to use for translation by given language key. When
   * trying to 'use' a language which isn't provided, it'll throw an error.
   *
   * You actually don't have to use this method since `$translateProvider#preferredLanguage`
   * does the job too.
   *
   * @param {string***REMOVED*** langKey A language key.
   */
  this.use = function (langKey) {
    if (langKey) {
      if (!$translationTable[langKey] && (!$loaderFactory)) {
        // only throw an error, when not loading translation data asynchronously
        throw new Error("$translateProvider couldn't find translationTable for langKey: '" + langKey + "'");
***REMOVED***
      $uses = langKey;
      return this;
    ***REMOVED***
    return $uses;
  ***REMOVED***;

 /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storageKey
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which key must represent the choosed language by a user in the storage.
   *
   * @param {string***REMOVED*** key A key for the storage.
   */
  var storageKey = function(key) {
    if (!key) {
      if ($storagePrefix) {
        return $storagePrefix + $storageKey;
***REMOVED***
      return $storageKey;
    ***REMOVED***
    $storageKey = key;
  ***REMOVED***;

  this.storageKey = storageKey;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useUrlLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateUrlLoader` extension service as loader.
   *
   * @param {string***REMOVED*** url Url
   * @param {Object=***REMOVED*** options Optional configuration object
   */
  this.useUrlLoader = function (url, options) {
    return this.useLoader('$translateUrlLoader', angular.extend({ url: url ***REMOVED***, options));
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStaticFilesLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateStaticFilesLoader` extension service as loader.
   *
   * @param {Object=***REMOVED*** options Optional configuration object
   */
  this.useStaticFilesLoader = function (options) {
    return this.useLoader('$translateStaticFilesLoader', options);
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use any other service as loader.
   *
   * @param {string***REMOVED*** loaderFactory Factory name to use
   * @param {Object=***REMOVED*** options Optional configuration object
   */
  this.useLoader = function (loaderFactory, options) {
    $loaderFactory = loaderFactory;
    $loaderOptions = options || {***REMOVED***;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLocalStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateLocalStorage` service as storage layer.
   *
   */
  this.useLocalStorage = function () {
    return this.useStorage('$translateLocalStorage');
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useCookieStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateCookieStorage` service as storage layer.
   */
  this.useCookieStorage = function () {
    return this.useStorage('$translateCookieStorage');
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use custom service as storage layer.
   */
  this.useStorage = function (storageFactory) {
    $storageFactory = storageFactory;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storagePrefix
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets prefix for storage key.
   *
   * @param {string***REMOVED*** prefix Storage key prefix
   */
  this.storagePrefix = function (prefix) {
    if (!prefix) {
      return prefix;
    ***REMOVED***
    $storagePrefix = prefix;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandlerLog
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use built-in log handler when trying to translate
   * a translation Id which doesn't exist.
   *
   * This is actually a shortcut method for `useMissingTranslationHandler()`.
   *
   */
  this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler('$translateMissingTranslationHandlerLog');
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandler
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Expects a factory name which later gets instantiated with `$injector`.
   * This method can be used to tell angular-translate to use a custom
   * missingTranslationHandler. Just build a factory which returns a function
   * and expects a translation id as argument.
   *
   * Example:
   * <pre***REMOVED***
   *  app.config(function ($translateProvider) {
   *    $translateProvider.useMissingTranslationHandler('customHandler');
   *  ***REMOVED***);
   *
   *  app.factory('customHandler', function (dep1, dep2) {
   *    return function (translationId) {
   *      // something with translationId and dep1 and dep2
   *    ***REMOVED***;
   *  ***REMOVED***);
   * </pre***REMOVED***
   *
   * @param {string***REMOVED*** factory Factory name
   */
  this.useMissingTranslationHandler = function (factory) {
    $missingTranslationHandlerFactory = factory;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#usePostCompiling
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If post compiling is enabled, all translated values will be processed
   * again with AngularJS' $compile.
   *
   * Example:
   * <pre***REMOVED***
   *  app.config(function ($translateProvider) {
   *    $translateProvider.usePostCompiling(true);
   *  ***REMOVED***);
   * </pre***REMOVED***
   *
   * @param {string***REMOVED*** factory Factory name
   */
  this.usePostCompiling = function (value) {
    $postCompilingEnabled = !(!value);
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#determinePreferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to try to determine on its own which language key
   * to set as preferred language. When `fn` is given, angular-translate uses it
   * to determine a language key, otherwise it uses the built-in `getLocale()`
   * method.
   *
   * The `getLocale()` returns a language key in the format `[lang]_[country]` or
   * `[lang]` depending on what the browser provides.
   *
   * Use this method at your own risk, since not all browsers return a valid
   * locale.
   *
   * @param {object=***REMOVED*** fn Function to determine a browser's locale
   */
  this.determinePreferredLanguage = function (fn) {

    var locale = (fn && angular.isFunction(fn)) ? fn() : getLocale();

    if (!$availableLanguageKeys.length) {
      $preferredLanguage = locale;
    ***REMOVED*** else {
      $preferredLanguage = negotiateLocale(locale);
    ***REMOVED***

    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#registerAvailableLanguageKeys
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a set of language keys the app will work with. Use this method in
   * combination with
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage***REMOVED***.
   * When available languages keys are registered, angular-translate
   * tries to find the best fitting language key depending on the browsers locale,
   * considering your language key convention.
   *
   * @param {object***REMOVED*** languageKeys Array of language keys the your app will use
   * @param {object=***REMOVED*** aliases Alias map.
   */
  this.registerAvailableLanguageKeys = function (languageKeys, aliases) {
    if (languageKeys) {
      $availableLanguageKeys = languageKeys;
      if (aliases) {
        $languageKeyAliases = aliases;
***REMOVED***
      return this;
    ***REMOVED***
    return $availableLanguageKeys;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoaderCache
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a cache for internal $http based loaders.
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage***REMOVED***.
   * When false the cache will be disabled (default). When true or undefined
   * the cache will be a default (see $cacheFactory). When an object it will
   * be treat as a cache object itself: the usage is $http({cache: cache***REMOVED***)
   *
   * @param {object***REMOVED*** cache boolean, string or cache-object
   */
  this.useLoaderCache = function (cache) {
    if (cache === false) {
      // disable cache
      loaderCache = undefined;
    ***REMOVED*** else if (cache === true) {
      // enable cache using AJS defaults
      loaderCache = true;
    ***REMOVED*** else if (typeof(cache) === 'undefined') {
      // enable cache using default
      loaderCache = '$translationCache';
    ***REMOVED*** else if (cache) {
      // enable cache using given one (see $cacheFactory)
      loaderCache = cache;
    ***REMOVED***
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#directivePriority
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets the default priority of the translate directive. The standard value is `0`.
   * Calling this function without an argument will return the current value.
   *
   * @param {number***REMOVED*** priority for the translate-directive
   */
  this.directivePriority = function (priority) {
    if (priority === undefined) {
      // getter
      return directivePriority;
    ***REMOVED*** else {
      // setter with chaining
      directivePriority = priority;
      return this;
    ***REMOVED***
  ***REMOVED***;

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translate
   * @requires $interpolate
   * @requires $log
   * @requires $rootScope
   * @requires $q
   *
   * @description
   * The `$translate` service is the actual core of angular-translate. It expects a translation id
   * and optional interpolate parameters to translate contents.
   *
   * <pre***REMOVED***
   *  $translate('HEADLINE_TEXT').then(function (translation) {
   *    $scope.translatedText = translation;
   *  ***REMOVED***);
   * </pre***REMOVED***
   *
   * @param {string|array***REMOVED*** translationId A token which represents a translation id
   *                                     This can be optionally an array of translation ids which
   *                                     results that the function returns an object where each key
   *                                     is the translation id and the value the translation.
   * @param {object=***REMOVED*** interpolateParams An object hash for dynamic values
   * @param {string***REMOVED*** interpolationId The id of the interpolation to use
   * @returns {object***REMOVED*** promise
   */
  this.$get = [
    '$log',
    '$injector',
    '$rootScope',
    '$q',
    function ($log, $injector, $rootScope, $q) {

      var Storage,
          defaultInterpolator = $injector.get($interpolationFactory || '$translateDefaultInterpolation'),
          pendingLoader = false,
          interpolatorHashMap = {***REMOVED***,
          langPromises = {***REMOVED***,
          fallbackIndex,
          startFallbackIteration;

      var $translate = function (translationId, interpolateParams, interpolationId, defaultTranslationText) {

        // Duck detection: If the first argument is an array, a bunch of translations was requested.
        // The result is an object.
        if (angular.isArray(translationId)) {
          // Inspired by Q.allSettled by Kris Kowal
          // https://github.com/kriskowal/q/blob/b0fa72980717dc202ffc3cbf03b936e10ebbb9d7/q.js#L1553-1563
          // This transforms all promises regardless resolved or rejected
          var translateAll = function (translationIds) {
            var results = {***REMOVED***; // storing the actual results
            var promises = []; // promises to wait for
            // Wraps the promise a) being always resolved and b) storing the link id-***REMOVED***value
            var translate = function (translationId) {
              var deferred = $q.defer();
              var regardless = function (value) {
                results[translationId] = value;
                deferred.resolve([translationId, value]);
        ***REMOVED***;
              // we don't care whether the promise was resolved or rejected; just store the values
              $translate(translationId, interpolateParams, interpolationId, defaultTranslationText).then(regardless, regardless);
              return deferred.promise;
      ***REMOVED***;
            for (var i = 0, c = translationIds.length; i < c; i++) {
              promises.push(translate(translationIds[i]));
      ***REMOVED***
            // wait for all (including storing to results)
            return $q.all(promises).then(function () {
              // return the results
              return results;
      ***REMOVED***);
    ***REMOVED***;
          return translateAll(translationId);
  ***REMOVED***

        var deferred = $q.defer();

        // trim off any whitespace
        if (translationId) {
          translationId = trim.apply(translationId);
  ***REMOVED***

        var promiseToWaitFor = (function () {
          var promise = $preferredLanguage ?
            langPromises[$preferredLanguage] :
            langPromises[$uses];

          fallbackIndex = 0;

          if ($storageFactory && !promise) {
            // looks like there's no pending promise for $preferredLanguage or
            // $uses. Maybe there's one pending for a language that comes from
            // storage.
            var langKey = Storage.get($storageKey);
            promise = langPromises[langKey];

            if ($fallbackLanguage && $fallbackLanguage.length) {
                var index = indexOf($fallbackLanguage, langKey);
                // maybe the language from storage is also defined as fallback language
                // we increase the fallback language index to not search in that language
                // as fallback, since it's probably the first used language
                // in that case the index starts after the first element
                fallbackIndex = (index === 0) ? 1 : 0;

                // but we can make sure to ALWAYS fallback to preferred language at least
                if (indexOf($fallbackLanguage, $preferredLanguage) < 0) {
                  $fallbackLanguage.push($preferredLanguage);
          ***REMOVED***
      ***REMOVED***
    ***REMOVED***
          return promise;
  ***REMOVED***());

        if (!promiseToWaitFor) {
          // no promise to wait for? okay. Then there's no loader registered
          // nor is a one pending for language that comes from storage.
          // We can just translate.
          determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText).then(deferred.resolve, deferred.reject);
  ***REMOVED*** else {
          promiseToWaitFor.then(function () {
            determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText).then(deferred.resolve, deferred.reject);
    ***REMOVED***, deferred.reject);
  ***REMOVED***
        return deferred.promise;
***REMOVED***;

      /**
       * @name applyNotFoundIndicators
       * @private
       *
       * @description
       * Applies not fount indicators to given translation id, if needed.
       * This function gets only executed, if a translation id doesn't exist,
       * which is why a translation id is expected as argument.
       *
       * @param {string***REMOVED*** translationId Translation id.
       * @returns {string***REMOVED*** Same as given translation id but applied with not found
       * indicators.
       */
      var applyNotFoundIndicators = function (translationId) {
        // applying notFoundIndicators
        if ($notFoundIndicatorLeft) {
          translationId = [$notFoundIndicatorLeft, translationId].join(' ');
  ***REMOVED***
        if ($notFoundIndicatorRight) {
          translationId = [translationId, $notFoundIndicatorRight].join(' ');
  ***REMOVED***
        return translationId;
***REMOVED***;

      /**
       * @name useLanguage
       * @private
       *
       * @description
       * Makes actual use of a language by setting a given language key as used
       * language and informs registered interpolators to also use the given
       * key as locale.
       *
       * @param {key***REMOVED*** Locale key.
       */
      var useLanguage = function (key) {
        $uses = key;
        $rootScope.$emit('$translateChangeSuccess', {language: key***REMOVED***);

        if ($storageFactory) {
          Storage.put($translate.storageKey(), $uses);
  ***REMOVED***
        // inform default interpolator
        defaultInterpolator.setLocale($uses);
        // inform all others too!
        angular.forEach(interpolatorHashMap, function (interpolator, id) {
          interpolatorHashMap[id].setLocale($uses);
  ***REMOVED***);
        $rootScope.$emit('$translateChangeEnd', {language: key***REMOVED***);
***REMOVED***;

      /**
       * @name loadAsync
       * @private
       *
       * @description
       * Kicks of registered async loader using `$injector` and applies existing
       * loader options. When resolved, it updates translation tables accordingly
       * or rejects with given language key.
       *
       * @param {string***REMOVED*** key Language key.
       * @return {Promise***REMOVED*** A promise.
       */
      var loadAsync = function (key) {
        if (!key) {
          throw 'No language key specified for loading.';
  ***REMOVED***

        var deferred = $q.defer();

        $rootScope.$emit('$translateLoadingStart', {language: key***REMOVED***);
        pendingLoader = true;

        var cache = loaderCache;
        if (typeof(cache) === 'string') {
          // getting on-demand instance of loader
          cache = $injector.get(cache);
  ***REMOVED***

        var loaderOptions = angular.extend({***REMOVED***, $loaderOptions, {
          key: key,
          $http: angular.extend({***REMOVED***, {
            cache: cache
    ***REMOVED***, $loaderOptions.$http)
  ***REMOVED***);

        $injector.get($loaderFactory)(loaderOptions).then(function (data) {
          var translationTable = {***REMOVED***;
          $rootScope.$emit('$translateLoadingSuccess', {language: key***REMOVED***);

          if (angular.isArray(data)) {
            angular.forEach(data, function (table) {
              angular.extend(translationTable, flatObject(table));
      ***REMOVED***);
    ***REMOVED*** else {
            angular.extend(translationTable, flatObject(data));
    ***REMOVED***
          pendingLoader = false;
          deferred.resolve({
            key: key,
            table: translationTable
    ***REMOVED***);
          $rootScope.$emit('$translateLoadingEnd', {language: key***REMOVED***);
  ***REMOVED***, function (key) {
          $rootScope.$emit('$translateLoadingError', {language: key***REMOVED***);
          deferred.reject(key);
          $rootScope.$emit('$translateLoadingEnd', {language: key***REMOVED***);
  ***REMOVED***);
        return deferred.promise;
***REMOVED***;

      if ($storageFactory) {
        Storage = $injector.get($storageFactory);

        if (!Storage.get || !Storage.put) {
          throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or put() method!');
  ***REMOVED***
***REMOVED***

      // apply additional settings
      if (angular.isFunction(defaultInterpolator.useSanitizeValueStrategy)) {
        defaultInterpolator.useSanitizeValueStrategy($interpolationSanitizationStrategy);
***REMOVED***

      // if we have additional interpolations that were added via
      // $translateProvider.addInterpolation(), we have to map'em
      if ($interpolatorFactories.length) {
        angular.forEach($interpolatorFactories, function (interpolatorFactory) {
          var interpolator = $injector.get(interpolatorFactory);
          // setting initial locale for each interpolation service
          interpolator.setLocale($preferredLanguage || $uses);
          // apply additional settings
          if (angular.isFunction(interpolator.useSanitizeValueStrategy)) {
            interpolator.useSanitizeValueStrategy($interpolationSanitizationStrategy);
    ***REMOVED***
          // make'em recognizable through id
          interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
  ***REMOVED***);
***REMOVED***

      /**
       * @name getTranslationTable
       * @private
       *
       * @description
       * Returns a promise that resolves to the translation table
       * or is rejected if an error occurred.
       *
       * @param langKey
       * @returns {Q.promise***REMOVED***
       */
      var getTranslationTable = function (langKey) {
        var deferred = $q.defer();
        if (Object.prototype.hasOwnProperty.call($translationTable, langKey)) {
          deferred.resolve($translationTable[langKey]);
  ***REMOVED*** else if (langPromises[langKey]) {
          langPromises[langKey].then(function (data) {
            translations(data.key, data.table);
            deferred.resolve(data.table);
    ***REMOVED***, deferred.reject);
  ***REMOVED*** else {
          deferred.reject();
  ***REMOVED***
        return deferred.promise;
***REMOVED***;

      /**
       * @name getFallbackTranslation
       * @private
       *
       * @description
       * Returns a promise that will resolve to the translation
       * or be rejected if no translation was found for the language.
       * This function is currently only used for fallback language translation.
       *
       * @param langKey The language to translate to.
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise***REMOVED***
       */
      var getFallbackTranslation = function (langKey, translationId, interpolateParams, Interpolator) {
        var deferred = $q.defer();

        getTranslationTable(langKey).then(function (translationTable) {
          if (Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
            Interpolator.setLocale(langKey);
            var translation = translationTable[translationId];
            if (translation.substr(0, 2) === '@:') {
              getFallbackTranslation(langKey, translation.substr(2), interpolateParams, Interpolator)
                .then(deferred.resolve, deferred.reject);
      ***REMOVED*** else {
              deferred.resolve(Interpolator.interpolate(translationTable[translationId], interpolateParams));
      ***REMOVED***
            Interpolator.setLocale($uses);
    ***REMOVED*** else {
            deferred.reject();
    ***REMOVED***
  ***REMOVED***, deferred.reject);

        return deferred.promise;
***REMOVED***;

      /**
       * @name getFallbackTranslationInstant
       * @private
       *
       * @description
       * Returns a translation
       * This function is currently only used for fallback language translation.
       *
       * @param langKey The language to translate to.
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {string***REMOVED*** translation
       */
      var getFallbackTranslationInstant = function (langKey, translationId, interpolateParams, Interpolator) {
        var result, translationTable = $translationTable[langKey];

        if (translationTable && Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
          Interpolator.setLocale(langKey);
          result = Interpolator.interpolate(translationTable[translationId], interpolateParams);
          if (result.substr(0, 2) === '@:') {
            return getFallbackTranslationInstant(langKey, result.substr(2), interpolateParams, Interpolator);
    ***REMOVED***
          Interpolator.setLocale($uses);
  ***REMOVED***

        return result;
***REMOVED***;


      /**
       * @name translateByHandler
       * @private
       *
       * Translate by missing translation handler.
       *
       * @param translationId
       * @returns translation created by $missingTranslationHandler or translationId is $missingTranslationHandler is
       * absent
       */
      var translateByHandler = function (translationId) {
        // If we have a handler factory - we might also call it here to determine if it provides
        // a default text for a translationid that can't be found anywhere in our tables
        if ($missingTranslationHandlerFactory) {
          var resultString = $injector.get($missingTranslationHandlerFactory)(translationId, $uses);
          if (resultString !== undefined) {
            return resultString;
    ***REMOVED*** else {
            return translationId;
    ***REMOVED***
  ***REMOVED*** else {
          return translationId;
  ***REMOVED***
***REMOVED***;

      /**
       * @name resolveForFallbackLanguage
       * @private
       *
       * Recursive helper function for fallbackTranslation that will sequentially look
       * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
       *
       * @param fallbackLanguageIndex
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise***REMOVED*** Promise that will resolve to the translation.
       */
      var resolveForFallbackLanguage = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, defaultTranslationText) {
        var deferred = $q.defer();

        if (fallbackLanguageIndex < $fallbackLanguage.length) {
          var langKey = $fallbackLanguage[fallbackLanguageIndex];
          getFallbackTranslation(langKey, translationId, interpolateParams, Interpolator).then(
            deferred.resolve,
            function () {
              // Look in the next fallback language for a translation.
              // It delays the resolving by passing another promise to resolve.
              resolveForFallbackLanguage(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator, defaultTranslationText).then(deferred.resolve);
      ***REMOVED***
          );
  ***REMOVED*** else {
          // No translation found in any fallback language
          // if a default translation text is set in the directive, then return this as a result
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
    ***REMOVED*** else {
            // if no default translation is set and an error handler is defined, send it to the handler
            // and then return the result
            deferred.resolve(translateByHandler(translationId));
    ***REMOVED***
  ***REMOVED***
        return deferred.promise;
***REMOVED***;

      /**
       * @name resolveForFallbackLanguageInstant
       * @private
       *
       * Recursive helper function for fallbackTranslation that will sequentially look
       * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
       *
       * @param fallbackLanguageIndex
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {string***REMOVED*** translation
       */
      var resolveForFallbackLanguageInstant = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator) {
        var result;

        if (fallbackLanguageIndex < $fallbackLanguage.length) {
          var langKey = $fallbackLanguage[fallbackLanguageIndex];
          result = getFallbackTranslationInstant(langKey, translationId, interpolateParams, Interpolator);
          if (!result) {
            result = resolveForFallbackLanguageInstant(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator);
    ***REMOVED***
  ***REMOVED***
        return result;
***REMOVED***;

      /**
       * Translates with the usage of the fallback languages.
       *
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise***REMOVED*** Promise, that resolves to the translation.
       */
      var fallbackTranslation = function (translationId, interpolateParams, Interpolator, defaultTranslationText) {
        // Start with the fallbackLanguage with index 0
        return resolveForFallbackLanguage((startFallbackIteration***REMOVED***0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, defaultTranslationText);
***REMOVED***;

      /**
       * Translates with the usage of the fallback languages.
       *
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {String***REMOVED*** translation
       */
      var fallbackTranslationInstant = function (translationId, interpolateParams, Interpolator) {
        // Start with the fallbackLanguage with index 0
        return resolveForFallbackLanguageInstant((startFallbackIteration***REMOVED***0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator);
***REMOVED***;

      var determineTranslation = function (translationId, interpolateParams, interpolationId, defaultTranslationText) {

        var deferred = $q.defer();

        var table = $uses ? $translationTable[$uses] : $translationTable,
            Interpolator = (interpolationId) ? interpolatorHashMap[interpolationId] : defaultInterpolator;

        // if the translation id exists, we can just interpolate it
        if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
          var translation = table[translationId];

          // If using link, rerun $translate with linked translationId and return it
          if (translation.substr(0, 2) === '@:') {

            $translate(translation.substr(2), interpolateParams, interpolationId, defaultTranslationText)
              .then(deferred.resolve, deferred.reject);
    ***REMOVED*** else {
            deferred.resolve(Interpolator.interpolate(translation, interpolateParams));
    ***REMOVED***
  ***REMOVED*** else {
          var missingTranslationHandlerTranslation;
          // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId);
    ***REMOVED***

          // since we couldn't translate the inital requested translation id,
          // we try it now with one or more fallback languages, if fallback language(s) is
          // configured.
          if ($uses && $fallbackLanguage && $fallbackLanguage.length) {
            fallbackTranslation(translationId, interpolateParams, Interpolator, defaultTranslationText)
                .then(function (translation) {
                  deferred.resolve(translation);
          ***REMOVED***, function (_translationId) {
                  deferred.reject(applyNotFoundIndicators(_translationId));
          ***REMOVED***);
    ***REMOVED*** else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            // looks like the requested translation id doesn't exists.
            // Now, if there is a registered handler for missing translations and no
            // asyncLoader is pending, we execute the handler
            if (defaultTranslationText) {
              deferred.resolve(defaultTranslationText);
        ***REMOVED*** else {
                deferred.resolve(missingTranslationHandlerTranslation);
        ***REMOVED***
    ***REMOVED*** else {
            if (defaultTranslationText) {
              deferred.resolve(defaultTranslationText);
      ***REMOVED*** else {
              deferred.reject(applyNotFoundIndicators(translationId));
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
        return deferred.promise;
***REMOVED***;

      var determineTranslationInstant = function (translationId, interpolateParams, interpolationId) {

        var result, table = $uses ? $translationTable[$uses] : $translationTable,
            Interpolator = defaultInterpolator;

        // if the interpolation id exists use custom interpolator
        if (interpolatorHashMap && Object.prototype.hasOwnProperty.call(interpolatorHashMap, interpolationId)) {
          Interpolator = interpolatorHashMap[interpolationId];
  ***REMOVED***

        // if the translation id exists, we can just interpolate it
        if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
          var translation = table[translationId];

          // If using link, rerun $translate with linked translationId and return it
          if (translation.substr(0, 2) === '@:') {
            result = determineTranslationInstant(translation.substr(2), interpolateParams, interpolationId);
    ***REMOVED*** else {
            result = Interpolator.interpolate(translation, interpolateParams);
    ***REMOVED***
  ***REMOVED*** else {
          var missingTranslationHandlerTranslation;
          // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId);
    ***REMOVED***

          // since we couldn't translate the inital requested translation id,
          // we try it now with one or more fallback languages, if fallback language(s) is
          // configured.
          if ($uses && $fallbackLanguage && $fallbackLanguage.length) {
            fallbackIndex = 0;
            result = fallbackTranslationInstant(translationId, interpolateParams, Interpolator);
    ***REMOVED*** else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            // looks like the requested translation id doesn't exists.
            // Now, if there is a registered handler for missing translations and no
            // asyncLoader is pending, we execute the handler
            result = missingTranslationHandlerTranslation;
    ***REMOVED*** else {
            result = applyNotFoundIndicators(translationId);
    ***REMOVED***
  ***REMOVED***

        return result;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#preferredLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the preferred language.
       *
       * @param {string***REMOVED*** langKey language String or Array to be used as preferredLanguage (changing at runtime)
       *
       * @return {string***REMOVED*** preferred language key
       */
      $translate.preferredLanguage = function (langKey) {
        if(langKey) {
          setupPreferredLanguage(langKey);
  ***REMOVED***
        return $preferredLanguage;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#cloakClassName
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the configured class name for `translate-cloak` directive.
       *
       * @return {string***REMOVED*** cloakClassName
       */
      $translate.cloakClassName = function () {
        return $cloakClassName;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#fallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the fallback languages or sets a new fallback stack.
       *
       * @param {string=***REMOVED*** langKey language String or Array of fallback languages to be used (to change stack at runtime)
       *
       * @return {string||array***REMOVED*** fallback language key
       */
      $translate.fallbackLanguage = function (langKey) {
        if (langKey !== undefined && langKey !== null) {
          fallbackStack(langKey);

          // as we might have an async loader initiated and a new translation language might have been defined
          // we need to add the promise to the stack also. So - iterate.
          if ($loaderFactory) {
            if ($fallbackLanguage && $fallbackLanguage.length) {
              for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
                if (!langPromises[$fallbackLanguage[i]]) {
                  langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
          $translate.use($translate.use());
  ***REMOVED***
        if ($fallbackWasString) {
          return $fallbackLanguage[0];
  ***REMOVED*** else {
          return $fallbackLanguage;
  ***REMOVED***

***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#useFallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Sets the first key of the fallback language stack to be used for translation.
       * Therefore all languages in the fallback array BEFORE this key will be skipped!
       *
       * @param {string=***REMOVED*** langKey Contains the langKey the iteration shall start with. Set to false if you want to
       * get back to the whole stack
       */
      $translate.useFallbackLanguage = function (langKey) {
        if (langKey !== undefined && langKey !== null) {
          if (!langKey) {
            startFallbackIteration = 0;
    ***REMOVED*** else {
            var langKeyPosition = indexOf($fallbackLanguage, langKey);
            if (langKeyPosition ***REMOVED*** -1) {
              startFallbackIteration = langKeyPosition;
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***

***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#proposedLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key of language that is currently loaded asynchronously.
       *
       * @return {string***REMOVED*** language key
       */
      $translate.proposedLanguage = function () {
        return $nextLang;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns registered storage.
       *
       * @return {object***REMOVED*** Storage
       */
      $translate.storage = function () {
        return Storage;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#use
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Tells angular-translate which language to use by given language key. This method is
       * used to change language at runtime. It also takes care of storing the language
       * key in a configured store to let your app remember the choosed language.
       *
       * When trying to 'use' a language which isn't available it tries to load it
       * asynchronously with registered loaders.
       *
       * Returns promise object with loaded language file data
       * @example
       * $translate.use("en_US").then(function(data){
       *   $scope.text = $translate("HELLO");
       * ***REMOVED***);
       *
       * @param {string***REMOVED*** key Language key
       * @return {string***REMOVED*** Language key
       */
      $translate.use = function (key) {
        if (!key) {
          return $uses;
  ***REMOVED***

        var deferred = $q.defer();

        $rootScope.$emit('$translateChangeStart', {language: key***REMOVED***);

        // Try to get the aliased language key
        var aliasedKey = negotiateLocale(key);
        if (aliasedKey) {
          key = aliasedKey;
  ***REMOVED***

        // if there isn't a translation table for the language we've requested,
        // we load it asynchronously
        if (!$translationTable[key] && $loaderFactory && !langPromises[key]) {
          $nextLang = key;
          langPromises[key] = loadAsync(key).then(function (translation) {
            translations(translation.key, translation.table);
            deferred.resolve(translation.key);

            useLanguage(translation.key);
            if ($nextLang === key) {
              $nextLang = undefined;
      ***REMOVED***
            return translation;
    ***REMOVED***, function (key) {
            if ($nextLang === key) {
              $nextLang = undefined;
      ***REMOVED***
            $rootScope.$emit('$translateChangeError', {language: key***REMOVED***);
            deferred.reject(key);
            $rootScope.$emit('$translateChangeEnd', {language: key***REMOVED***);
    ***REMOVED***);
  ***REMOVED*** else {
          deferred.resolve(key);
          useLanguage(key);
  ***REMOVED***

        return deferred.promise;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storageKey
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the key for the storage.
       *
       * @return {string***REMOVED*** storage key
       */
      $translate.storageKey = function () {
        return storageKey();
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isPostCompilingEnabled
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether post compiling is enabled or not
       *
       * @return {bool***REMOVED*** storage key
       */
      $translate.isPostCompilingEnabled = function () {
        return $postCompilingEnabled;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#refresh
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Refreshes a translation table pointed by the given langKey. If langKey is not specified,
       * the module will drop all existent translation tables and load new version of those which
       * are currently in use.
       *
       * Refresh means that the module will drop target translation table and try to load it again.
       *
       * In case there are no loaders registered the refresh() method will throw an Error.
       *
       * If the module is able to refresh translation tables refresh() method will broadcast
       * $translateRefreshStart and $translateRefreshEnd events.
       *
       * @example
       * // this will drop all currently existent translation tables and reload those which are
       * // currently in use
       * $translate.refresh();
       * // this will refresh a translation table for the en_US language
       * $translate.refresh('en_US');
       *
       * @param {string***REMOVED*** langKey A language key of the table, which has to be refreshed
       *
       * @return {promise***REMOVED*** Promise, which will be resolved in case a translation tables refreshing
       * process is finished successfully, and reject if not.
       */
      $translate.refresh = function (langKey) {
        if (!$loaderFactory) {
          throw new Error('Couldn\'t refresh translation table, no loader registered!');
  ***REMOVED***

        var deferred = $q.defer();

        function resolve() {
          deferred.resolve();
          $rootScope.$emit('$translateRefreshEnd', {language: langKey***REMOVED***);
  ***REMOVED***

        function reject() {
          deferred.reject();
          $rootScope.$emit('$translateRefreshEnd', {language: langKey***REMOVED***);
  ***REMOVED***

        $rootScope.$emit('$translateRefreshStart', {language: langKey***REMOVED***);

        if (!langKey) {
          // if there's no language key specified we refresh ALL THE THINGS!
          var tables = [], loadingKeys = {***REMOVED***;

          // reload registered fallback languages
          if ($fallbackLanguage && $fallbackLanguage.length) {
            for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
              tables.push(loadAsync($fallbackLanguage[i]));
              loadingKeys[$fallbackLanguage[i]] = true;
      ***REMOVED***
    ***REMOVED***

          // reload currently used language
          if ($uses && !loadingKeys[$uses]) {
            tables.push(loadAsync($uses));
    ***REMOVED***

          $q.all(tables).then(function (tableData) {
            angular.forEach(tableData, function (data) {
              if ($translationTable[data.key]) {
                delete $translationTable[data.key];
        ***REMOVED***
              translations(data.key, data.table);
      ***REMOVED***);
            if ($uses) {
              useLanguage($uses);
      ***REMOVED***
            resolve();
    ***REMOVED***);

  ***REMOVED*** else if ($translationTable[langKey]) {

          loadAsync(langKey).then(function (data) {
            translations(data.key, data.table);
            if (langKey === $uses) {
              useLanguage($uses);
      ***REMOVED***
            resolve();
    ***REMOVED***, reject);

  ***REMOVED*** else {
          reject();
  ***REMOVED***
        return deferred.promise;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#instant
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns a translation instantly from the internal state of loaded translation. All rules
       * regarding the current language, the preferred language of even fallback languages will be
       * used except any promise handling. If a language was not found, an asynchronous loading
       * will be invoked in the background.
       *
       * @param {string|array***REMOVED*** translationId A token which represents a translation id
       *                                     This can be optionally an array of translation ids which
       *                                     results that the function's promise returns an object where
       *                                     each key is the translation id and the value the translation.
       * @param {object***REMOVED*** interpolateParams Params
       * @param {string***REMOVED*** interpolationId The id of the interpolation to use
       *
       * @return {string***REMOVED*** translation
       */
      $translate.instant = function (translationId, interpolateParams, interpolationId) {

        // Detect undefined and null values to shorten the execution and prevent exceptions
        if (translationId === null || angular.isUndefined(translationId)) {
          return translationId;
  ***REMOVED***

        // Duck detection: If the first argument is an array, a bunch of translations was requested.
        // The result is an object.
        if (angular.isArray(translationId)) {
          var results = {***REMOVED***;
          for (var i = 0, c = translationId.length; i < c; i++) {
            results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId);
    ***REMOVED***
          return results;
  ***REMOVED***

        // We discarded unacceptable values. So we just need to verify if translationId is empty String
        if (angular.isString(translationId) && translationId.length < 1) {
          return translationId;
  ***REMOVED***

        // trim off any whitespace
        if (translationId) {
          translationId = trim.apply(translationId);
  ***REMOVED***

        var result, possibleLangKeys = [];
        if ($preferredLanguage) {
          possibleLangKeys.push($preferredLanguage);
  ***REMOVED***
        if ($uses) {
          possibleLangKeys.push($uses);
  ***REMOVED***
        if ($fallbackLanguage && $fallbackLanguage.length) {
          possibleLangKeys = possibleLangKeys.concat($fallbackLanguage);
  ***REMOVED***
        for (var j = 0, d = possibleLangKeys.length; j < d; j++) {
          var possibleLangKey = possibleLangKeys[j];
          if ($translationTable[possibleLangKey]) {
            if (typeof $translationTable[possibleLangKey][translationId] !== 'undefined') {
              result = determineTranslationInstant(translationId, interpolateParams, interpolationId);
      ***REMOVED*** else if ($notFoundIndicatorLeft || $notFoundIndicatorRight) {
              result = applyNotFoundIndicators(translationId);
      ***REMOVED***
    ***REMOVED***
          if (typeof result !== 'undefined') {
            break;
    ***REMOVED***
  ***REMOVED***

        if (!result && result !== '') {
          // Return translation of default interpolator if not found anything.
          result = defaultInterpolator.interpolate(translationId, interpolateParams);
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            result = translateByHandler(translationId);
    ***REMOVED***
  ***REMOVED***

        return result;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#versionInfo
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the current version information for the angular-translate library
       *
       * @return {string***REMOVED*** angular-translate version
       */
      $translate.versionInfo = function () {
        return version;
***REMOVED***;

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#loaderCache
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the defined loaderCache.
       *
       * @return {boolean|string|object***REMOVED*** current value of loaderCache
       */
      $translate.loaderCache = function () {
        return loaderCache;
***REMOVED***;

      // internal purpose only
      $translate.directivePriority = function () {
        return directivePriority;
***REMOVED***;

      if ($loaderFactory) {

        // If at least one async loader is defined and there are no
        // (default) translations available we should try to load them.
        if (angular.equals($translationTable, {***REMOVED***)) {
          $translate.use($translate.use());
  ***REMOVED***

        // Also, if there are any fallback language registered, we start
        // loading them asynchronously as soon as we can.
        if ($fallbackLanguage && $fallbackLanguage.length) {
          var processAsyncResult = function (translation) {
            translations(translation.key, translation.table);
            $rootScope.$emit('$translateChangeEnd', { language: translation.key ***REMOVED***);
            return translation;
    ***REMOVED***;
          for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
            langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]).then(processAsyncResult);
    ***REMOVED***
  ***REMOVED***
***REMOVED***

      return $translate;
    ***REMOVED***
  ];
***REMOVED***]);

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateDefaultInterpolation
 * @requires $interpolate
 *
 * @description
 * Uses angular's `$interpolate` services to interpolate strings against some values.
 *
 * @return {object***REMOVED*** $translateInterpolator Interpolator service
 */
angular.module('pascalprecht.translate').factory('$translateDefaultInterpolation', ['$interpolate', function ($interpolate) {

  var $translateInterpolator = {***REMOVED***,
      $locale,
      $identifier = 'default',
      $sanitizeValueStrategy = null,
      // map of all sanitize strategies
      sanitizeValueStrategies = {
        escaped: function (params) {
          var result = {***REMOVED***;
          for (var key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
              if (angular.isNumber(params[key])) {
                result[key] = params[key];
        ***REMOVED*** else {
                result[key] = angular.element('<div***REMOVED***</div***REMOVED***').text(params[key]).html();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
          return result;
  ***REMOVED***
***REMOVED***;

  var sanitizeParams = function (params) {
    var result;
    if (angular.isFunction(sanitizeValueStrategies[$sanitizeValueStrategy])) {
      result = sanitizeValueStrategies[$sanitizeValueStrategy](params);
    ***REMOVED*** else {
      result = params;
    ***REMOVED***
    return result;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string***REMOVED*** locale Language key or locale.
   */
  $translateInterpolator.setLocale = function (locale) {
    $locale = locale;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string***REMOVED*** $identifier
   */
  $translateInterpolator.getInterpolationIdentifier = function () {
    return $identifier;
  ***REMOVED***;

  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $sanitizeValueStrategy = value;
    return this;
  ***REMOVED***;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Interpolates given string agains given interpolate params using angulars
   * `$interpolate` service.
   *
   * @returns {string***REMOVED*** interpolated string.
   */
  $translateInterpolator.interpolate = function (string, interpolateParams) {
    if ($sanitizeValueStrategy) {
      interpolateParams = sanitizeParams(interpolateParams);
    ***REMOVED***
    return $interpolate(string)(interpolateParams || {***REMOVED***);
  ***REMOVED***;

  return $translateInterpolator;
***REMOVED***]);

angular.module('pascalprecht.translate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate
 * @requires $compile
 * @requires $filter
 * @requires $interpolate
 * @restrict A
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses `translate` filter to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=***REMOVED*** translate Translation id which could be either string or interpolated string.
 * @param {string=***REMOVED*** translate-values Values to pass into translation id. Can be passed as object literal string or interpolated object.
 * @param {string=***REMOVED*** translate-attr-ATTR translate Translation id and put it into ATTR attribute.
 * @param {string=***REMOVED*** translate-default will be used unless translation was successful
 * @param {boolean=***REMOVED*** translate-compile (default true if present) defines locally activation of {@link pascalprecht.translate.$translate#usePostCompiling***REMOVED***
 *
 * @example
   <example module="ngView"***REMOVED***
    <file name="index.html"***REMOVED***
      <div ng-controller="TranslateCtrl"***REMOVED***

        <pre translate="TRANSLATION_ID"***REMOVED***</pre***REMOVED***
        <pre translate***REMOVED***TRANSLATION_ID</pre***REMOVED***
        <pre translate translate-attr-title="TRANSLATION_ID"***REMOVED***</pre***REMOVED***
        <pre translate="{{translationId***REMOVED******REMOVED***"***REMOVED***</pre***REMOVED***
        <pre translate***REMOVED***{{translationId***REMOVED******REMOVED***</pre***REMOVED***
        <pre translate="WITH_VALUES" translate-values="{value: 5***REMOVED***"***REMOVED***</pre***REMOVED***
        <pre translate translate-values="{value: 5***REMOVED***"***REMOVED***WITH_VALUES</pre***REMOVED***
        <pre translate="WITH_VALUES" translate-values="{{values***REMOVED******REMOVED***"***REMOVED***</pre***REMOVED***
        <pre translate translate-values="{{values***REMOVED******REMOVED***"***REMOVED***WITH_VALUES</pre***REMOVED***
        <pre translate translate-attr-title="WITH_VALUES" translate-values="{{values***REMOVED******REMOVED***"***REMOVED***</pre***REMOVED***

      </div***REMOVED***
    </file***REMOVED***
    <file name="script.js"***REMOVED***
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value***REMOVED******REMOVED***'
  ***REMOVED***).preferredLanguage('en');

***REMOVED***);

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
  ***REMOVED***;
***REMOVED***);
    </file***REMOVED***
    <file name="scenario.js"***REMOVED***
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<p translate="TRANSLATION_ID"***REMOVED***</p***REMOVED***')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate="{{translationId***REMOVED******REMOVED***"***REMOVED***</p***REMOVED***')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate***REMOVED***TRANSLATION_ID</p***REMOVED***')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate***REMOVED***{{translationId***REMOVED******REMOVED***</p***REMOVED***')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate translate-attr-title="TRANSLATION_ID"***REMOVED***</p***REMOVED***')($rootScope);
          $rootScope.$digest();
          expect(element.attr('title')).toBe('Hello there!');
  ***REMOVED***);
***REMOVED***);
    </file***REMOVED***
   </example***REMOVED***
 */
.directive('translate', ['$translate', '$q', '$interpolate', '$compile', '$parse', '$rootScope', function ($translate, $q, $interpolate, $compile, $parse, $rootScope) {

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string***REMOVED*** The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  ***REMOVED***;

  return {
    restrict: 'AE',
    scope: true,
    priority: $translate.directivePriority(),
    compile: function (tElement, tAttr) {

      var translateValuesExist = (tAttr.translateValues) ?
        tAttr.translateValues : undefined;

      var translateInterpolation = (tAttr.translateInterpolation) ?
        tAttr.translateInterpolation : undefined;

      var translateValueExist = tElement[0].outerHTML.match(/translate-value-+/i);

      var interpolateRegExp = '^(.*)(' + $interpolate.startSymbol() + '.*' + $interpolate.endSymbol() + ')(.*)',
          watcherRegExp = '^(.*)' + $interpolate.startSymbol() + '(.*)' + $interpolate.endSymbol() + '(.*)';

      return function linkFn(scope, iElement, iAttr) {

        scope.interpolateParams = {***REMOVED***;
        scope.preText = '';
        scope.postText = '';
        var translationIds = {***REMOVED***;

        // Ensures any change of the attribute "translate" containing the id will
        // be re-stored to the scope's "translationId".
        // If the attribute has no content, the element's text value (white spaces trimmed off) will be used.
        var observeElementTranslation = function (translationId) {

          // Remove any old watcher
          if (angular.isFunction(observeElementTranslation._unwatchOld)) {
            observeElementTranslation._unwatchOld();
            observeElementTranslation._unwatchOld = undefined;
    ***REMOVED***

          if (angular.equals(translationId , '') || !angular.isDefined(translationId)) {
            // Resolve translation id by inner html if required
            var interpolateMatches = trim.apply(iElement.text()).match(interpolateRegExp);
            // Interpolate translation id if required
            if (angular.isArray(interpolateMatches)) {
              scope.preText = interpolateMatches[1];
              scope.postText = interpolateMatches[3];
              translationIds.translate = $interpolate(interpolateMatches[2])(scope.$parent);
              var watcherMatches = iElement.text().match(watcherRegExp);
              if (angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length) {
                observeElementTranslation._unwatchOld = scope.$watch(watcherMatches[2], function (newValue) {
                  translationIds.translate = newValue;
                  updateTranslations();
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED*** else {
              translationIds.translate = iElement.text().replace(/^\s+|\s+$/g,'');
      ***REMOVED***
    ***REMOVED*** else {
            translationIds.translate = translationId;
    ***REMOVED***
          updateTranslations();
  ***REMOVED***;

        var observeAttributeTranslation = function (translateAttr) {
          iAttr.$observe(translateAttr, function (translationId) {
            translationIds[translateAttr] = translationId;
            updateTranslations();
    ***REMOVED***);
  ***REMOVED***;

        var firstAttributeChangedEvent = true;
        iAttr.$observe('translate', function (translationId) {
          if (typeof translationId === 'undefined') {
            // case of element "<translate***REMOVED***xyz</translate***REMOVED***"
            observeElementTranslation('');
    ***REMOVED*** else {
            // case of regular attribute
            if (translationId !== '' || !firstAttributeChangedEvent) {
              translationIds.translate = translationId;
              updateTranslations();
      ***REMOVED***
    ***REMOVED***
          firstAttributeChangedEvent = false;
  ***REMOVED***);

        for (var translateAttr in iAttr) {
          if (iAttr.hasOwnProperty(translateAttr) && translateAttr.substr(0, 13) === 'translateAttr') {
            observeAttributeTranslation(translateAttr);
    ***REMOVED***
  ***REMOVED***

        iAttr.$observe('translateDefault', function (value) {
          scope.defaultText = value;
  ***REMOVED***);

        if (translateValuesExist) {
          iAttr.$observe('translateValues', function (interpolateParams) {
            if (interpolateParams) {
              scope.$parent.$watch(function () {
                angular.extend(scope.interpolateParams, $parse(interpolateParams)(scope.$parent));
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***

        if (translateValueExist) {
          var observeValueAttribute = function (attrName) {
            iAttr.$observe(attrName, function (value) {
              var attributeName = angular.lowercase(attrName.substr(14, 1)) + attrName.substr(15);
              scope.interpolateParams[attributeName] = value;
      ***REMOVED***);
    ***REMOVED***;
          for (var attr in iAttr) {
            if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
              observeValueAttribute(attr);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

        // Master update function
        var updateTranslations = function () {
          for (var key in translationIds) {
            if (translationIds.hasOwnProperty(key)) {
              updateTranslation(key, translationIds[key], scope, scope.interpolateParams, scope.defaultText);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

        // Put translation processing function outside loop
        var updateTranslation = function(translateAttr, translationId, scope, interpolateParams, defaultTranslationText) {
          if (translationId) {
            $translate(translationId, interpolateParams, translateInterpolation, defaultTranslationText)
              .then(function (translation) {
                applyTranslation(translation, scope, true, translateAttr);
        ***REMOVED***, function (translationId) {
                applyTranslation(translationId, scope, false, translateAttr);
        ***REMOVED***);
    ***REMOVED*** else {
            // as an empty string cannot be translated, we can solve this using successful=false
            applyTranslation(translationId, scope, false, translateAttr);
    ***REMOVED***
  ***REMOVED***;

        var applyTranslation = function (value, scope, successful, translateAttr) {
          if (translateAttr === 'translate') {
            // default translate into innerHTML
            if (!successful && typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
      ***REMOVED***
            iElement.html(scope.preText + value + scope.postText);
            var globallyEnabled = $translate.isPostCompilingEnabled();
            var locallyDefined = typeof tAttr.translateCompile !== 'undefined';
            var locallyEnabled = locallyDefined && tAttr.translateCompile !== 'false';
            if ((globallyEnabled && !locallyDefined) || locallyEnabled) {
              $compile(iElement.contents())(scope);
      ***REMOVED***
    ***REMOVED*** else {
            // translate attribute
            if (!successful && typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
      ***REMOVED***
            var attributeName = iAttr.$attr[translateAttr].substr(15);
            iElement.attr(attributeName, value);
    ***REMOVED***
  ***REMOVED***;

        scope.$watch('interpolateParams', updateTranslations, true);

        // Ensures the text will be refreshed after the current language was changed
        // w/ $translate.use(***REMOVED***)
        var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

        // ensure translation will be looked up at least one
        if (iElement.text().length) {
          observeElementTranslation('');
  ***REMOVED***
        updateTranslations();
        scope.$on('$destroy', unbind);
***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***]);

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateCloak
 * @requires $rootScope
 * @requires $translate
 * @restrict A
 *
 * $description
 * Adds a `translate-cloak` class name to the given element where this directive
 * is applied initially and removes it, once a loader has finished loading.
 *
 * This directive can be used to prevent initial flickering when loading translation
 * data asynchronously.
 *
 * The class name is defined in
 * {@link pascalprecht.translate.$translateProvider#cloakClassName $translate.cloakClassName()***REMOVED***.
 *
 * @param {string=***REMOVED*** translate-cloak If a translationId is provided, it will be used for showing
 *                                  or hiding the cloak. Basically it relies on the translation
 *                                  resolve.
 */
.directive('translateCloak', ['$rootScope', '$translate', function ($rootScope, $translate) {

  return {
    compile: function (tElement) {
      var applyCloak = function () {
        tElement.addClass($translate.cloakClassName());
***REMOVED***,
      removeCloak = function () {
        tElement.removeClass($translate.cloakClassName());
***REMOVED***,
      removeListener = $rootScope.$on('$translateChangeEnd', function () {
        removeCloak();
        removeListener();
        removeListener = null;
***REMOVED***);
      applyCloak();

      return function linkFn(scope, iElement, iAttr) {
        // Register a watcher for the defined translation allowing a fine tuned cloak
        if (iAttr.translateCloak && iAttr.translateCloak.length) {
          iAttr.$observe('translateCloak', function (translationId) {
            $translate(translationId).then(removeCloak, applyCloak);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***]);

angular.module('pascalprecht.translate')
/**
 * @ngdoc filter
 * @name pascalprecht.translate.filter:translate
 * @requires $parse
 * @requires pascalprecht.translate.$translate
 * @function
 *
 * @description
 * Uses `$translate` service to translate contents. Accepts interpolate parameters
 * to pass dynamized values though translation.
 *
 * @param {string***REMOVED*** translationId A translation id to be translated.
 * @param {*=***REMOVED*** interpolateParams Optional object literal (as hash or string) to pass values into translation.
 *
 * @returns {string***REMOVED*** Translated text.
 *
 * @example
   <example module="ngView"***REMOVED***
    <file name="index.html"***REMOVED***
      <div ng-controller="TranslateCtrl"***REMOVED***

        <pre***REMOVED***{{ 'TRANSLATION_ID' | translate ***REMOVED******REMOVED***</pre***REMOVED***
        <pre***REMOVED***{{ translationId | translate ***REMOVED******REMOVED***</pre***REMOVED***
        <pre***REMOVED***{{ 'WITH_VALUES' | translate:'{value: 5***REMOVED***' ***REMOVED******REMOVED***</pre***REMOVED***
        <pre***REMOVED***{{ 'WITH_VALUES' | translate:values ***REMOVED******REMOVED***</pre***REMOVED***

      </div***REMOVED***
    </file***REMOVED***
    <file name="script.js"***REMOVED***
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en', {
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value***REMOVED******REMOVED***'
  ***REMOVED***);
        $translateProvider.preferredLanguage('en');

***REMOVED***);

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
  ***REMOVED***;
***REMOVED***);
    </file***REMOVED***
   </example***REMOVED***
 */
.filter('translate', ['$parse', '$translate', function ($parse, $translate) {
  var translateFilter = function (translationId, interpolateParams, interpolation) {

    if (!angular.isObject(interpolateParams)) {
      interpolateParams = $parse(interpolateParams)(this);
    ***REMOVED***

    return $translate.instant(translationId, interpolateParams, interpolation);
  ***REMOVED***;

  // Since AngularJS 1.3, filters which are not stateless (depending at the scope)
  // have to explicit define this behavior.
  translateFilter.$stateful = true;

  return translateFilter;
***REMOVED***]);
