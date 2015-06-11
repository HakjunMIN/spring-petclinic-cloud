// Simple phantom.js integration script
// Adapted from Modernizr

function waitFor(testFx, onReady, timeOutMillis) {
  var maxtimeOutMillis = timeOutMillis ? timeOutMillis :  5001 //< Default Max Timout is 5s
    , start = new Date().getTime()
    , condition = false
    , interval = setInterval(function () {
        if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
          // If not time-out yet and condition not yet fulfilled
          condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()) //< defensive code
  ***REMOVED*** else {
          if (!condition) {
            // If condition still not fulfilled (timeout but condition is 'false')
            console.log("'waitFor()' timeout")
            phantom.exit(1)
    ***REMOVED*** else {
            // Condition fulfilled (timeout and/or condition is 'true')
            typeof(onReady) === "string" ? eval(onReady) : onReady() //< Do what it's supposed to do once the condition is fulfilled
            clearInterval(interval) //< Stop this interval
    ***REMOVED***
  ***REMOVED***
    ***REMOVED***, 100) //< repeat check every 100ms
***REMOVED***


if (phantom.args.length === 0 || phantom.args.length ***REMOVED*** 2) {
  console.log('Usage: phantom.js URL')
  phantom.exit()
***REMOVED***

var page = new WebPage()

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
  console.log(msg)
***REMOVED***;

page.open(phantom.args[0], function(status){
  if (status !== "success") {
    console.log("Unable to access network")
    phantom.exit()
  ***REMOVED*** else {
    waitFor(function(){
      return page.evaluate(function(){
        var el = document.getElementById('qunit-testresult')
        if (el && el.innerText.match('completed')) {
          return true
  ***REMOVED***
        return false
***REMOVED***)
    ***REMOVED***, function(){
      var failedNum = page.evaluate(function(){
        var el = document.getElementById('qunit-testresult')
        try {
          return el.getElementsByClassName('failed')[0].innerHTML
  ***REMOVED*** catch (e) { ***REMOVED***
        return 10000
***REMOVED***);
      phantom.exit((parseInt(failedNum, 10) ***REMOVED*** 0) ? 1 : 0)
    ***REMOVED***)
  ***REMOVED***
***REMOVED***)