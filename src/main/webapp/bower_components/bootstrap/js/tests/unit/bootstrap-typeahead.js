$(function () {

    module("bootstrap-typeahead")

      test("should provide no conflict", function () {
        var typeahead = $.fn.typeahead.noConflict()
        ok(!$.fn.typeahead, 'typeahead was set back to undefined (org value)')
        $.fn.typeahead = typeahead
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).typeahead, 'alert method is defined')
***REMOVED***)

      test("should return element", function () {
        ok($(document.body).typeahead()[0] == document.body, 'document.body returned')
***REMOVED***)

      test("should listen to an input", function () {
        var $input = $('<input /***REMOVED***')
        $input.typeahead()
        ok($._data($input[0], 'events').blur, 'has a blur event')
        ok($._data($input[0], 'events').keypress, 'has a keypress event')
        ok($._data($input[0], 'events').keyup, 'has a keyup event')
***REMOVED***)

      test("should create a menu", function () {
        var $input = $('<input /***REMOVED***')
        ok($input.typeahead().data('typeahead').$menu, 'has a menu')
***REMOVED***)

      test("should listen to the menu", function () {
        var $input = $('<input /***REMOVED***')
          , $menu = $input.typeahead().data('typeahead').$menu

        ok($._data($menu[0], 'events').mouseover, 'has a mouseover(pseudo: mouseenter)')
        ok($._data($menu[0], 'events').click, 'has a click')
***REMOVED***)

      test("should show menu when query entered", function () {
        var $input = $('<input /***REMOVED***')
            .appendTo('body')
            .typeahead({
              source: ['aa', 'ab', 'ac']
      ***REMOVED***)
          , typeahead = $input.data('typeahead')

        $input.val('a')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should accept data source via synchronous function", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: function () {
                return ['aa', 'ab', 'ac']
        ***REMOVED***
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('a')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should accept data source via asynchronous function", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: function (query, process) {
                process(['aa', 'ab', 'ac'])
        ***REMOVED***
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('a')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should not explode when regex chars are entered", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: ['aa', 'ab', 'ac', 'mdo*', 'fat+']
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('+')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 1, 'has 1 item in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should hide menu when query entered", function () {
        stop()
        var $input = $('<input /***REMOVED***').typeahead({
              source: ['aa', 'ab', 'ac']
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('a')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')

        $input.blur()

        setTimeout(function () {
          ok(!typeahead.$menu.is(":visible"), "typeahead is no longer visible")
          start()
  ***REMOVED***, 200)

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should set next item when down arrow is pressed", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: ['aa', 'ab', 'ac']
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('a')
        typeahead.lookup()

        ok(typeahead.$menu.is(":visible"), 'typeahead is visible')
        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')
        equals(typeahead.$menu.find('.active').length, 1, 'one item is active')
        ok(typeahead.$menu.find('li').first().hasClass('active'), "first item is active")

        // simulate entire key pressing event
        $input.trigger({
          type: 'keydown'
        , keyCode: 40
  ***REMOVED***)
        .trigger({
          type: 'keypress'
        , keyCode: 40
  ***REMOVED***)
        .trigger({
          type: 'keyup'
        , keyCode: 40
  ***REMOVED***)

        ok(typeahead.$menu.find('li').first().next().hasClass('active'), "second item is active")

        $input.trigger({
          type: 'keydown'
        , keyCode: 38
  ***REMOVED***)
        .trigger({
          type: 'keypress'
        , keyCode: 38
  ***REMOVED***)
        .trigger({
          type: 'keyup'
        , keyCode: 38
  ***REMOVED***)

        ok(typeahead.$menu.find('li').first().hasClass('active'), "first item is active")

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)


      test("should set input value to selected item", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: ['aa', 'ab', 'ac']
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')
          , changed = false
          , focus = false
          , blur = false

        $input.val('a')
        typeahead.lookup()

        $input.change(function() { changed = true ***REMOVED***);
        $input.focus(function() { focus = true; blur = false ***REMOVED***);
        $input.blur(function() { blur = true; focus = false ***REMOVED***);

        $(typeahead.$menu.find('li')[2]).mouseover().click()

        equals($input.val(), 'ac', 'input value was correctly set')
        ok(!typeahead.$menu.is(':visible'), 'the menu was hidden')
        ok(changed, 'a change event was fired')
        ok(focus && !blur, 'focus is still set')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)

      test("should start querying when minLength is met", function () {
        var $input = $('<input /***REMOVED***').typeahead({
              source: ['aaaa', 'aaab', 'aaac'],
              minLength: 3
      ***REMOVED***).appendTo('body')
          , typeahead = $input.data('typeahead')

        $input.val('aa')
        typeahead.lookup()

        equals(typeahead.$menu.find('li').length, 0, 'has 0 items in menu')

        $input.val('aaa')
        typeahead.lookup()

        equals(typeahead.$menu.find('li').length, 3, 'has 3 items in menu')

        $input.remove()
        typeahead.$menu.remove()
***REMOVED***)
***REMOVED***)
