'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"***REMOVED***;
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
***REMOVED***

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  ***REMOVED***

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f***REMOVED***;
***REMOVED***

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "AM",
      "PM"
    ],
    "DAY": [
      "kari",
      "nt\u025bn\u025b",
      "tarata",
      "araba",
      "alamisa",
      "juma",
      "sibiri"
    ],
    "MONTH": [
      "zanwuye",
      "feburuye",
      "marisi",
      "awirili",
      "m\u025b",
      "zuw\u025bn",
      "zuluye",
      "uti",
      "s\u025btanburu",
      "\u0254kut\u0254buru",
      "nowanburu",
      "desanburu"
    ],
    "SHORTDAY": [
      "kar",
      "nt\u025b",
      "tar",
      "ara",
      "ala",
      "jum",
      "sib"
    ],
    "SHORTMONTH": [
      "zan",
      "feb",
      "mar",
      "awi",
      "m\u025b",
      "zuw",
      "zul",
      "uti",
      "s\u025bt",
      "\u0254ku",
      "now",
      "des"
    ],
    "fullDate": "EEEE d MMMM y",
    "longDate": "d MMMM y",
    "medium": "d MMM, y HH:mm:ss",
    "mediumDate": "d MMM, y",
    "mediumTime": "HH:mm:ss",
    "short": "d/M/y HH:mm",
    "shortDate": "d/M/y",
    "shortTime": "HH:mm"
  ***REMOVED***,
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "CFA",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
***REMOVED***,
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "\u00a4-",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
***REMOVED***
    ]
  ***REMOVED***,
  "id": "bm-ml",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  ***REMOVED***  return PLURAL_CATEGORY.OTHER;***REMOVED***
***REMOVED***);
***REMOVED***]);
