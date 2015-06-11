define([
	"./core"
], function( jQuery ) {

/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("***REMOVED*** *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div ***REMOVED*** *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var docElem = window.document.documentElement,
	selector_hasDuplicate,
	matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector,
	selector_sortOrder = function( a, b ) {
		// Flag for duplicate removal
		if ( a === b ) {
			selector_hasDuplicate = true;
			return 0;
		***REMOVED***

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ) {

				// Choose the first element that is related to our document
				if ( a === document || jQuery.contains(document, a) ) {
					return -1;
				***REMOVED***
				if ( b === document || jQuery.contains(document, b) ) {
					return 1;
				***REMOVED***

				// Maintain original order
				return 0;
			***REMOVED***

			return compare & 4 ? -1 : 1;
		***REMOVED***

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	***REMOVED***;

jQuery.extend({
	find: function( selector, context, results, seed ) {
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) {
			return results;
		***REMOVED***

		// Early return if context is not an element or document
		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
			return [];
		***REMOVED***

		if ( seed ) {
			while ( (elem = seed[i++]) ) {
				if ( jQuery.find.matchesSelector(elem, selector) ) {
					results.push( elem );
				***REMOVED***
			***REMOVED***
		***REMOVED*** else {
			jQuery.merge( results, context.querySelectorAll(selector) );
		***REMOVED***

		return results;
	***REMOVED***,
	unique: function( results ) {
		var elem,
			duplicates = [],
			i = 0,
			j = 0;

		selector_hasDuplicate = false;
		results.sort( selector_sortOrder );

		if ( selector_hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				***REMOVED***
			***REMOVED***
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			***REMOVED***
		***REMOVED***

		return results;
	***REMOVED***,
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += jQuery.text( node );
			***REMOVED***
		***REMOVED*** else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			return elem.textContent;
		***REMOVED*** else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		***REMOVED***
		// Do not include comment or processing instruction nodes

		return ret;
	***REMOVED***,
	contains: function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains(bup) );
	***REMOVED***,
	isXMLDoc: function( elem ) {
		return (elem.ownerDocument || elem).documentElement.nodeName !== "HTML";
	***REMOVED***,
	expr: {
		attrHandle: {***REMOVED***,
		match: {
			bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
			needsContext: /^[\x20\t\r\n\f]*[***REMOVED***+~]/
		***REMOVED***
	***REMOVED***
***REMOVED***);

jQuery.extend( jQuery.find, {
	matches: function( expr, elements ) {
		return jQuery.find( expr, null, null, elements );
	***REMOVED***,
	matchesSelector: function( elem, expr ) {
		return matches.call( elem, expr );
	***REMOVED***,
	attr: function( elem, name ) {
		return elem.getAttribute( name );
	***REMOVED***
***REMOVED***);

***REMOVED***);
