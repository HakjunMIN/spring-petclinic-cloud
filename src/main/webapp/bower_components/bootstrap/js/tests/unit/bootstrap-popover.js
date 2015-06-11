$(function () {

    module("bootstrap-popover")

      test("should provide no conflict", function () {
        var popover = $.fn.popover.noConflict()
        ok(!$.fn.popover, 'popover was set back to undefined (org value)')
        $.fn.popover = popover
***REMOVED***)

      test("should be defined on jquery object", function () {
        var div = $('<div***REMOVED***</div***REMOVED***')
        ok(div.popover, 'popover method is defined')
***REMOVED***)

      test("should return element", function () {
        var div = $('<div***REMOVED***</div***REMOVED***')
        ok(div.popover() == div, 'document.body returned')
***REMOVED***)

      test("should render popover element", function () {
        $.support.transition = false
        var popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo"***REMOVED***@mdo</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .popover('show')

        ok($('.popover').length, 'popover was inserted')
        popover.popover('hide')
        ok(!$(".popover").length, 'popover removed')
***REMOVED***)

      test("should store popover instance in popover data object", function () {
        $.support.transition = false
        var popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo"***REMOVED***@mdo</a***REMOVED***')
          .popover()

        ok(!!popover.data('popover'), 'popover instance exists')
***REMOVED***)

      test("should get title and content from options", function () {
        $.support.transition = false
        var popover = $('<a href="#"***REMOVED***@fat</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .popover({
            title: function () {
              return '@fat'
      ***REMOVED***
          , content: function () {
              return 'loves writing tests （╯°□°）╯︵ ┻━┻'
      ***REMOVED***
    ***REMOVED***)

        popover.popover('show')

        ok($('.popover').length, 'popover was inserted')
        equals($('.popover .popover-title').text(), '@fat', 'title correctly inserted')
        equals($('.popover .popover-content').text(), 'loves writing tests （╯°□°）╯︵ ┻━┻', 'content correctly inserted')

        popover.popover('hide')
        ok(!$('.popover').length, 'popover was removed')
        $('#qunit-fixture').empty()
***REMOVED***)

      test("should get title and content from attributes", function () {
        $.support.transition = false
        var popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" ***REMOVED***@mdo</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .popover()
          .popover('show')

        ok($('.popover').length, 'popover was inserted')
        equals($('.popover .popover-title').text(), '@mdo', 'title correctly inserted')
        equals($('.popover .popover-content').text(), "loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻", 'content correctly inserted')

        popover.popover('hide')
        ok(!$('.popover').length, 'popover was removed')
        $('#qunit-fixture').empty()
***REMOVED***)

      test("should respect custom classes", function() {
        $.support.transition = false
        var popover = $('<a href="#"***REMOVED***@fat</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .popover({
            title: 'Test'
          , content: 'Test'
          , template: '<div class="popover foobar"***REMOVED***<div class="arrow"***REMOVED***</div***REMOVED***<div class="inner"***REMOVED***<h3 class="title"***REMOVED***</h3***REMOVED***<div class="content"***REMOVED***<p***REMOVED***</p***REMOVED***</div***REMOVED***</div***REMOVED***</div***REMOVED***'
    ***REMOVED***)

        popover.popover('show')

        ok($('.popover').length, 'popover was inserted')
        ok($('.popover').hasClass('foobar'), 'custom class is present')

        popover.popover('hide')
        ok(!$('.popover').length, 'popover was removed')
        $('#qunit-fixture').empty()
***REMOVED***)

      test("should destroy popover", function () {
        var popover = $('<div/***REMOVED***').popover({trigger: 'hover'***REMOVED***).on('click.foo', function(){***REMOVED***)
        ok(popover.data('popover'), 'popover has data')
        ok($._data(popover[0], 'events').mouseover && $._data(popover[0], 'events').mouseout, 'popover has hover event')
        ok($._data(popover[0], 'events').click[0].namespace == 'foo', 'popover has extra click.foo event')
        popover.popover('show')
        popover.popover('destroy')
        ok(!popover.hasClass('in'), 'popover is hidden')
        ok(!popover.data('popover'), 'popover does not have data')
        ok($._data(popover[0],'events').click[0].namespace == 'foo', 'popover still has click.foo')
        ok(!$._data(popover[0], 'events').mouseover && !$._data(popover[0], 'events').mouseout, 'popover does not have any events')
***REMOVED***)

***REMOVED***)