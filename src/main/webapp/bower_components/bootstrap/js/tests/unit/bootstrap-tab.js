$(function () {

    module("bootstrap-tabs")

      test("should provide no conflict", function () {
        var tab = $.fn.tab.noConflict()
        ok(!$.fn.tab, 'tab was set back to undefined (org value)')
        $.fn.tab = tab
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).tab, 'tabs method is defined')
***REMOVED***)

      test("should return element", function () {
        ok($(document.body).tab()[0] == document.body, 'document.body returned')
***REMOVED***)

      test("should activate element by tab id", function () {
        var tabsHTML =
            '<ul class="tabs"***REMOVED***'
          + '<li***REMOVED***<a href="#home"***REMOVED***Home</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#profile"***REMOVED***Profile</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'

        $('<ul***REMOVED***<li id="home"***REMOVED***</li***REMOVED***<li id="profile"***REMOVED***</li***REMOVED***</ul***REMOVED***').appendTo("#qunit-fixture")

        $(tabsHTML).find('li:last a').tab('show')
        equals($("#qunit-fixture").find('.active').attr('id'), "profile")

        $(tabsHTML).find('li:first a').tab('show')
        equals($("#qunit-fixture").find('.active').attr('id'), "home")
***REMOVED***)

      test("should activate element by tab id", function () {
        var pillsHTML =
            '<ul class="pills"***REMOVED***'
          + '<li***REMOVED***<a href="#home"***REMOVED***Home</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#profile"***REMOVED***Profile</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'

        $('<ul***REMOVED***<li id="home"***REMOVED***</li***REMOVED***<li id="profile"***REMOVED***</li***REMOVED***</ul***REMOVED***').appendTo("#qunit-fixture")

        $(pillsHTML).find('li:last a').tab('show')
        equals($("#qunit-fixture").find('.active').attr('id'), "profile")

        $(pillsHTML).find('li:first a').tab('show')
        equals($("#qunit-fixture").find('.active').attr('id'), "home")
***REMOVED***)


      test("should not fire closed when close is prevented", function () {
        $.support.transition = false
        stop();
        $('<div class="tab"/***REMOVED***')
          .bind('show', function (e) {
            e.preventDefault();
            ok(true);
            start();
    ***REMOVED***)
          .bind('shown', function () {
            ok(false);
    ***REMOVED***)
          .tab('show')
***REMOVED***)

      test("show and shown events should reference correct relatedTarget", function () {
        var dropHTML =
            '<ul class="drop"***REMOVED***'
          + '<li class="dropdown"***REMOVED***<a data-toggle="dropdown" href="#"***REMOVED***1</a***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#1-1" data-toggle="tab"***REMOVED***1-1</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#1-2" data-toggle="tab"***REMOVED***1-2</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'

        $(dropHTML).find('ul***REMOVED***li:first a').tab('show').end()
          .find('ul***REMOVED***li:last a').on('show', function(event){
            equals(event.relatedTarget.hash, "#1-1")
    ***REMOVED***).on('shown', function(event){
            equals(event.relatedTarget.hash, "#1-1")
    ***REMOVED***).tab('show')
***REMOVED***)

***REMOVED***)