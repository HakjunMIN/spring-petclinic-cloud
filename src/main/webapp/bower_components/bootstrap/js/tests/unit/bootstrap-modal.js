$(function () {

    module("bootstrap-modal")

      test("should provide no conflict", function () {
        var modal = $.fn.modal.noConflict()
        ok(!$.fn.modal, 'modal was set back to undefined (org value)')
        $.fn.modal = modal
***REMOVED***)

      test("should be defined on jquery object", function () {
        var div = $("<div id='modal-test'***REMOVED***</div***REMOVED***")
        ok(div.modal, 'modal method is defined')
***REMOVED***)

      test("should return element", function () {
        var div = $("<div id='modal-test'***REMOVED***</div***REMOVED***")
        ok(div.modal() == div, 'document.body returned')
        $('#modal-test').remove()
***REMOVED***)

      test("should expose defaults var for settings", function () {
        ok($.fn.modal.defaults, 'default object exposed')
***REMOVED***)

      test("should insert into dom when show method is called", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'***REMOVED***</div***REMOVED***")
          .bind("shown", function () {
            ok($('#modal-test').length, 'modal insterted into dom')
            $(this).remove()
            start()
    ***REMOVED***)
          .modal("show")
***REMOVED***)

      test("should fire show event", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'***REMOVED***</div***REMOVED***")
          .bind("show", function () {
            ok(true, "show was called")
    ***REMOVED***)
          .bind("shown", function () {
            $(this).remove()
            start()
    ***REMOVED***)
          .modal("show")
***REMOVED***)

      test("should not fire shown when default prevented", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'***REMOVED***</div***REMOVED***")
          .bind("show", function (e) {
            e.preventDefault()
            ok(true, "show was called")
            start()
    ***REMOVED***)
          .bind("shown", function () {
            ok(false, "shown was called")
    ***REMOVED***)
          .modal("show")
***REMOVED***)

      test("should hide modal when hide is called", function () {
        stop()
        $.support.transition = false

        $("<div id='modal-test'***REMOVED***</div***REMOVED***")
          .bind("shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            $(this).modal("hide")
    ***REMOVED***)
          .bind("hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            $('#modal-test').remove()
            start()
    ***REMOVED***)
          .modal("show")
***REMOVED***)

      test("should toggle when toggle is called", function () {
        stop()
        $.support.transition = false
        var div = $("<div id='modal-test'***REMOVED***</div***REMOVED***")
        div
          .bind("shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            div.modal("toggle")
    ***REMOVED***)
          .bind("hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            div.remove()
            start()
    ***REMOVED***)
          .modal("toggle")
***REMOVED***)

      test("should remove from dom when click [data-dismiss=modal]", function () {
        stop()
        $.support.transition = false
        var div = $("<div id='modal-test'***REMOVED***<span class='close' data-dismiss='modal'***REMOVED***</span***REMOVED***</div***REMOVED***")
        div
          .bind("shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            div.find('.close').click()
    ***REMOVED***)
          .bind("hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            div.remove()
            start()
    ***REMOVED***)
          .modal("toggle")
***REMOVED***)
***REMOVED***)