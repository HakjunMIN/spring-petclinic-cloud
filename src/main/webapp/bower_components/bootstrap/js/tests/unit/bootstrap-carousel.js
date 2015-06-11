$(function () {

    module("bootstrap-carousel")

      test("should provide no conflict", function () {
        var carousel = $.fn.carousel.noConflict()
        ok(!$.fn.carousel, 'carousel was set back to undefined (org value)')
        $.fn.carousel = carousel
***REMOVED***)

      test("should be defined on jquery object", function () {
        ok($(document.body).carousel, 'carousel method is defined')
***REMOVED***)

      test("should return element", function () {
        ok($(document.body).carousel()[0] == document.body, 'document.body returned')
***REMOVED***)

      test("should not fire sliden when slide is prevented", function () {
        $.support.transition = false
        stop()
        $('<div class="carousel"/***REMOVED***')
          .bind('slide', function (e) {
            e.preventDefault();
            ok(true);
            start();
    ***REMOVED***)
          .bind('slid', function () {
            ok(false);
    ***REMOVED***)
          .carousel('next')
***REMOVED***)

      test("should fire slide event with direction", function () {
        var template = '<div id="myCarousel" class="carousel slide"***REMOVED***<div class="carousel-inner"***REMOVED***<div class="item active"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***First Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***<div class="item"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***Second Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***<div class="item"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***Third Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***</div***REMOVED***<a class="left carousel-control" href="#myCarousel" data-slide="prev"***REMOVED***&lsaquo;</a***REMOVED***<a class="right carousel-control" href="#myCarousel" data-slide="next"***REMOVED***&rsaquo;</a***REMOVED***</div***REMOVED***'
        $.support.transition = false
        stop()
        $(template).on('slide', function (e) {
          e.preventDefault()
          ok(e.direction)
          ok(e.direction === 'right' || e.direction === 'left')
          start()
  ***REMOVED***).carousel('next')
***REMOVED***)

      test("should fire slide event with relatedTarget", function () {
        var template = '<div id="myCarousel" class="carousel slide"***REMOVED***<div class="carousel-inner"***REMOVED***<div class="item active"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***First Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***<div class="item"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***Second Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***<div class="item"***REMOVED***<img alt=""***REMOVED***<div class="carousel-caption"***REMOVED***<h4***REMOVED***{{_i***REMOVED******REMOVED***Third Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED***<p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED***</div***REMOVED***</div***REMOVED***</div***REMOVED***<a class="left carousel-control" href="#myCarousel" data-slide="prev"***REMOVED***&lsaquo;</a***REMOVED***<a class="right carousel-control" href="#myCarousel" data-slide="next"***REMOVED***&rsaquo;</a***REMOVED***</div***REMOVED***'
        $.support.transition = false
        stop()
        $(template)
          .on('slide', function (e) {
            e.preventDefault();
            ok(e.relatedTarget);
            ok($(e.relatedTarget).hasClass('item'));
            start();
    ***REMOVED***)
          .carousel('next')
***REMOVED***)

      test("should set interval from data attribute", 3,function () {
        var template = $('<div id="myCarousel" class="carousel slide"***REMOVED*** <div class="carousel-inner"***REMOVED*** <div class="item active"***REMOVED*** <img alt=""***REMOVED*** <div class="carousel-caption"***REMOVED*** <h4***REMOVED***{{_i***REMOVED******REMOVED***First Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED*** <p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED*** </div***REMOVED*** </div***REMOVED*** <div class="item"***REMOVED*** <img alt=""***REMOVED*** <div class="carousel-caption"***REMOVED*** <h4***REMOVED***{{_i***REMOVED******REMOVED***Second Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED*** <p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED*** </div***REMOVED*** </div***REMOVED*** <div class="item"***REMOVED*** <img alt=""***REMOVED*** <div class="carousel-caption"***REMOVED*** <h4***REMOVED***{{_i***REMOVED******REMOVED***Third Thumbnail label{{/i***REMOVED******REMOVED***</h4***REMOVED*** <p***REMOVED***Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p***REMOVED*** </div***REMOVED*** </div***REMOVED*** </div***REMOVED*** <a class="left carousel-control" href="#myCarousel" data-slide="prev"***REMOVED***&lsaquo;</a***REMOVED*** <a class="right carousel-control" href="#myCarousel" data-slide="next"***REMOVED***&rsaquo;</a***REMOVED*** </div***REMOVED***');
        template.attr("data-interval", 1814);

        template.appendTo("body");
        $('[data-slide]').first().click();
        ok($('#myCarousel').data('carousel').options.interval == 1814);
        $('#myCarousel').remove();

        template.appendTo("body").attr("data-modal", "foobar");
        $('[data-slide]').first().click();
        ok($('#myCarousel').data('carousel').options.interval == 1814, "even if there is an data-modal attribute set");
        $('#myCarousel').remove();

        template.appendTo("body");
        $('[data-slide]').first().click();
        $('#myCarousel').attr('data-interval', 1860);
        $('[data-slide]').first().click();
        ok($('#myCarousel').data('carousel').options.interval == 1814, "attributes should be read only on intitialization");
        $('#myCarousel').remove();
***REMOVED***)
***REMOVED***)