$(function () {

    module("bootstrap-tooltip")

      test("should provide no conflict", function () {
        var tooltip = $.fn.tooltip.noConflict()
        ok(!$.fn.tooltip, 'tooltip was set back to undefined (org value)')
        $.fn.tooltip = tooltip
***REMOVED***)

      test("should be defined on jquery object", function () {
        var div = $("<div***REMOVED***</div***REMOVED***")
        ok(div.tooltip, 'popover method is defined')
***REMOVED***)

      test("should return element", function () {
        var div = $("<div***REMOVED***</div***REMOVED***")
        ok(div.tooltip() == div, 'document.body returned')
***REMOVED***)

      test("should expose default settings", function () {
        ok(!!$.fn.tooltip.defaults, 'defaults is defined')
***REMOVED***)

      test("should empty title attribute", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***').tooltip()
        ok(tooltip.attr('title') === '', 'title attribute was emptied')
***REMOVED***)

      test("should add data attribute for referencing original title", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***').tooltip()
        equals(tooltip.attr('data-original-title'), 'Another tooltip', 'original title preserved in data attribute')
***REMOVED***)

      test("should place tooltips relative to placement option", function () {
        $.support.transition = false
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({placement: 'bottom'***REMOVED***)
          .tooltip('show')

        ok($(".tooltip").is('.fade.bottom.in'), 'has correct classes applied')
        tooltip.tooltip('hide')
***REMOVED***)

      test("should allow html entities", function () {
        $.support.transition = false
        var tooltip = $('<a href="#" rel="tooltip" title="<b***REMOVED***@fat</b***REMOVED***"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({html: true***REMOVED***)
          .tooltip('show')

        ok($('.tooltip b').length, 'b tag was inserted')
        tooltip.tooltip('hide')
        ok(!$(".tooltip").length, 'tooltip removed')
***REMOVED***)

      test("should respect custom classes", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({ template: '<div class="tooltip some-class"***REMOVED***<div class="tooltip-arrow"/***REMOVED***<div class="tooltip-inner"/***REMOVED***</div***REMOVED***'***REMOVED***)
          .tooltip('show')

        ok($('.tooltip').hasClass('some-class'), 'custom class is present')
        tooltip.tooltip('hide')
        ok(!$(".tooltip").length, 'tooltip removed')
***REMOVED***)

      test("should fire show event", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("show", function() {
            ok(true, "show was called")
            start()
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should fire shown event", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("shown", function() {
            ok(true, "shown was called")
            start()
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should not fire shown event when default prevented", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("show", function(e) {
            e.preventDefault()
            ok(true, "show was called")
            start()
    ***REMOVED***)
          .bind("shown", function() {
            ok(false, "shown was called")
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should fire hide event", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("shown", function() {
            $(this).tooltip('hide')
    ***REMOVED***)
          .bind("hide", function() {
            ok(true, "hide was called")
            start()
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should fire hidden event", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("shown", function() {
            $(this).tooltip('hide')
    ***REMOVED***)
          .bind("hidden", function() {
            ok(true, "hidden was called")
            start()
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should not fire hidden event when default prevented", function () {
        stop()
        var tooltip = $('<div title="tooltip title"***REMOVED***</div***REMOVED***')
          .bind("shown", function() {
            $(this).tooltip('hide')
    ***REMOVED***)
          .bind("hide", function(e) {
            e.preventDefault()
            ok(true, "hide was called")
            start()
    ***REMOVED***)
          .bind("hidden", function() {
            ok(false, "hidden was called")
    ***REMOVED***)
          .tooltip('show')
***REMOVED***)

      test("should not show tooltip if leave event occurs before delay expires", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({ delay: 200 ***REMOVED***)

        stop()

        tooltip.trigger('mouseenter')

        setTimeout(function () {
          ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
          tooltip.trigger('mouseout')
          setTimeout(function () {
            ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
            start()
    ***REMOVED***, 200)
  ***REMOVED***, 100)
***REMOVED***)

      test("should not show tooltip if leave event occurs before delay expires, even if hide delay is 0", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({ delay: { show: 200, hide: 0***REMOVED*** ***REMOVED***)

        stop()

        tooltip.trigger('mouseenter')

        setTimeout(function () {
          ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
          tooltip.trigger('mouseout')
          setTimeout(function () {
            ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
            start()
    ***REMOVED***, 200)
  ***REMOVED***, 100)
***REMOVED***)

      test("should not show tooltip if leave event occurs before delay expires", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({ delay: 100 ***REMOVED***)
        stop()
        tooltip.trigger('mouseenter')
        setTimeout(function () {
          ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
          tooltip.trigger('mouseout')
          setTimeout(function () {
            ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
            start()
    ***REMOVED***, 100)
  ***REMOVED***, 50)
***REMOVED***)

      test("should show tooltip if leave event hasn't occured before delay expires", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({ delay: 150 ***REMOVED***)
        stop()
        tooltip.trigger('mouseenter')
        setTimeout(function () {
          ok(!$(".tooltip").is('.fade.in'), 'tooltip is not faded in')
  ***REMOVED***, 100)
        setTimeout(function () {
          ok($(".tooltip").is('.fade.in'), 'tooltip has faded in')
          start()
  ***REMOVED***, 200)
***REMOVED***)

      test("should destroy tooltip", function () {
        var tooltip = $('<div/***REMOVED***').tooltip().on('click.foo', function(){***REMOVED***)
        ok(tooltip.data('tooltip'), 'tooltip has data')
        ok($._data(tooltip[0], 'events').mouseover && $._data(tooltip[0], 'events').mouseout, 'tooltip has hover event')
        ok($._data(tooltip[0], 'events').click[0].namespace == 'foo', 'tooltip has extra click.foo event')
        tooltip.tooltip('show')
        tooltip.tooltip('destroy')
        ok(!tooltip.hasClass('in'), 'tooltip is hidden')
        ok(!$._data(tooltip[0], 'tooltip'), 'tooltip does not have data')
        ok($._data(tooltip[0], 'events').click[0].namespace == 'foo', 'tooltip still has click.foo')
        ok(!$._data(tooltip[0], 'events').mouseover && !$._data(tooltip[0], 'events').mouseout, 'tooltip does not have any events')
***REMOVED***)

      test("should show tooltip with delegate selector on click", function () {
        var div = $('<div***REMOVED***<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***</div***REMOVED***')
        var tooltip = div.appendTo('#qunit-fixture')
                         .tooltip({ selector: 'a[rel=tooltip]',
                                    trigger: 'click' ***REMOVED***)
        div.find('a').trigger('click')
        ok($(".tooltip").is('.fade.in'), 'tooltip is faded in')
***REMOVED***)

      test("should show tooltip when toggle is called", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="tooltip on toggle"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({trigger: 'manual'***REMOVED***)
          .tooltip('toggle')
        ok($(".tooltip").is('.fade.in'), 'tooltip should be toggled in')
***REMOVED***)

      test("should place tooltips inside the body", function () {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"***REMOVED***</a***REMOVED***')
          .appendTo('#qunit-fixture')
          .tooltip({container:'body'***REMOVED***)
          .tooltip('show')
        ok($("body ***REMOVED*** .tooltip").length, 'inside the body')
        ok(!$("#qunit-fixture ***REMOVED*** .tooltip").length, 'not found in parent')
        tooltip.tooltip('hide')
***REMOVED***)

      test("should place tooltip inside window", function(){
        var container = $("<div /***REMOVED***").appendTo("body")
            .css({position: "absolute", width: 200, height: 200, bottom: 0, left: 0***REMOVED***)
          , tooltip = $("<a href='#' title='Very very very very very very very very long tooltip'***REMOVED***Hover me</a***REMOVED***")
          .css({position: "absolute", top:0, left: 0***REMOVED***)
          .appendTo(container)
          .tooltip({placement: "top", animate: false***REMOVED***)
          .tooltip("show")

        stop()

        setTimeout(function(){
          ok($(".tooltip").offset().left ***REMOVED***= 0)

          start()
          container.remove()
  ***REMOVED***, 100)
***REMOVED***)

      test("should place tooltip on top of element", function(){
        var container = $("<div /***REMOVED***").appendTo("body")
              .css({position: "absolute", bottom: 0, left: 0, textAlign: "right", width: 300, height: 300***REMOVED***)
            , p = $("<p style='margin-top:200px' /***REMOVED***").appendTo(container)
            , tooltiped = $("<a href='#' title='very very very very very very very long tooltip'***REMOVED***Hover me</a***REMOVED***")
              .css({marginTop: 200***REMOVED***)
              .appendTo(p)
              .tooltip({placement: "top", animate: false***REMOVED***)
              .tooltip("show")

        stop()

        setTimeout(function(){
          var tooltip = container.find(".tooltip")

          start()
          ok(tooltip.offset().top + tooltip.outerHeight() <= tooltiped.offset().top)
          container.remove()
  ***REMOVED***, 100)
***REMOVED***)
***REMOVED***)
