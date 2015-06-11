/* ng-infinite-scroll - v1.2.0 - 2014-12-02 */
var mod;

mod = angular.module('infinite-scroll', []);

mod.value('THROTTLE_MILLISECONDS', null);

mod.directive('infiniteScroll', [
  '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
    return {
      scope: {
        infiniteScroll: '&',
        infiniteScrollContainer: '=',
        infiniteScrollDistance: '=',
        infiniteScrollDisabled: '=',
        infiniteScrollUseDocumentBottom: '='
***REMOVED***,
      link: function(scope, elem, attrs) {
        var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, useDocumentBottom, windowElement;
        windowElement = angular.element($window);
        scrollDistance = null;
        scrollEnabled = null;
        checkWhenEnabled = null;
        container = null;
        immediateCheck = true;
        useDocumentBottom = false;
        height = function(elem) {
          elem = elem[0] || elem;
          if (isNaN(elem.offsetHeight)) {
            return elem.document.documentElement.clientHeight;
    ***REMOVED*** else {
            return elem.offsetHeight;
    ***REMOVED***
  ***REMOVED***;
        offsetTop = function(elem) {
          if (!elem[0].getBoundingClientRect || elem.css('none')) {
            return;
    ***REMOVED***
          return elem[0].getBoundingClientRect().top + pageYOffset(elem);
  ***REMOVED***;
        pageYOffset = function(elem) {
          elem = elem[0] || elem;
          if (isNaN(window.pageYOffset)) {
            return elem.document.documentElement.scrollTop;
    ***REMOVED*** else {
            return elem.ownerDocument.defaultView.pageYOffset;
    ***REMOVED***
  ***REMOVED***;
        handler = function() {
          var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
          if (container === windowElement) {
            containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
            elementBottom = offsetTop(elem) + height(elem);
    ***REMOVED*** else {
            containerBottom = height(container);
            containerTopOffset = 0;
            if (offsetTop(container) !== void 0) {
              containerTopOffset = offsetTop(container);
      ***REMOVED***
            elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
    ***REMOVED***
          if (useDocumentBottom) {
            elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
    ***REMOVED***
          remaining = elementBottom - containerBottom;
          shouldScroll = remaining <= height(container) * scrollDistance + 1;
          if (shouldScroll) {
            checkWhenEnabled = true;
            if (scrollEnabled) {
              if (scope.$$phase || $rootScope.$$phase) {
                return scope.infiniteScroll();
        ***REMOVED*** else {
                return scope.$apply(scope.infiniteScroll);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else {
            return checkWhenEnabled = false;
    ***REMOVED***
  ***REMOVED***;
        throttle = function(func, wait) {
          var later, previous, timeout;
          timeout = null;
          previous = 0;
          later = function() {
            var context;
            previous = new Date().getTime();
            $interval.cancel(timeout);
            timeout = null;
            func.call();
            return context = null;
    ***REMOVED***;
          return function() {
            var now, remaining;
            now = new Date().getTime();
            remaining = wait - (now - previous);
            if (remaining <= 0) {
              clearTimeout(timeout);
              $interval.cancel(timeout);
              timeout = null;
              previous = now;
              return func.call();
      ***REMOVED*** else {
              if (!timeout) {
                return timeout = $interval(later, remaining, 1);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;
        if (THROTTLE_MILLISECONDS != null) {
          handler = throttle(handler, THROTTLE_MILLISECONDS);
  ***REMOVED***
        scope.$on('$destroy', function() {
          return container.unbind('scroll', handler);
  ***REMOVED***);
        handleInfiniteScrollDistance = function(v) {
          return scrollDistance = parseFloat(v) || 0;
  ***REMOVED***;
        scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
        handleInfiniteScrollDistance(scope.infiniteScrollDistance);
        handleInfiniteScrollDisabled = function(v) {
          scrollEnabled = !v;
          if (scrollEnabled && checkWhenEnabled) {
            checkWhenEnabled = false;
            return handler();
    ***REMOVED***
  ***REMOVED***;
        scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
        handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
        handleInfiniteScrollUseDocumentBottom = function(v) {
          return useDocumentBottom = v;
  ***REMOVED***;
        scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
        handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
        changeContainer = function(newContainer) {
          if (container != null) {
            container.unbind('scroll', handler);
    ***REMOVED***
          container = newContainer;
          if (newContainer != null) {
            return container.bind('scroll', handler);
    ***REMOVED***
  ***REMOVED***;
        changeContainer(windowElement);
        handleInfiniteScrollContainer = function(newContainer) {
          if ((newContainer == null) || newContainer.length === 0) {
            return;
    ***REMOVED***
          if (newContainer instanceof HTMLElement) {
            newContainer = angular.element(newContainer);
    ***REMOVED*** else if (typeof newContainer.append === 'function') {
            newContainer = angular.element(newContainer[newContainer.length - 1]);
    ***REMOVED*** else if (typeof newContainer === 'string') {
            newContainer = angular.element(document.querySelector(newContainer));
    ***REMOVED***
          if (newContainer != null) {
            return changeContainer(newContainer);
    ***REMOVED*** else {
            throw new Exception("invalid infinite-scroll-container attribute.");
    ***REMOVED***
  ***REMOVED***;
        scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
        handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
        if (attrs.infiniteScrollParent != null) {
          changeContainer(angular.element(elem.parent()));
  ***REMOVED***
        if (attrs.infiniteScrollImmediateCheck != null) {
          immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
  ***REMOVED***
        return $interval((function() {
          if (immediateCheck) {
            return handler();
    ***REMOVED***
  ***REMOVED***), 0, 1);
***REMOVED***
    ***REMOVED***;
  ***REMOVED***
]);
