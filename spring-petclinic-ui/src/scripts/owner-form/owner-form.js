'use strict';

angular.module('ownerForm', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('ownerNew', {
                parent: 'app',
                url: '/owners/new',
                template: '<owner-form***REMOVED***</owner-form***REMOVED***'
      ***REMOVED***)
            .state('ownerEdit', {
                parent: 'app',
                url: '/owners/:ownerId/edit',
                template: '<owner-form***REMOVED***</owner-form***REMOVED***'
      ***REMOVED***)
    ***REMOVED***]);
