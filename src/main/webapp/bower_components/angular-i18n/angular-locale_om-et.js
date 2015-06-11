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
      "WD",
      "WB"
    ],
    "DAY": [
      "Dilbata",
      "Wiixata",
      "Qibxata",
      "Roobii",
      "Kamiisa",
      "Jimaata",
      "Sanbata"
    ],
    "MONTH": [
      "Amajjii",
      "Guraandhala",
      "Bitooteessa",
      "Elba",
      "Caamsa",
      "Waxabajjii",
      "Adooleessa",
      "Hagayya",
      "Fuulbana",
      "Onkololeessa",
      "Sadaasa",
      "Muddee"
    ],
    "SHORTDAY": [
      "Dil",
      "Wix",
      "Qib",
      "Rob",
      "Kam",
      "Jim",
      "San"
    ],
    "SHORTMONTH": [
      "Ama",
      "Gur",
      "Bit",
      "Elb",
      "Cam",
      "Wax",
      "Ado",
      "Hag",
      "Ful",
      "Onk",
      "Sad",
      "Mud"
    ],
    "fullDate": "EEEE, MMMM d, y",
    "longDate": "dd MMMM y",
    "medium": "dd-MMM-y h:mm:ss a",
    "mediumDate": "dd-MMM-y",
    "mediumTime": "h:mm:ss a",
    "short": "dd/MM/yy h:mm a",
    "shortDate": "dd/MM/yy",
    "shortTime": "h:mm a"
  ***REMOVED***,
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "Birr",
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
  "id": "om-et",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  ***REMOVED***  return PLURAL_CATEGORY.OTHER;***REMOVED***
***REMOVED***);
***REMOVED***]);
