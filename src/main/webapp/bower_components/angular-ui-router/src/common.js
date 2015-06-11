/*jshint globalstrict:true*/
/*global angular:false*/
'use strict';

var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy;

function inherit(parent, extra) {
  return extend(new (extend(function() {***REMOVED***, { prototype: parent ***REMOVED***))(), extra);
***REMOVED***

function merge(dst) {
  forEach(arguments, function(obj) {
    if (obj !== dst) {
      forEach(obj, function(value, key) {
        if (!dst.hasOwnProperty(key)) dst[key] = value;
***REMOVED***);
    ***REMOVED***
  ***REMOVED***);
  return dst;
***REMOVED***

/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object***REMOVED*** first The first state.
 * @param {Object***REMOVED*** second The second state.
 * @return {Array***REMOVED*** Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  ***REMOVED***
  return path;
***REMOVED***

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object***REMOVED*** object A JavaScript object.
 * @return {Array***REMOVED*** Returns the keys of the object as an array.
 */
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  ***REMOVED***
  var result = [];

  angular.forEach(object, function(val, key) {
    result.push(key);
  ***REMOVED***);
  return result;
***REMOVED***

/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array***REMOVED*** array A JavaScript array.
 * @param {****REMOVED*** value A value to search the array for.
 * @return {Number***REMOVED*** Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  ***REMOVED***
  var len = array.length ***REMOVED******REMOVED******REMOVED*** 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  ***REMOVED***
  return -1;
***REMOVED***

/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object***REMOVED*** currentParams The value of the current state parameters ($stateParams).
 * @param {Object***REMOVED*** newParams The set of parameters which will be composited with inherited params.
 * @param {Object***REMOVED*** $current Internal definition of object representing the current state.
 * @param {Object***REMOVED*** $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {***REMOVED***, inheritList = [];

  for (var i in parents) {
    if (!parents[i].params) continue;
    parentParams = objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (indexOf(inheritList, parentParams[j]) ***REMOVED***= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    ***REMOVED***
  ***REMOVED***
  return extend({***REMOVED***, inherited, newParams);
***REMOVED***

/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object***REMOVED*** a The first object.
 * @param {Object***REMOVED*** b The second object.
 * @param {Array***REMOVED*** keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean***REMOVED*** Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a, b, keys) {
  if (!keys) {
    keys = [];
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
  ***REMOVED***

  for (var i=0; i<keys.length; i++) {
    var k = keys[i];
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
  ***REMOVED***
  return true;
***REMOVED***

/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array***REMOVED*** keys
 * @param {Object***REMOVED*** values
 * @return {Boolean***REMOVED*** Returns a subset of `values`.
 */
function filterByKeys(keys, values) {
  var filtered = {***REMOVED***;

  forEach(keys, function (name) {
    filtered[name] = values[name];
  ***REMOVED***);
  return filtered;
***REMOVED***

// like _.indexBy
// when you know that your index values will be unique, or you want last-one-in to win
function indexBy(array, propName) {
  var result = {***REMOVED***;
  forEach(array, function(item) {
    result[item[propName]] = item;
  ***REMOVED***);
  return result;
***REMOVED***

// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj) {
  var copy = {***REMOVED***;
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  forEach(keys, function(key) {
    if (key in obj) copy[key] = obj[key];
  ***REMOVED***);
  return copy;
***REMOVED***

// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj) {
  var copy = {***REMOVED***;
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  for (var key in obj) {
    if (indexOf(keys, key) == -1) copy[key] = obj[key];
  ***REMOVED***
  return copy;
***REMOVED***

function pluck(collection, key) {
  var result = isArray(collection) ? [] : {***REMOVED***;

  forEach(collection, function(val, i) {
    result[i] = isFunction(key) ? key(val) : val[key];
  ***REMOVED***);
  return result;
***REMOVED***

function filter(collection, callback) {
  var array = isArray(collection);
  var result = array ? [] : {***REMOVED***;
  forEach(collection, function(val, i) {
    if (callback(val, i)) {
      result[array ? result.length : i] = val;
    ***REMOVED***
  ***REMOVED***);
  return result;
***REMOVED***

function map(collection, callback) {
  var result = isArray(collection) ? [] : {***REMOVED***;

  forEach(collection, function(val, i) {
    result[i] = callback(val, i);
  ***REMOVED***);
  return result;
***REMOVED***

/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router***REMOVED*** module instead).
 *
 */
angular.module('ui.router.util', ['ng']);

/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router***REMOVED*** module instead).
 */
angular.module('ui.router.router', ['ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router***REMOVED*** module instead).
 * 
 */
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre***REMOVED***
 * <!doctype html***REMOVED***
 * <html ng-app="myApp"***REMOVED***
 * <head***REMOVED***
 *   <script src="js/angular.js"***REMOVED***</script***REMOVED***
 *   <!-- Include the ui-router script --***REMOVED***
 *   <script src="js/angular-ui-router.min.js"***REMOVED***</script***REMOVED***
 *   <script***REMOVED***
 *     // ***REMOVED***and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script***REMOVED***
 * </head***REMOVED***
 * <body***REMOVED***
 * </body***REMOVED***
 * </html***REMOVED***
 * </pre***REMOVED***
 */
angular.module('ui.router', ['ui.router.state']);

angular.module('ui.router.compat', ['ui.router']);
