'use strict';

//Square brackets should only be defined once below (and not in other JS files)
angular.module('controllers', ['services', 'ngResource']);
angular.module('services', ['ngResource']);


/* App Module */
var petClinicApp = angular.module('petClinicApp', [
  'ngRoute', 'controllers', 'services'
]);


		
petClinicApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'scripts/app/main/main.html',
        controller: 'mainController'
***REMOVED***).
    when('/owner/search', {
        templateUrl: 'scripts/app/owner/ownerSearchForm.html',
        controller: 'ownerSearchController'
***REMOVED***).
    when('/owner/list', {
        templateUrl: 'scripts/app/owner/ownerList.html',
        controller: 'ownerListController'
    ***REMOVED***).
     when('/owner/:id/view', {
    	  templateUrl: 'scripts/app/owner/ownerDetail.html',
    	  controller: 'ownerDetailController'
***REMOVED***).
      when('/owner/:id/edit', {
    	  templateUrl: 'scripts/app/owner/ownerForm.html',
    	  controller: 'ownerFormController'
***REMOVED***).
      when('/vets', {
          templateUrl: 'scripts/app/vet/vetList.html',
          controller: 'vetController'
  ***REMOVED***).
      otherwise({
        redirectTo: '/'
***REMOVED***);
  ***REMOVED***]);





