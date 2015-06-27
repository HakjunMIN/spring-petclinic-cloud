'use strict';

//Square brackets should only be defined once below (and not in other JS files)
angular.module('controllers', ['services', 'ngResource']);
angular.module('services', ['ngResource']);


/* App Module */
var petClinicApp = angular.module('petClinicApp', [
  'ui.router', 'controllers', 'services'
]);


		
petClinicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('app', {
    	url: '/',
    	controller: 'mainController',
    	views: {
            'header': 	{ templateUrl: 'scripts/app/fragments/bodyHeader.html'***REMOVED***,
            'content': 	{ templateUrl: 'scripts/app/main/main.html'***REMOVED***,
            'footer': 	{ templateUrl: 'scripts/app/fragments/footer.html'***REMOVED***
  ***REMOVED***
***REMOVED***).
      state('app.ownersearch', {
          url: 'owner/search',
          views: {
              'content@': {
            	  templateUrl: 'scripts/app/owner/ownerSearchForm.html',
                  controller: 'ownerSearchController'
        ***REMOVED***
    ***REMOVED***
   
***REMOVED***).
      state('app.ownerlist', {
          url: 'owner/list',
          views: {
              'content@': {
                  templateUrl: 'scripts/app/owner/ownerList.html',
                  controller: 'ownerListController'
        ***REMOVED***
    ***REMOVED***
   
***REMOVED***).
      state('app.ownerdetail', {
          url: 'owner/:id',
          views: {
              'content@': {
                  templateUrl: 'scripts/app/owner/ownerDetail.html',
                  controller: 'ownerDetailController'
        ***REMOVED***
    ***REMOVED***
   
***REMOVED***).
      state('app.owneredit', {
          url: 'owner/:id/edit',
          views: {
              'content@': {
                  templateUrl: 'scripts/app/owner/ownerForm.html',
                  controller: 'ownerFormController'
        ***REMOVED***
    ***REMOVED***
   
***REMOVED***).
      state('app.vets', {
          url: 'vets',
          views: {
              'content@': {
                  templateUrl: 'scripts/app/vet/vetList.html',
                  controller: 'vetController'
        ***REMOVED***
    ***REMOVED***
   
***REMOVED***);
  ***REMOVED***]);





