/**
 * QUnit - A JavaScript Unit Testing Framework
 *
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2012 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * or GPL (GPL-LICENSE.txt) licenses.
 */

(function(window) {

var defined = {
	setTimeout: typeof window.setTimeout !== "undefined",
	sessionStorage: (function() {
		try {
			return !!sessionStorage.getItem;
		***REMOVED*** catch(e) {
			return false;
		***REMOVED***
	***REMOVED***)()
***REMOVED***;

var testId = 0;

var Test = function(name, testName, expected, testEnvironmentArg, async, callback) {
	this.name = name;
	this.testName = testName;
	this.expected = expected;
	this.testEnvironmentArg = testEnvironmentArg;
	this.async = async;
	this.callback = callback;
	this.assertions = [];
***REMOVED***;
Test.prototype = {
	init: function() {
		var tests = id("qunit-tests");
		if (tests) {
			var b = document.createElement("strong");
				b.innerHTML = "Running " + this.name;
			var li = document.createElement("li");
				li.appendChild( b );
				li.className = "running";
				li.id = this.id = "test-output" + testId++;
			tests.appendChild( li );
		***REMOVED***
	***REMOVED***,
	setup: function() {
		if (this.module != config.previousModule) {
			if ( config.previousModule ) {
				QUnit.moduleDone( {
					name: config.previousModule,
					failed: config.moduleStats.bad,
					passed: config.moduleStats.all - config.moduleStats.bad,
					total: config.moduleStats.all
				***REMOVED*** );
			***REMOVED***
			config.previousModule = this.module;
			config.moduleStats = { all: 0, bad: 0 ***REMOVED***;
			QUnit.moduleStart( {
				name: this.module
			***REMOVED*** );
		***REMOVED***

		config.current = this;
		this.testEnvironment = extend({
			setup: function() {***REMOVED***,
			teardown: function() {***REMOVED***
		***REMOVED***, this.moduleTestEnvironment);
		if (this.testEnvironmentArg) {
			extend(this.testEnvironment, this.testEnvironmentArg);
		***REMOVED***

		QUnit.testStart( {
			name: this.testName
		***REMOVED*** );

		// allow utility functions to access the current test environment
		// TODO why??
		QUnit.current_testEnvironment = this.testEnvironment;

		try {
			if ( !config.pollution ) {
				saveGlobal();
			***REMOVED***

			this.testEnvironment.setup.call(this.testEnvironment);
		***REMOVED*** catch(e) {
			QUnit.ok( false, "Setup failed on " + this.testName + ": " + e.message );
		***REMOVED***
	***REMOVED***,
	run: function() {
		if ( this.async ) {
			QUnit.stop();
		***REMOVED***

		if ( config.notrycatch ) {
			this.callback.call(this.testEnvironment);
			return;
		***REMOVED***
		try {
			this.callback.call(this.testEnvironment);
		***REMOVED*** catch(e) {
			fail("Test " + this.testName + " died, exception and test follows", e, this.callback);
			QUnit.ok( false, "Died on test #" + (this.assertions.length + 1) + ": " + e.message + " - " + QUnit.jsDump.parse(e) );
			// else next test will carry the responsibility
			saveGlobal();

			// Restart the tests if they're blocking
			if ( config.blocking ) {
				start();
			***REMOVED***
		***REMOVED***
	***REMOVED***,
	teardown: function() {
		try {
			this.testEnvironment.teardown.call(this.testEnvironment);
			checkPollution();
		***REMOVED*** catch(e) {
			QUnit.ok( false, "Teardown failed on " + this.testName + ": " + e.message );
		***REMOVED***
	***REMOVED***,
	finish: function() {
		if ( this.expected && this.expected != this.assertions.length ) {
			QUnit.ok( false, "Expected " + this.expected + " assertions, but " + this.assertions.length + " were run" );
		***REMOVED***

		var good = 0, bad = 0,
			tests = id("qunit-tests");

		config.stats.all += this.assertions.length;
		config.moduleStats.all += this.assertions.length;

		if ( tests ) {
			var ol = document.createElement("ol");

			for ( var i = 0; i < this.assertions.length; i++ ) {
				var assertion = this.assertions[i];

				var li = document.createElement("li");
				li.className = assertion.result ? "pass" : "fail";
				li.innerHTML = assertion.message || (assertion.result ? "okay" : "failed");
				ol.appendChild( li );

				if ( assertion.result ) {
					good++;
				***REMOVED*** else {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				***REMOVED***
			***REMOVED***

			// store result when possible
			if ( QUnit.config.reorder && defined.sessionStorage ) {
				if (bad) {
					sessionStorage.setItem("qunit-" + this.module + "-" + this.testName, bad);
				***REMOVED*** else {
					sessionStorage.removeItem("qunit-" + this.module + "-" + this.testName);
				***REMOVED***
			***REMOVED***

			if (bad == 0) {
				ol.style.display = "none";
			***REMOVED***

			var b = document.createElement("strong");
			b.innerHTML = this.name + " <b class='counts'***REMOVED***(<b class='failed'***REMOVED***" + bad + "</b***REMOVED***, <b class='passed'***REMOVED***" + good + "</b***REMOVED***, " + this.assertions.length + ")</b***REMOVED***";

			var a = document.createElement("a");
			a.innerHTML = "Rerun";
			a.href = QUnit.url({ filter: getText([b]).replace(/\([^)]+\)$/, "").replace(/(^\s*|\s*$)/g, "") ***REMOVED***);

			addEvent(b, "click", function() {
				var next = b.nextSibling.nextSibling,
					display = next.style.display;
				next.style.display = display === "none" ? "block" : "none";
			***REMOVED***);

			addEvent(b, "dblclick", function(e) {
				var target = e && e.target ? e.target : window.event.srcElement;
				if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
					target = target.parentNode;
				***REMOVED***
				if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
					window.location = QUnit.url({ filter: getText([target]).replace(/\([^)]+\)$/, "").replace(/(^\s*|\s*$)/g, "") ***REMOVED***);
				***REMOVED***
			***REMOVED***);

			var li = id(this.id);
			li.className = bad ? "fail" : "pass";
			li.removeChild( li.firstChild );
			li.appendChild( b );
			li.appendChild( a );
			li.appendChild( ol );

		***REMOVED*** else {
			for ( var i = 0; i < this.assertions.length; i++ ) {
				if ( !this.assertions[i].result ) {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				***REMOVED***
			***REMOVED***
		***REMOVED***

		try {
			QUnit.reset();
		***REMOVED*** catch(e) {
			fail("reset() failed, following Test " + this.testName + ", exception and reset fn follows", e, QUnit.reset);
		***REMOVED***

		QUnit.testDone( {
			name: this.testName,
			failed: bad,
			passed: this.assertions.length - bad,
			total: this.assertions.length
		***REMOVED*** );
	***REMOVED***,

	queue: function() {
		var test = this;
		synchronize(function() {
			test.init();
		***REMOVED***);
		function run() {
			// each of these can by async
			synchronize(function() {
				test.setup();
			***REMOVED***);
			synchronize(function() {
				test.run();
			***REMOVED***);
			synchronize(function() {
				test.teardown();
			***REMOVED***);
			synchronize(function() {
				test.finish();
			***REMOVED***);
		***REMOVED***
		// defer when previous test run passed, if storage is available
		var bad = QUnit.config.reorder && defined.sessionStorage && +sessionStorage.getItem("qunit-" + this.module + "-" + this.testName);
		if (bad) {
			run();
		***REMOVED*** else {
			synchronize(run);
		***REMOVED***;
	***REMOVED***

***REMOVED***;

var QUnit = {

	// call on start of module test to prepend name to all tests
	module: function(name, testEnvironment) {
		config.currentModule = name;
		config.currentModuleTestEnviroment = testEnvironment;
	***REMOVED***,

	asyncTest: function(testName, expected, callback) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = 0;
		***REMOVED***

		QUnit.test(testName, expected, callback, true);
	***REMOVED***,

	test: function(testName, expected, callback, async) {
		var name = '<span class="test-name"***REMOVED***' + testName + '</span***REMOVED***', testEnvironmentArg;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		***REMOVED***
		// is 2nd argument a testEnvironment?
		if ( expected && typeof expected === 'object') {
			testEnvironmentArg = expected;
			expected = null;
		***REMOVED***

		if ( config.currentModule ) {
			name = '<span class="module-name"***REMOVED***' + config.currentModule + "</span***REMOVED***: " + name;
		***REMOVED***

		if ( !validTest(config.currentModule + ": " + testName) ) {
			return;
		***REMOVED***

		var test = new Test(name, testName, expected, testEnvironmentArg, async, callback);
		test.module = config.currentModule;
		test.moduleTestEnvironment = config.currentModuleTestEnviroment;
		test.queue();
	***REMOVED***,

	/**
	 * Specify the number of expected assertions to gurantee that failed test (no assertions are run at all) don't slip through.
	 */
	expect: function(asserts) {
		config.current.expected = asserts;
	***REMOVED***,

	/**
	 * Asserts true.
	 * @example ok( "asdfasdf".length ***REMOVED*** 5, "There must be at least 5 chars" );
	 */
	ok: function(a, msg) {
		a = !!a;
		var details = {
			result: a,
			message: msg
		***REMOVED***;
		msg = escapeHtml(msg);
		QUnit.log(details);
		config.current.assertions.push({
			result: a,
			message: msg
		***REMOVED***);
	***REMOVED***,

	/**
	 * Checks that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 *
	 * Prefered to ok( actual == expected, message )
	 *
	 * @example equal( format("Received {0***REMOVED*** bytes.", 2), "Received 2 bytes." );
	 *
	 * @param Object actual
	 * @param Object expected
	 * @param String message (optional)
	 */
	equal: function(actual, expected, message) {
		QUnit.push(expected == actual, actual, expected, message);
	***REMOVED***,

	notEqual: function(actual, expected, message) {
		QUnit.push(expected != actual, actual, expected, message);
	***REMOVED***,

	deepEqual: function(actual, expected, message) {
		QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
	***REMOVED***,

	notDeepEqual: function(actual, expected, message) {
		QUnit.push(!QUnit.equiv(actual, expected), actual, expected, message);
	***REMOVED***,

	strictEqual: function(actual, expected, message) {
		QUnit.push(expected === actual, actual, expected, message);
	***REMOVED***,

	notStrictEqual: function(actual, expected, message) {
		QUnit.push(expected !== actual, actual, expected, message);
	***REMOVED***,

	raises: function(block, expected, message) {
		var actual, ok = false;

		if (typeof expected === 'string') {
			message = expected;
			expected = null;
		***REMOVED***

		try {
			block();
		***REMOVED*** catch (e) {
			actual = e;
		***REMOVED***

		if (actual) {
			// we don't want to validate thrown error
			if (!expected) {
				ok = true;
			// expected is a regexp
			***REMOVED*** else if (QUnit.objectType(expected) === "regexp") {
				ok = expected.test(actual);
			// expected is a constructor
			***REMOVED*** else if (actual instanceof expected) {
				ok = true;
			// expected is a validation function which returns true is validation passed
			***REMOVED*** else if (expected.call({***REMOVED***, actual) === true) {
				ok = true;
			***REMOVED***
		***REMOVED***

		QUnit.ok(ok, message);
	***REMOVED***,

	start: function() {
		config.semaphore--;
		if (config.semaphore ***REMOVED*** 0) {
			// don't start until equal number of stop-calls
			return;
		***REMOVED***
		if (config.semaphore < 0) {
			// ignore if start is called more often then stop
			config.semaphore = 0;
		***REMOVED***
		// A slight delay, to avoid any current callbacks
		if ( defined.setTimeout ) {
			window.setTimeout(function() {
				if (config.semaphore ***REMOVED*** 0) {
					return;
				***REMOVED***
				if ( config.timeout ) {
					clearTimeout(config.timeout);
				***REMOVED***

				config.blocking = false;
				process();
			***REMOVED***, 13);
		***REMOVED*** else {
			config.blocking = false;
			process();
		***REMOVED***
	***REMOVED***,

	stop: function(timeout) {
		config.semaphore++;
		config.blocking = true;

		if ( timeout && defined.setTimeout ) {
			clearTimeout(config.timeout);
			config.timeout = window.setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				QUnit.start();
			***REMOVED***, timeout);
		***REMOVED***
	***REMOVED***
***REMOVED***;

// Backwards compatibility, deprecated
QUnit.equals = QUnit.equal;
QUnit.same = QUnit.deepEqual;

// Maintain internal state
var config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true,

	// when enabled, show only failing tests
	// gets persisted through sessionStorage and can be changed in UI via checkbox
	hidepassed: false,

	// by default, run previously failed tests first
	// very useful in combination with "Hide passed tests" checked
	reorder: true,

	// by default, modify document.title when suite is done
	altertitle: true,

	urlConfig: ['noglobals', 'notrycatch']
***REMOVED***;

// Load paramaters
(function() {
	var location = window.location || { search: "", protocol: "file:" ***REMOVED***,
		params = location.search.slice( 1 ).split( "&" ),
		length = params.length,
		urlParams = {***REMOVED***,
		current;

	if ( params[ 0 ] ) {
		for ( var i = 0; i < length; i++ ) {
			current = params[ i ].split( "=" );
			current[ 0 ] = decodeURIComponent( current[ 0 ] );
			// allow just a key to turn on a flag, e.g., test.html?noglobals
			current[ 1 ] = current[ 1 ] ? decodeURIComponent( current[ 1 ] ) : true;
			urlParams[ current[ 0 ] ] = current[ 1 ];
		***REMOVED***
	***REMOVED***

	QUnit.urlParams = urlParams;
	config.filter = urlParams.filter;

	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = !!(location.protocol === 'file:');
***REMOVED***)();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, QUnit);
	window.QUnit = QUnit;
***REMOVED*** else {
	extend(exports, QUnit);
	exports.QUnit = QUnit;
***REMOVED***

// define these after exposing globals to keep them in these QUnit namespace only
extend(QUnit, {
	config: config,

	// Initialize the configuration options
	init: function() {
		extend(config, {
			stats: { all: 0, bad: 0 ***REMOVED***,
			moduleStats: { all: 0, bad: 0 ***REMOVED***,
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			filter: "",
			queue: [],
			semaphore: 0
		***REMOVED***);

		var tests = id( "qunit-tests" ),
			banner = id( "qunit-banner" ),
			result = id( "qunit-testresult" );

		if ( tests ) {
			tests.innerHTML = "";
		***REMOVED***

		if ( banner ) {
			banner.className = "";
		***REMOVED***

		if ( result ) {
			result.parentNode.removeChild( result );
		***REMOVED***

		if ( tests ) {
			result = document.createElement( "p" );
			result.id = "qunit-testresult";
			result.className = "result";
			tests.parentNode.insertBefore( result, tests );
			result.innerHTML = 'Running***REMOVED***<br/***REMOVED***&nbsp;';
		***REMOVED***
	***REMOVED***,

	/**
	 * Resets the test setup. Useful for tests that modify the DOM.
	 *
	 * If jQuery is available, uses jQuery's html(), otherwise just innerHTML.
	 */
	reset: function() {
		if ( window.jQuery ) {
			jQuery( "#qunit-fixture" ).html( config.fixture );
		***REMOVED*** else {
			var main = id( 'qunit-fixture' );
			if ( main ) {
				main.innerHTML = config.fixture;
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	/**
	 * Trigger an event on an element.
	 *
	 * @example triggerEvent( document.body, "click" );
	 *
	 * @param DOMElement elem
	 * @param String type
	 */
	triggerEvent: function( elem, type, event ) {
		if ( document.createEvent ) {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent( event );

		***REMOVED*** else if ( elem.fireEvent ) {
			elem.fireEvent("on"+type);
		***REMOVED***
	***REMOVED***,

	// Safe object type checking
	is: function( type, obj ) {
		return QUnit.objectType( obj ) == type;
	***REMOVED***,

	objectType: function( obj ) {
		if (typeof obj === "undefined") {
				return "undefined";

		// consider: typeof null === object
		***REMOVED***
		if (obj === null) {
				return "null";
		***REMOVED***

		var type = Object.prototype.toString.call( obj )
			.match(/^\[object\s(.*)\]$/)[1] || '';

		switch (type) {
				case 'Number':
						if (isNaN(obj)) {
								return "nan";
						***REMOVED*** else {
								return "number";
						***REMOVED***
				case 'String':
				case 'Boolean':
				case 'Array':
				case 'Date':
				case 'RegExp':
				case 'Function':
						return type.toLowerCase();
		***REMOVED***
		if (typeof obj === "object") {
				return "object";
		***REMOVED***
		return undefined;
	***REMOVED***,

	push: function(result, actual, expected, message) {
		var details = {
			result: result,
			message: message,
			actual: actual,
			expected: expected
		***REMOVED***;

		message = escapeHtml(message) || (result ? "okay" : "failed");
		message = '<span class="test-message"***REMOVED***' + message + "</span***REMOVED***";
		expected = escapeHtml(QUnit.jsDump.parse(expected));
		actual = escapeHtml(QUnit.jsDump.parse(actual));
		var output = message + '<table***REMOVED***<tr class="test-expected"***REMOVED***<th***REMOVED***Expected: </th***REMOVED***<td***REMOVED***<pre***REMOVED***' + expected + '</pre***REMOVED***</td***REMOVED***</tr***REMOVED***';
		if (actual != expected) {
			output += '<tr class="test-actual"***REMOVED***<th***REMOVED***Result: </th***REMOVED***<td***REMOVED***<pre***REMOVED***' + actual + '</pre***REMOVED***</td***REMOVED***</tr***REMOVED***';
			output += '<tr class="test-diff"***REMOVED***<th***REMOVED***Diff: </th***REMOVED***<td***REMOVED***<pre***REMOVED***' + QUnit.diff(expected, actual) +'</pre***REMOVED***</td***REMOVED***</tr***REMOVED***';
		***REMOVED***
		if (!result) {
			var source = sourceFromStacktrace();
			if (source) {
				details.source = source;
				output += '<tr class="test-source"***REMOVED***<th***REMOVED***Source: </th***REMOVED***<td***REMOVED***<pre***REMOVED***' + escapeHtml(source) + '</pre***REMOVED***</td***REMOVED***</tr***REMOVED***';
			***REMOVED***
		***REMOVED***
		output += "</table***REMOVED***";

		QUnit.log(details);

		config.current.assertions.push({
			result: !!result,
			message: output
		***REMOVED***);
	***REMOVED***,

	url: function( params ) {
		params = extend( extend( {***REMOVED***, QUnit.urlParams ), params );
		var querystring = "?",
			key;
		for ( key in params ) {
			querystring += encodeURIComponent( key ) + "=" +
				encodeURIComponent( params[ key ] ) + "&";
		***REMOVED***
		return window.location.pathname + querystring.slice( 0, -1 );
	***REMOVED***,

	extend: extend,
	id: id,
	addEvent: addEvent,

	// Logging callbacks; all receive a single argument with the listed properties
	// run test/logs.html for any related changes
	begin: function() {***REMOVED***,
	// done: { failed, passed, total, runtime ***REMOVED***
	done: function() {***REMOVED***,
	// log: { result, actual, expected, message ***REMOVED***
	log: function() {***REMOVED***,
	// testStart: { name ***REMOVED***
	testStart: function() {***REMOVED***,
	// testDone: { name, failed, passed, total ***REMOVED***
	testDone: function() {***REMOVED***,
	// moduleStart: { name ***REMOVED***
	moduleStart: function() {***REMOVED***,
	// moduleDone: { name, failed, passed, total ***REMOVED***
	moduleDone: function() {***REMOVED***
***REMOVED***);

if ( typeof document === "undefined" || document.readyState === "complete" ) {
	config.autorun = true;
***REMOVED***

QUnit.load = function() {
	QUnit.begin({***REMOVED***);

	// Initialize the config, saving the execution queue
	var oldconfig = extend({***REMOVED***, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var urlConfigHtml = '', len = config.urlConfig.length;
	for ( var i = 0, val; i < len, val = config.urlConfig[i]; i++ ) {
		config[val] = QUnit.urlParams[val];
		urlConfigHtml += '<label***REMOVED***<input name="' + val + '" type="checkbox"' + ( config[val] ? ' checked="checked"' : '' ) + '***REMOVED***' + val + '</label***REMOVED***';
	***REMOVED***

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	***REMOVED***
	var banner = id("qunit-header");
	if ( banner ) {
		banner.innerHTML = '<a href="' + QUnit.url({ filter: undefined ***REMOVED***) + '"***REMOVED*** ' + banner.innerHTML + '</a***REMOVED*** ' + urlConfigHtml;
		addEvent( banner, "change", function( event ) {
			var params = {***REMOVED***;
			params[ event.target.name ] = event.target.checked ? true : undefined;
			window.location = QUnit.url( params );
		***REMOVED***);
	***REMOVED***

	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		addEvent( filter, "click", function() {
			var ol = document.getElementById("qunit-tests");
			if ( filter.checked ) {
				ol.className = ol.className + " hidepass";
			***REMOVED*** else {
				var tmp = " " + ol.className.replace( /[\n\t\r]/g, " " ) + " ";
				ol.className = tmp.replace(/ hidepass /, " ");
			***REMOVED***
			if ( defined.sessionStorage ) {
				if (filter.checked) {
					sessionStorage.setItem("qunit-filter-passed-tests", "true");
				***REMOVED*** else {
					sessionStorage.removeItem("qunit-filter-passed-tests");
				***REMOVED***
			***REMOVED***
		***REMOVED***);
		if ( config.hidepassed || defined.sessionStorage && sessionStorage.getItem("qunit-filter-passed-tests") ) {
			filter.checked = true;
			var ol = document.getElementById("qunit-tests");
			ol.className = ol.className + " hidepass";
		***REMOVED***
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );
	***REMOVED***

	var main = id('qunit-fixture');
	if ( main ) {
		config.fixture = main.innerHTML;
	***REMOVED***

	if (config.autostart) {
		QUnit.start();
	***REMOVED***
***REMOVED***;

addEvent(window, "load", QUnit.load);

function done() {
	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		QUnit.moduleDone( {
			name: config.currentModule,
			failed: config.moduleStats.bad,
			passed: config.moduleStats.all - config.moduleStats.bad,
			total: config.moduleStats.all
		***REMOVED*** );
	***REMOVED***

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		runtime = +new Date - config.started,
		passed = config.stats.all - config.stats.bad,
		html = [
			'Tests completed in ',
			runtime,
			' milliseconds.<br/***REMOVED***',
			'<span class="passed"***REMOVED***',
			passed,
			'</span***REMOVED*** tests of <span class="total"***REMOVED***',
			config.stats.all,
			'</span***REMOVED*** passed, <span class="failed"***REMOVED***',
			config.stats.bad,
			'</span***REMOVED*** failed.'
		].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	***REMOVED***

	if ( tests ) {
		id( "qunit-testresult" ).innerHTML = html;
	***REMOVED***

	if ( config.altertitle && typeof document !== "undefined" && document.title ) {
		// show ✖ for good, ✔ for bad suite result in title
		// use escape sequences in case file gets loaded with non-utf-8-charset
		document.title = [
			(config.stats.bad ? "\u2716" : "\u2714"),
			document.title.replace(/^[\u2714\u2716] /i, "")
		].join(" ");
	***REMOVED***

	QUnit.done( {
		failed: config.stats.bad,
		passed: passed,
		total: config.stats.all,
		runtime: runtime
	***REMOVED*** );
***REMOVED***

function validTest( name ) {
	var filter = config.filter,
		run = false;

	if ( !filter ) {
		return true;
	***REMOVED***

	var not = filter.charAt( 0 ) === "!";
	if ( not ) {
		filter = filter.slice( 1 );
	***REMOVED***

	if ( name.indexOf( filter ) !== -1 ) {
		return !not;
	***REMOVED***

	if ( not ) {
		run = true;
	***REMOVED***

	return run;
***REMOVED***

// so far supports only Firefox, Chrome and Opera (buggy)
// could be extended in the future to use something like https://github.com/csnover/TraceKit
function sourceFromStacktrace() {
	try {
		throw new Error();
	***REMOVED*** catch ( e ) {
		if (e.stacktrace) {
			// Opera
			return e.stacktrace.split("\n")[6];
		***REMOVED*** else if (e.stack) {
			// Firefox, Chrome
			return e.stack.split("\n")[4];
		***REMOVED*** else if (e.sourceURL) {
			// Safari, PhantomJS
			// TODO sourceURL points at the 'throw new Error' line above, useless
			//return e.sourceURL + ":" + e.line;
		***REMOVED***
	***REMOVED***
***REMOVED***

function escapeHtml(s) {
	if (!s) {
		return "";
	***REMOVED***
	s = s + "";
	return s.replace(/[\&"<***REMOVED***\\]/g, function(s) {
		switch(s) {
			case "&": return "&amp;";
			case "\\": return "\\\\";
			case '"': return '\"';
			case "<": return "&lt;";
			case "***REMOVED***": return "&gt;";
			default: return s;
		***REMOVED***
	***REMOVED***);
***REMOVED***

function synchronize( callback ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process();
	***REMOVED***
***REMOVED***

function process() {
	var start = (new Date()).getTime();

	while ( config.queue.length && !config.blocking ) {
		if ( config.updateRate <= 0 || (((new Date()).getTime() - start) < config.updateRate) ) {
			config.queue.shift()();
		***REMOVED*** else {
			window.setTimeout( process, 13 );
			break;
		***REMOVED***
	***REMOVED***
	if (!config.blocking && !config.queue.length) {
		done();
	***REMOVED***
***REMOVED***

function saveGlobal() {
	config.pollution = [];

	if ( config.noglobals ) {
		for ( var key in window ) {
			config.pollution.push( key );
		***REMOVED***
	***REMOVED***
***REMOVED***

function checkPollution( name ) {
	var old = config.pollution;
	saveGlobal();

	var newGlobals = diff( config.pollution, old );
	if ( newGlobals.length ***REMOVED*** 0 ) {
		ok( false, "Introduced global variable(s): " + newGlobals.join(", ") );
	***REMOVED***

	var deletedGlobals = diff( old, config.pollution );
	if ( deletedGlobals.length ***REMOVED*** 0 ) {
		ok( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
	***REMOVED***
***REMOVED***

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			***REMOVED***
		***REMOVED***
	***REMOVED***
	return result;
***REMOVED***

function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());

	***REMOVED*** else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	***REMOVED***
***REMOVED***

function extend(a, b) {
	for ( var prop in b ) {
		if ( b[prop] === undefined ) {
			delete a[prop];
		***REMOVED*** else {
			a[prop] = b[prop];
		***REMOVED***
	***REMOVED***

	return a;
***REMOVED***

function addEvent(elem, type, fn) {
	if ( elem.addEventListener ) {
		elem.addEventListener( type, fn, false );
	***REMOVED*** else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, fn );
	***REMOVED*** else {
		fn();
	***REMOVED***
***REMOVED***

function id(name) {
	return !!(typeof document !== "undefined" && document && document.getElementById) &&
		document.getElementById( name );
***REMOVED***

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com***REMOVED***
QUnit.equiv = function () {

	var innerEquiv; // the real equiv function
	var callers = []; // stack to decide between skip/abort functions
	var parents = []; // stack to avoiding loops from circular referencing

	// Call the o related callback with the given arguments.
	function bindCallbacks(o, callbacks, args) {
		var prop = QUnit.objectType(o);
		if (prop) {
			if (QUnit.objectType(callbacks[prop]) === "function") {
				return callbacks[prop].apply(callbacks, args);
			***REMOVED*** else {
				return callbacks[prop]; // or undefined
			***REMOVED***
		***REMOVED***
	***REMOVED***

	var callbacks = function () {

		// for string, boolean, number and null
		function useStrictEquality(b, a) {
			if (b instanceof a.constructor || a instanceof b.constructor) {
				// to catch short annotaion VS 'new' annotation of a
				// declaration
				// e.g. var i = 1;
				// var j = new Number(1);
				return a == b;
			***REMOVED*** else {
				return a === b;
			***REMOVED***
		***REMOVED***

		return {
			"string" : useStrictEquality,
			"boolean" : useStrictEquality,
			"number" : useStrictEquality,
			"null" : useStrictEquality,
			"undefined" : useStrictEquality,

			"nan" : function(b) {
				return isNaN(b);
			***REMOVED***,

			"date" : function(b, a) {
				return QUnit.objectType(b) === "date"
						&& a.valueOf() === b.valueOf();
			***REMOVED***,

			"regexp" : function(b, a) {
				return QUnit.objectType(b) === "regexp"
						&& a.source === b.source && // the regex itself
						a.global === b.global && // and its modifers
													// (gmi) ***REMOVED***
						a.ignoreCase === b.ignoreCase
						&& a.multiline === b.multiline;
			***REMOVED***,

			// - skip when the property is a method of an instance (OOP)
			// - abort otherwise,
			// initial === would have catch identical references anyway
			"function" : function() {
				var caller = callers[callers.length - 1];
				return caller !== Object && typeof caller !== "undefined";
			***REMOVED***,

			"array" : function(b, a) {
				var i, j, loop;
				var len;

				// b could be an object literal here
				if (!(QUnit.objectType(b) === "array")) {
					return false;
				***REMOVED***

				len = a.length;
				if (len !== b.length) { // safe and faster
					return false;
				***REMOVED***

				// track reference to avoid circular references
				parents.push(a);
				for (i = 0; i < len; i++) {
					loop = false;
					for (j = 0; j < parents.length; j++) {
						if (parents[j] === a[i]) {
							loop = true;// dont rewalk array
						***REMOVED***
					***REMOVED***
					if (!loop && !innerEquiv(a[i], b[i])) {
						parents.pop();
						return false;
					***REMOVED***
				***REMOVED***
				parents.pop();
				return true;
			***REMOVED***,

			"object" : function(b, a) {
				var i, j, loop;
				var eq = true; // unless we can proove it
				var aProperties = [], bProperties = []; // collection of
														// strings

				// comparing constructors is more strict than using
				// instanceof
				if (a.constructor !== b.constructor) {
					return false;
				***REMOVED***

				// stack constructor before traversing properties
				callers.push(a.constructor);
				// track reference to avoid circular references
				parents.push(a);

				for (i in a) { // be strict: don't ensures hasOwnProperty
								// and go deep
					loop = false;
					for (j = 0; j < parents.length; j++) {
						if (parents[j] === a[i])
							loop = true; // don't go down the same path
											// twice
					***REMOVED***
					aProperties.push(i); // collect a's properties

					if (!loop && !innerEquiv(a[i], b[i])) {
						eq = false;
						break;
					***REMOVED***
				***REMOVED***

				callers.pop(); // unstack, we are done
				parents.pop();

				for (i in b) {
					bProperties.push(i); // collect b's properties
				***REMOVED***

				// Ensures identical properties name
				return eq
						&& innerEquiv(aProperties.sort(), bProperties
								.sort());
			***REMOVED***
		***REMOVED***;
	***REMOVED***();

	innerEquiv = function() { // can take multiple arguments
		var args = Array.prototype.slice.apply(arguments);
		if (args.length < 2) {
			return true; // end transition
		***REMOVED***

		return (function(a, b) {
			if (a === b) {
				return true; // catch the most you can
			***REMOVED*** else if (a === null || b === null || typeof a === "undefined"
					|| typeof b === "undefined"
					|| QUnit.objectType(a) !== QUnit.objectType(b)) {
				return false; // don't lose time with error prone cases
			***REMOVED*** else {
				return bindCallbacks(a, callbacks, [ b, a ]);
			***REMOVED***

			// apply transition with (1..n) arguments
		***REMOVED***)(args[0], args[1])
				&& arguments.callee.apply(this, args.splice(1,
						args.length - 1));
	***REMOVED***;

	return innerEquiv;

***REMOVED***();

/**
 * jsDump Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com |
 * http://flesler.blogspot.com Licensed under BSD
 * (http://www.opensource.org/licenses/bsd-license.php) Date: 5/15/2008
 *
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html***REMOVED***
 */
QUnit.jsDump = (function() {
	function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	***REMOVED***;
	function literal( o ) {
		return o + '';
	***REMOVED***;
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join )
			arr = arr.join( ',' + s + inner );
		if ( !arr )
			return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
	***REMOVED***;
	function array( arr, stack ) {
		var i = arr.length, ret = Array(i);
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] , undefined , stack);
		this.down();
		return join( '[', ret, ']' );
	***REMOVED***;

	var reName = /^function (\w+)/;

	var jsDump = {
		parse:function( obj, type, stack ) { //type is used mostly internally, you can fix a (custom)type in advance
			stack = stack || [ ];
			var parser = this.parsers[ type || this.typeOf(obj) ];
			type = typeof parser;
			var inStack = inArray(obj, stack);
			if (inStack != -1) {
				return 'recursion('+(inStack - stack.length)+')';
			***REMOVED***
			//else
			if (type == 'function')  {
					stack.push(obj);
					var res = parser.call( this, obj, stack );
					stack.pop();
					return res;
			***REMOVED***
			// else
			return (type == 'string') ? parser : this.parsers.error;
		***REMOVED***,
		typeOf:function( obj ) {
			var type;
			if ( obj === null ) {
				type = "null";
			***REMOVED*** else if (typeof obj === "undefined") {
				type = "undefined";
			***REMOVED*** else if (QUnit.is("RegExp", obj)) {
				type = "regexp";
			***REMOVED*** else if (QUnit.is("Date", obj)) {
				type = "date";
			***REMOVED*** else if (QUnit.is("Function", obj)) {
				type = "function";
			***REMOVED*** else if (typeof obj.setInterval !== undefined && typeof obj.document !== "undefined" && typeof obj.nodeType === "undefined") {
				type = "window";
			***REMOVED*** else if (obj.nodeType === 9) {
				type = "document";
			***REMOVED*** else if (obj.nodeType) {
				type = "node";
			***REMOVED*** else if (typeof obj === "object" && typeof obj.length === "number" && obj.length ***REMOVED***= 0) {
				type = "array";
			***REMOVED*** else {
				type = typeof obj;
			***REMOVED***
			return type;
		***REMOVED***,
		separator:function() {
			return this.multiline ?	this.HTML ? '<br /***REMOVED***' : '\n' : this.HTML ? '&nbsp;' : ' ';
		***REMOVED***,
		indent:function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
			if ( !this.multiline )
				return '';
			var chr = this.indentChar;
			if ( this.HTML )
				chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
			return Array( this._depth_ + (extra||0) ).join(chr);
		***REMOVED***,
		up:function( a ) {
			this._depth_ += a || 1;
		***REMOVED***,
		down:function( a ) {
			this._depth_ -= a || 1;
		***REMOVED***,
		setParser:function( name, parser ) {
			this.parsers[name] = parser;
		***REMOVED***,
		// The next 3 are exposed so you can use them
		quote:quote,
		literal:literal,
		join:join,
		//
		_depth_: 1,
		// This is the list of parsers, to modify them, use jsDump.setParser
		parsers:{
			window: '[Window]',
			document: '[Document]',
			error:'[ERROR]', //when no parser is found, shouldn't happen
			unknown: '[Unknown]',
			'null':'null',
			'undefined':'undefined',
			'function':function( fn ) {
				var ret = 'function',
					name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
				if ( name )
					ret += ' ' + name;
				ret += '(';

				ret = [ ret, QUnit.jsDump.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, QUnit.jsDump.parse(fn,'functionCode'), '***REMOVED***' );
			***REMOVED***,
			array: array,
			nodelist: array,
			arguments: array,
			object:function( map, stack ) {
				var ret = [ ];
				QUnit.jsDump.up();
				for ( var key in map ) {
				    var val = map[key];
					ret.push( QUnit.jsDump.parse(key,'key') + ': ' + QUnit.jsDump.parse(val, undefined, stack));
          ***REMOVED***
				QUnit.jsDump.down();
				return join( '{', ret, '***REMOVED***' );
			***REMOVED***,
			node:function( node ) {
				var open = QUnit.jsDump.HTML ? '&lt;' : '<',
					close = QUnit.jsDump.HTML ? '&gt;' : '***REMOVED***';

				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;

				for ( var a in QUnit.jsDump.DOMAttrs ) {
					var val = node[QUnit.jsDump.DOMAttrs[a]];
					if ( val )
						ret += ' ' + a + '=' + QUnit.jsDump.parse( val, 'attribute' );
				***REMOVED***
				return ret + close + open + '/' + tag + close;
			***REMOVED***,
			functionArgs:function( fn ) {//function calls it internally, it's the arguments part of the function
				var l = fn.length;
				if ( !l ) return '';

				var args = Array(l);
				while ( l-- )
					args[l] = String.fromCharCode(97+l);//97 is 'a'
				return ' ' + args.join(', ') + ' ';
			***REMOVED***,
			key:quote, //object calls it internally, the key part of an item in a map
			functionCode:'[code]', //function calls it internally, it's the content of the function
			attribute:quote, //node calls it internally, it's an html attribute value
			string:quote,
			date:quote,
			regexp:literal, //regex
			number:literal,
			'boolean':literal
		***REMOVED***,
		DOMAttrs:{//attributes to dump from nodes, name=***REMOVED***realName
			id:'id',
			name:'name',
			'class':'className'
		***REMOVED***,
		HTML:false,//if true, entities are escaped ( <, ***REMOVED***, \t, space and \n )
		indentChar:'  ',//indentation unit
		multiline:true //if true, items in a collection, are separated by a \n, else just a space.
	***REMOVED***;

	return jsDump;
***REMOVED***)();

// from Sizzle.js
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		***REMOVED*** else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		***REMOVED***
	***REMOVED***

	return ret;
***REMOVED***;

//from jquery.js
function inArray( elem, array ) {
	if ( array.indexOf ) {
		return array.indexOf( elem );
	***REMOVED***

	for ( var i = 0, length = array.length; i < length; i++ ) {
		if ( array[ i ] === elem ) {
			return i;
		***REMOVED***
	***REMOVED***

	return -1;
***REMOVED***

/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *
 * Usage: QUnit.diff(expected, actual)
 *
 * QUnit.diff("the quick brown fox jumped over", "the quick fox jumps over") == "the  quick <del***REMOVED***brown </del***REMOVED*** fox <del***REMOVED***jumped </del***REMOVED***<ins***REMOVED***jumps </ins***REMOVED*** over"
 */
QUnit.diff = (function() {
	function diff(o, n) {
		var ns = {***REMOVED***;
		var os = {***REMOVED***;

		for (var i = 0; i < n.length; i++) {
			if (ns[n[i]] == null)
				ns[n[i]] = {
					rows: [],
					o: null
				***REMOVED***;
			ns[n[i]].rows.push(i);
		***REMOVED***

		for (var i = 0; i < o.length; i++) {
			if (os[o[i]] == null)
				os[o[i]] = {
					rows: [],
					n: null
				***REMOVED***;
			os[o[i]].rows.push(i);
		***REMOVED***

		for (var i in ns) {
			if (ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1) {
				n[ns[i].rows[0]] = {
					text: n[ns[i].rows[0]],
					row: os[i].rows[0]
				***REMOVED***;
				o[os[i].rows[0]] = {
					text: o[os[i].rows[0]],
					row: ns[i].rows[0]
				***REMOVED***;
			***REMOVED***
		***REMOVED***

		for (var i = 0; i < n.length - 1; i++) {
			if (n[i].text != null && n[i + 1].text == null && n[i].row + 1 < o.length && o[n[i].row + 1].text == null &&
			n[i + 1] == o[n[i].row + 1]) {
				n[i + 1] = {
					text: n[i + 1],
					row: n[i].row + 1
				***REMOVED***;
				o[n[i].row + 1] = {
					text: o[n[i].row + 1],
					row: i + 1
				***REMOVED***;
			***REMOVED***
		***REMOVED***

		for (var i = n.length - 1; i ***REMOVED*** 0; i--) {
			if (n[i].text != null && n[i - 1].text == null && n[i].row ***REMOVED*** 0 && o[n[i].row - 1].text == null &&
			n[i - 1] == o[n[i].row - 1]) {
				n[i - 1] = {
					text: n[i - 1],
					row: n[i].row - 1
				***REMOVED***;
				o[n[i].row - 1] = {
					text: o[n[i].row - 1],
					row: i - 1
				***REMOVED***;
			***REMOVED***
		***REMOVED***

		return {
			o: o,
			n: n
		***REMOVED***;
	***REMOVED***

	return function(o, n) {
		o = o.replace(/\s+$/, '');
		n = n.replace(/\s+$/, '');
		var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/));

		var str = "";

		var oSpace = o.match(/\s+/g);
		if (oSpace == null) {
			oSpace = [" "];
		***REMOVED***
		else {
			oSpace.push(" ");
		***REMOVED***
		var nSpace = n.match(/\s+/g);
		if (nSpace == null) {
			nSpace = [" "];
		***REMOVED***
		else {
			nSpace.push(" ");
		***REMOVED***

		if (out.n.length == 0) {
			for (var i = 0; i < out.o.length; i++) {
				str += '<del***REMOVED***' + out.o[i] + oSpace[i] + "</del***REMOVED***";
			***REMOVED***
		***REMOVED***
		else {
			if (out.n[0].text == null) {
				for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
					str += '<del***REMOVED***' + out.o[n] + oSpace[n] + "</del***REMOVED***";
				***REMOVED***
			***REMOVED***

			for (var i = 0; i < out.n.length; i++) {
				if (out.n[i].text == null) {
					str += '<ins***REMOVED***' + out.n[i] + nSpace[i] + "</ins***REMOVED***";
				***REMOVED***
				else {
					var pre = "";

					for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++) {
						pre += '<del***REMOVED***' + out.o[n] + oSpace[n] + "</del***REMOVED***";
					***REMOVED***
					str += " " + out.n[i].text + nSpace[i] + pre;
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return str;
	***REMOVED***;
***REMOVED***)();

***REMOVED***)(this);