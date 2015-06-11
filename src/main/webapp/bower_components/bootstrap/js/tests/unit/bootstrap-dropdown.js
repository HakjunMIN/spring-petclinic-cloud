$(function () {

    module("bootstrap-dropdowns")

      test("should provide no conflict", function () {
        var dropdown = $.fn.dropdown.noConflict()
        ok(!$.fn.dropdown, 'dropdown was set back to undefined (org value)')
        $.fn.dropdown = dropdown
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).dropdown, 'dropdown method is defined')
***REMOVED***)

      test("should return element", function () {
        var el = $("<div /***REMOVED***")
        ok(el.dropdown()[0] === el[0], 'same element returned')
***REMOVED***)

      test("should not open dropdown if target is disabled", function () {
        var dropdownHTML = '<ul class="tabs"***REMOVED***'
          + '<li class="dropdown"***REMOVED***'
          + '<button disabled href="#" class="btn dropdown-toggle" data-toggle="dropdown"***REMOVED***Dropdown</button***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Secondary link</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Something else here</a***REMOVED***</li***REMOVED***'
          + '<li class="divider"***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Another link</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'
          , dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').dropdown().click()

        ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
***REMOVED***)

      test("should not open dropdown if target is disabled", function () {
        var dropdownHTML = '<ul class="tabs"***REMOVED***'
          + '<li class="dropdown"***REMOVED***'
          + '<button href="#" class="btn dropdown-toggle disabled" data-toggle="dropdown"***REMOVED***Dropdown</button***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Secondary link</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Something else here</a***REMOVED***</li***REMOVED***'
          + '<li class="divider"***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Another link</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'
          , dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').dropdown().click()

        ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
***REMOVED***)

      test("should add class open to menu if clicked", function () {
        var dropdownHTML = '<ul class="tabs"***REMOVED***'
          + '<li class="dropdown"***REMOVED***'
          + '<a href="#" class="dropdown-toggle" data-toggle="dropdown"***REMOVED***Dropdown</a***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Secondary link</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Something else here</a***REMOVED***</li***REMOVED***'
          + '<li class="divider"***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Another link</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'
          , dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').dropdown().click()

        ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
***REMOVED***)

      test("should test if element has a # before assuming it's a selector", function () {
        var dropdownHTML = '<ul class="tabs"***REMOVED***'
          + '<li class="dropdown"***REMOVED***'
          + '<a href="/foo/" class="dropdown-toggle" data-toggle="dropdown"***REMOVED***Dropdown</a***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Secondary link</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Something else here</a***REMOVED***</li***REMOVED***'
          + '<li class="divider"***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Another link</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'
          , dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').dropdown().click()

        ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
***REMOVED***)


      test("should remove open class if body clicked", function () {
        var dropdownHTML = '<ul class="tabs"***REMOVED***'
          + '<li class="dropdown"***REMOVED***'
          + '<a href="#" class="dropdown-toggle" data-toggle="dropdown"***REMOVED***Dropdown</a***REMOVED***'
          + '<ul class="dropdown-menu"***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Secondary link</a***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Something else here</a***REMOVED***</li***REMOVED***'
          + '<li class="divider"***REMOVED***</li***REMOVED***'
          + '<li***REMOVED***<a href="#"***REMOVED***Another link</a***REMOVED***</li***REMOVED***'
          + '</ul***REMOVED***'
          + '</li***REMOVED***'
          + '</ul***REMOVED***'
          , dropdown = $(dropdownHTML)
            .appendTo('#qunit-fixture')
            .find('[data-toggle="dropdown"]')
            .dropdown()
            .click()
        ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
        $('body').click()
        ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class removed')
        dropdown.remove()
***REMOVED***)

      test("should remove open class if body clicked, with multiple drop downs", function () {
          var dropdownHTML =
            '<ul class="nav"***REMOVED***'
            + '    <li***REMOVED***<a href="#menu1"***REMOVED***Menu 1</a***REMOVED***</li***REMOVED***'
            + '    <li class="dropdown" id="testmenu"***REMOVED***'
            + '      <a class="dropdown-toggle" data-toggle="dropdown" href="#testmenu"***REMOVED***Test menu <b class="caret"***REMOVED***</b***REMOVED***</a***REMOVED***'
            + '      <ul class="dropdown-menu" role="menu"***REMOVED***'
            + '        <li***REMOVED***<a href="#sub1"***REMOVED***Submenu 1</a***REMOVED***</li***REMOVED***'
            + '      </ul***REMOVED***'
            + '    </li***REMOVED***'
            + '</ul***REMOVED***'
            + '<div class="btn-group"***REMOVED***'
            + '    <button class="btn"***REMOVED***Actions</button***REMOVED***'
            + '    <button class="btn dropdown-toggle" data-toggle="dropdown"***REMOVED***<span class="caret"***REMOVED***</span***REMOVED***</button***REMOVED***'
            + '    <ul class="dropdown-menu"***REMOVED***'
            + '        <li***REMOVED***<a href="#"***REMOVED***Action 1</a***REMOVED***</li***REMOVED***'
            + '    </ul***REMOVED***'
            + '</div***REMOVED***'
          , dropdowns = $(dropdownHTML).appendTo('#qunit-fixture').find('[data-toggle="dropdown"]')
          , first = dropdowns.first()
          , last = dropdowns.last()

        ok(dropdowns.length == 2, "Should be two dropdowns")

        first.click()
        ok(first.parents('.open').length == 1, 'open class added on click')
        ok($('#qunit-fixture .open').length == 1, 'only one object is open')
        $('body').click()
        ok($("#qunit-fixture .open").length === 0, 'open class removed')

        last.click()
        ok(last.parent('.open').length == 1, 'open class added on click')
        ok($('#qunit-fixture .open').length == 1, 'only one object is open')
        $('body').click()
        ok($("#qunit-fixture .open").length === 0, 'open class removed')

        $("#qunit-fixture").html("")
***REMOVED***)

***REMOVED***)