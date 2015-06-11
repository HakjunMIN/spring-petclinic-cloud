define([
	"../core",
	"../event"
], function( jQuery ) {

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length ***REMOVED*** 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	***REMOVED***;
***REMOVED***);

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	***REMOVED***,

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	***REMOVED***,
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	***REMOVED***,

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	***REMOVED***,
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	***REMOVED***
***REMOVED***);

***REMOVED***);
