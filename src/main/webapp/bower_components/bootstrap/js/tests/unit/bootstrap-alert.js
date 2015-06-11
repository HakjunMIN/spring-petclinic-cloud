$(function () {

    module("bootstrap-alerts")

      test("should provide no conflict", function () {
        var alert = $.fn.alert.noConflict()
        ok(!$.fn.alert, 'alert was set back to undefined (org value)')
        $.fn.alert = alert
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).alert, 'alert method is defined')
***REMOVED***)

      test("should return element", function () {
        ok($(document.body).alert()[0] == document.body, 'document.body returned')
***REMOVED***)

      test("should fade element out on clicking .close", function () {
        var alertHTML = '<div class="alert-message warning fade in"***REMOVED***'
          + '<a class="close" href="#" data-dismiss="alert"***REMOVED***×</a***REMOVED***'
          + '<p***REMOVED***<strong***REMOVED***Holy guacamole!</strong***REMOVED*** Best check yo self, you\'re not looking too good.</p***REMOVED***'
          + '</div***REMOVED***'
          , alert = $(alertHTML).alert()

        alert.find('.close').click()

        ok(!alert.hasClass('in'), 'remove .in class on .close click')
***REMOVED***)

      test("should remove element when clicking .close", function () {
        $.support.transition = false

        var alertHTML = '<div class="alert-message warning fade in"***REMOVED***'
          + '<a class="close" href="#" data-dismiss="alert"***REMOVED***×</a***REMOVED***'
          + '<p***REMOVED***<strong***REMOVED***Holy guacamole!</strong***REMOVED*** Best check yo self, you\'re not looking too good.</p***REMOVED***'
          + '</div***REMOVED***'
          , alert = $(alertHTML).appendTo('#qunit-fixture').alert()

        ok($('#qunit-fixture').find('.alert-message').length, 'element added to dom')

        alert.find('.close').click()

        ok(!$('#qunit-fixture').find('.alert-message').length, 'element removed from dom')
***REMOVED***)

      test("should not fire closed when close is prevented", function () {
        $.support.transition = false
        stop();
        $('<div class="alert"/***REMOVED***')
          .bind('close', function (e) {
            e.preventDefault();
            ok(true);
            start();
    ***REMOVED***)
          .bind('closed', function () {
            ok(false);
    ***REMOVED***)
          .alert('close')
***REMOVED***)

***REMOVED***)