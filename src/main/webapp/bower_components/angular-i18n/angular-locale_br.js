'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"***REMOVED***;
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "A.M.",
      "G.M."
    ],
    "DAY": [
      "Sul",
      "Lun",
      "Meurzh",
      "Merc\u02bcher",
      "Yaou",
      "Gwener",
      "Sadorn"
    ],
    "MONTH": [
      "Genver",
      "C\u02bchwevrer",
      "Meurzh",
      "Ebrel",
      "Mae",
      "Mezheven",
      "Gouere",
      "Eost",
      "Gwengolo",
      "Here",
      "Du",
      "Kerzu"
    ],
    "SHORTDAY": [
      "Sul",
      "Lun",
      "Meu.",
      "Mer.",
      "Yaou",
      "Gwe.",
      "Sad."
    ],
    "SHORTMONTH": [
      "Gen",
      "C\u02bchwe",
      "Meur",
      "Ebr",
      "Mae",
      "Mezh",
      "Goue",
      "Eost",
      "Gwen",
      "Here",
      "Du",
      "Ker"
    ],
    "fullDate": "y MMMM d, EEEE",
    "longDate": "y MMMM d",
    "medium": "y MMM d HH:mm:ss",
    "mediumDate": "y MMM d",
    "mediumTime": "HH:mm:ss",
    "short": "y-MM-dd HH:mm",
    "shortDate": "y-MM-dd",
    "shortTime": "HH:mm"
  ***REMOVED***,
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20ac",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
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
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
***REMOVED***
    ]
  ***REMOVED***,
  "id": "br",
  "pluralCat": function(n, opt_precision) {  if (n % 10 == 1 && n % 100 != 11 && n % 100 != 71 && n % 100 != 91) {    return PLURAL_CATEGORY.ONE;  ***REMOVED***  if (n % 10 == 2 && n % 100 != 12 && n % 100 != 72 && n % 100 != 92) {    return PLURAL_CATEGORY.TWO;  ***REMOVED***  if ((n % 10 ***REMOVED***= 3 && n % 10 <= 4 || n % 10 == 9) && (n % 100 < 10 || n % 100 ***REMOVED*** 19) && (n % 100 < 70 || n % 100 ***REMOVED*** 79) && (n % 100 < 90 || n % 100 ***REMOVED*** 99)) {    return PLURAL_CATEGORY.FEW;  ***REMOVED***  if (n != 0 && n % 1000000 == 0) {    return PLURAL_CATEGORY.MANY;  ***REMOVED***  return PLURAL_CATEGORY.OTHER;***REMOVED***
***REMOVED***);
***REMOVED***]);
