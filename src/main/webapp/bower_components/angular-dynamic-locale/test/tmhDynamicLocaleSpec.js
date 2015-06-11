(function () {
  'use strict';

  // Minimal implementation to mock what was removed from Jasmine 1.x
  function createAsync(doneFn) {
    function Job() {
      this.next = [];
    ***REMOVED***
    Job.prototype.done = function () {
      return this.runs(doneFn);
    ***REMOVED***;
    Job.prototype.runs = function (fn) {
      var newJob = new Job();
      this.next.push(function () {
        fn();
        newJob.start();
***REMOVED***);
      return newJob;
    ***REMOVED***;
    Job.prototype.waitsFor = function (fn, error, timeout) {
      var newJob = new Job();
      timeout = timeout || 5000;
      this.next.push(function () {
        var counter = 0,
          intervalId = window.setInterval(function () {
            if (fn()) {
              window.clearInterval(intervalId);
              newJob.start();
      ***REMOVED***
            counter += 5;
            if (counter ***REMOVED*** timeout) {
              window.clearInterval(intervalId);
              throw new Error(error);
      ***REMOVED***
    ***REMOVED***, 5);
***REMOVED***);
      return newJob;
    ***REMOVED***;
    Job.prototype.start = function () {
      var i;
      for (i = 0; i < this.next.length; i += 1) {
        this.next[i]();
***REMOVED***
    ***REMOVED***;
    return new Job();
  ***REMOVED***

  describe('dynamicLocale', function() {
    beforeEach(module('tmh.dynamicLocale'));
    beforeEach(module(function(tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('/base/node_modules/angular-i18n/angular-locale_{{locale***REMOVED******REMOVED***.js');
    ***REMOVED***));

    afterEach(function (done) {
      inject(function($locale, $timeout, tmhDynamicLocale) {
        var job = createAsync(done);
        job
          .runs(function() {
            tmhDynamicLocale.set('en-us');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'en-us';
    ***REMOVED***, 'locale not reverted', 2000)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should (eventually) be able to change the locale', function(done) {
      inject(function($locale, $timeout, tmhDynamicLocale) {
        var job = createAsync(done);
        job
          .runs(function() {
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect($locale.id).toBe('es');
            expect($locale.DATETIME_FORMATS.DAY["0"]).toBe("domingo");
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should trigger an event when there it changes the locale', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope) {
        var callback = jasmine.createSpy();
        var job = createAsync(done);
        job
          .runs(function() {
            $rootScope.$apply();
            $rootScope.$on('$localeChangeSuccess', callback);
            tmhDynamicLocale.set('es');
            expect(callback.calls.count()).toBe(0);
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(callback.calls.count()).toBe(1);
            expect(callback.calls.argsFor(0)[1]).toEqual('es');
            expect(callback.calls.argsFor(0)[2]).toEqual($locale);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should trigger a failure even when the locale change fail', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope) {
        var job = createAsync(done);
        var callback = jasmine.createSpy();

        job
          .runs(function() {
             $rootScope.$apply();
             $rootScope.$on('$localeChangeError', callback);
             tmhDynamicLocale.set('invalidLocale');
             expect(callback.calls.count()).toBe(0);
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return callback.calls.count() !== 0;
    ***REMOVED***, 'error not generated', 2000)
          .runs(function() {
            expect(callback.calls.count()).toBe(1);
            expect(callback.calls.argsFor(0)[1]).toEqual('invalidLocale');
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should return a promise that has the new locale', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope) {
        var job = createAsync(done);
        var callback = jasmine.createSpy();

        job
          .runs(function() {
            tmhDynamicLocale.set('es').then(callback);
            expect(callback.calls.count()).toBe(0);
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return callback.calls.count() !== 0;
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(callback.calls.argsFor(0)[0].id).toEqual('es');
            expect(callback.calls.argsFor(0)[0]).toEqual($locale);
            tmhDynamicLocale.set('it');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'it';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            tmhDynamicLocale.set('es').then(callback);
            expect(callback.calls.count()).toBe(1);
            $rootScope.$apply();
            expect(callback.calls.count()).toBe(2);
            expect(callback.calls.argsFor(1)[0].id).toBe('es');
            expect(callback.calls.argsFor(1)[0]).toBe($locale);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should reject the returned promise if it fails to load the locale', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope) {
        var callback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();
        var job = createAsync(done);

        job
          .runs(function() {
            tmhDynamicLocale.set('invalidLocale').then(callback, errorCallback);
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return errorCallback.calls.count();
    ***REMOVED***, 'promise not rejected', 2000)
          .runs(function() {
            expect(callback.calls.count()).toBe(0);
            expect(errorCallback.calls.count()).toBe(1);
            expect(errorCallback.calls.argsFor(0)[0]).toBe('invalidLocale');
            expect($locale.id).toBe('en-us');
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should be possible to retrieve the locale to be', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope, $compile) {
        var job = createAsync(done);

        job
          .runs(function() {
            tmhDynamicLocale.set('es');
            expect(tmhDynamicLocale.get()).toBe('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(tmhDynamicLocale.get()).toBe('es');
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should revert the configured locale when the new locale does not exist', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope) {
        var job = createAsync(done);
        var errorCallback = jasmine.createSpy();

        job
          .runs(function() {
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            tmhDynamicLocale.set('invalidLocale').then(undefined, errorCallback);
            expect(tmhDynamicLocale.get()).toBe('invalidLocale');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return errorCallback.calls.count();
    ***REMOVED***, 'promise not rejected', 2000)
          .runs(function() {
            expect(tmhDynamicLocale.get()).toBe('es');
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should change the already formatted numbers in the page', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, $rootScope, $compile) {
        var job = createAsync(done);
        var element = null;

        job
          .runs(function() {
            element = $compile('<span***REMOVED***{{val | number***REMOVED******REMOVED***</span***REMOVED***')($rootScope);

            $rootScope.val = 1234.5678;
            $rootScope.$apply();
            expect(element.text()).toBe('1,234.568');

            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(element.text()).toBe('1.234,568');
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should keep already loaded locales at tmhDynamicLocaleCache', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, tmhDynamicLocaleCache, $rootScope) {
        var job = createAsync(done);
        var callback = jasmine.createSpy();
        var esLocale = null;

        job
          .runs(function() {
            expect(tmhDynamicLocaleCache.info().size).toBe(0);
            tmhDynamicLocale.set('es');
            expect(tmhDynamicLocaleCache.info().size).toBe(0);
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(tmhDynamicLocaleCache.info().size).toBe(1);
            expect(tmhDynamicLocaleCache.get('es')).toEqual($locale);
            esLocale = angular.copy($locale);
            tmhDynamicLocale.set('it');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'it';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect(tmhDynamicLocaleCache.info().size).toBe(2);
            expect(tmhDynamicLocaleCache.get('es')).toEqual(esLocale);
            expect(tmhDynamicLocaleCache.get('it')).toEqual($locale);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should use the cache when possible', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, tmhDynamicLocaleCache, $rootScope) {
        var job = createAsync(done);
        var callback = jasmine.createSpy();

        job
          .runs(function() {
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            tmhDynamicLocale.set('it');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'it';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            tmhDynamicLocaleCache.get('es').DATETIME_FORMATS.DAY["0"] = "Domingo";
            $rootScope.$on('$localeChangeSuccess', callback);
            tmhDynamicLocale.set('es');
            // Changing the locale should be done async even when this is done from the cache
            expect(callback.calls.count()).toBe(0);
            expect($locale.id).toBe('it');
            $rootScope.$apply();
            expect($locale.id).toBe('es');
            expect($locale.DATETIME_FORMATS.DAY["0"]).toBe("Domingo");
            expect(callback.calls.count()).toBe(1);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    it('should do a deep copy of the locale elements', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, tmhDynamicLocaleCache, $rootScope) {
        var job = createAsync(done);

        job
          .runs(function() {
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            $locale.DATETIME_FORMATS.DAY["0"] = "XXX";
            expect($locale.DATETIME_FORMATS.DAY["0"]).not.toBe(tmhDynamicLocaleCache.get('es').DATETIME_FORMATS.DAY["0"]);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
     ***REMOVED***);

    it('should be able to handle locales with extra elements', function(done) {
      inject(function($timeout, $locale, tmhDynamicLocale, tmhDynamicLocaleCache, $rootScope) {
        var job = createAsync(done);
        var weirdLocale;

        job
          .runs(function() {
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            weirdLocale = angular.copy($locale);
            weirdLocale.id = "xx";
            weirdLocale.EXTRA_PARAMETER = {foo: "FOO"***REMOVED***;
            weirdLocale.DATETIME_FORMATS.DAY["7"] = "One More Day";
            tmhDynamicLocaleCache.put('xx', angular.copy(weirdLocale));
            tmhDynamicLocale.set('xx');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'xx';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect($locale).toEqual(weirdLocale);
            expect($locale.EXTRA_PARAMETER).toEqual({foo: "FOO"***REMOVED***);
            tmhDynamicLocale.set('es');
    ***REMOVED***)
          .waitsFor(function() {
            $timeout.flush(50);
            return $locale.id === 'es';
    ***REMOVED***, 'locale not updated', 2000)
          .runs(function() {
            expect($locale.EXTRA_PARAMETER).toBeUndefined();
            expect($locale.DATETIME_FORMATS.DAY["7"]).toBeUndefined();
            expect($locale.DATETIME_FORMATS.DAY.length).toBe(7);
    ***REMOVED***)
          .done();
        job.start();
***REMOVED***);
    ***REMOVED***);

    describe('having a default locale', function() {
      beforeEach(module(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.defaultLocale('it');
***REMOVED***));
      it('should set the locale to the default locale', function(done) {
        inject(function($timeout, $locale, $rootScope) {
          var job = createAsync(done);

          job
            .runs(function() {
              expect($locale.id).toBe('en-us');
              $rootScope.$apply();
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'it';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect($locale.id).toBe('it');
      ***REMOVED***)
            .done();
          job.start();
  ***REMOVED***);
***REMOVED***);
    ***REMOVED***);

    describe('having a cookie storage', function () {
      beforeEach(module('ngCookies'));
      beforeEach(module(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.useCookieStorage();
***REMOVED***));

      it('should store the change on the cookie store', function(done) {
        inject(function ($timeout, $locale, $cookieStore, tmhDynamicLocale) {
          var job = createAsync(done);

          job
            .runs(function() {
              tmhDynamicLocale.set('es');
              expect($cookieStore.get('tmhDynamicLocale.locale')).toBe(undefined);
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'es';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect($cookieStore.get('tmhDynamicLocale.locale')).toBe('es');
      ***REMOVED***)
            .done();
          job.start();
  ***REMOVED***);
***REMOVED***);
      describe('reading the locale at initialization', function () {
        beforeEach(inject(function ($cookieStore, $rootScope) {
          $cookieStore.put('tmhDynamicLocale.locale', 'it');
          $rootScope.$apply();
  ***REMOVED***));

        it('should load the locale on initialization', function(done) {
          inject(function ($timeout, $locale, $rootScope) {
            var job = createAsync(done);

            job
              .runs(function() {
                expect($locale.id).toBe('en-us');
        ***REMOVED***)
              .waitsFor(function() {
                $timeout.flush(50);
                return $locale.id === 'it';
        ***REMOVED***, 'locale not updated', 2000)
              .runs(function() {
                expect($locale.id).toBe('it');
        ***REMOVED***)
              .done();
            job.start();
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***);
      describe('and having a default language', function () {
        beforeEach(module(function(tmhDynamicLocaleProvider) {
          tmhDynamicLocaleProvider.defaultLocale('es');
  ***REMOVED***));
        beforeEach(inject(function ($cookieStore, $rootScope) {
          $cookieStore.put('tmhDynamicLocale.locale', 'it');
          $rootScope.$apply();
  ***REMOVED***));

        it('should load the locale on initialization', function(done) {
          inject(function ($timeout, $locale, $rootScope) {
            var job = createAsync(done);

            job
              .runs(function() {
                expect($locale.id).toBe('en-us');
        ***REMOVED***)
              .waitsFor(function() {
                $timeout.flush(50);
                return $locale.id === 'it';
        ***REMOVED***, 'locale not updated', 2000)
              .runs(function() {
                expect($locale.id).toBe('it');
        ***REMOVED***)
              .done();
            job.start();
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***);
      describe('and changing the name of the storageKey', function () {
        beforeEach(module(function(tmhDynamicLocaleProvider) {
          tmhDynamicLocaleProvider.storageKey('customStorageKeyName');
  ***REMOVED***));

        it('should change the name of the storageKey', function(done) {
          inject(function ($timeout, $locale, $cookieStore, tmhDynamicLocale) {
            var job = createAsync(done);

            job
            .runs(function() {
              tmhDynamicLocale.set('es');
              expect($cookieStore.get('customStorageKeyName')).toBe(undefined);
              expect($cookieStore.get('tmhDynamicLocale.locale')).toBe(undefined);
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'es';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect($cookieStore.get('tmhDynamicLocale.locale')).toBe(undefined);
              expect($cookieStore.get('customStorageKeyName')).toBe('es');
      ***REMOVED***)
            .done();
            job.start();
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***);
    ***REMOVED***);

    describe('loading locales using <script***REMOVED***', function () {
      function countLocales($document, localeId) {
        var count = 0,
          scripts = $document[0].getElementsByTagName('script');

        for (var i = 0; i < scripts.length; ++i) {
          count += (scripts[i].src === 'http://localhost:9876/base/node_modules/angular-i18n/angular-locale_' + localeId + '.js' ? 1 : 0);
  ***REMOVED***
        return count;
***REMOVED***

      it('should load the locales using a <script***REMOVED*** tag', function(done) {
        inject(function ($timeout, tmhDynamicLocale, $document, $locale) {
          var job = createAsync(done);
          job
            .runs(function() {
              tmhDynamicLocale.set('fr');
              expect(countLocales($document, 'fr')).toBe(1);
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'fr';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect(countLocales($document, 'fr')).toBe(0);
      ***REMOVED***)
            .done();
        job.start();
  ***REMOVED***);
***REMOVED***);

      it('should not load the same locale twice', function(done) {
        inject(function ($timeout, tmhDynamicLocale, $rootScope, $document, $locale) {
          var job = createAsync(done);

          job
            .runs(function() {
              tmhDynamicLocale.set('ja');
              tmhDynamicLocale.set('ja');
              expect(countLocales($document, 'ja')).toBe(1);
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'ja';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect(countLocales($document, 'ja')).toBe(0);
              tmhDynamicLocale.set('ja');
              expect(countLocales($document, 'ja')).toBe(0);
              tmhDynamicLocale.set('et');
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'et';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              $rootScope.$apply(function () {
                tmhDynamicLocale.set('ja');
                expect(countLocales($document, 'ja')).toBe(0);
        ***REMOVED***);
              expect(countLocales($document, 'ja')).toBe(0);
      ***REMOVED***)
            .done();
          job.start();
  ***REMOVED***);
***REMOVED***);

      it('should return a promise that is resolved when the script is loaded', function(done) {
        inject(function ($timeout, tmhDynamicLocale, $document, $locale) {
          var job = createAsync(done);
          var callback = jasmine.createSpy();

          job
            .runs(function() {
              tmhDynamicLocale.set('ko').then(callback);
              tmhDynamicLocale.set('ko').then(callback);
              expect(callback).not.toHaveBeenCalled();
      ***REMOVED***)
            .waitsFor(function() {
              $timeout.flush(50);
              return $locale.id === 'ko';
      ***REMOVED***, 'locale not updated', 2000)
            .runs(function() {
              expect(callback.calls.count()).toBe(2);
      ***REMOVED***)
            .done();
          job.start();
  ***REMOVED***);
***REMOVED***);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***());
