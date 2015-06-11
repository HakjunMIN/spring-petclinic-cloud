$(function () {

    module("bootstrap-scrollspy")

      test("should provide no conflict", function () {
        var scrollspy = $.fn.scrollspy.noConflict()
        ok(!$.fn.scrollspy, 'scrollspy was set back to undefined (org value)')
        $.fn.scrollspy = scrollspy
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).scrollspy, 'scrollspy method is defined')
***REMOVED***)

      test("should return element", function () {
        ok($(document.body).scrollspy()[0] == document.body, 'document.body returned')
***REMOVED***)

      test("should switch active class on scroll", function () {
        var sectionHTML = '<div id="masthead"***REMOVED***</div***REMOVED***'
          , $section = $(sectionHTML).append('#qunit-fixture')
          , topbarHTML ='<div class="topbar"***REMOVED***'
          + '<div class="topbar-inner"***REMOVED***'
          + '<div class="container"***REMOVED***'
          + '<h3***REMOVED***<a href="#"***REMOVED***Bootstrap</a***REMOVED***</h3***REMOVED***'
          + '<ul class="nav"***REMOVED***'
          + '<li***REMOVED***<a href="#masthead"***REMOVED***Overview</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</div***REMOVED***'
          + '</div***REMOVED***'
          + '</div***REMOVED***'
          , $topbar = $(topbarHTML).scrollspy()

        ok($topbar.find('.active', true))
***REMOVED***)

***REMOVED***)