'use strict';
/* App Module */
var petClinicApp = angular.module('petClinicApp', [
    'ngRoute', 'layoutNav', 'layoutFooter', 'layoutWelcome',
    'ownerList', 'ownerDetails', 'ownerForm','petForm', 'vetList']);

petClinicApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.when('/welcome', {
        template: '<layout-welcome***REMOVED***</layout-welcome***REMOVED***'
    ***REMOVED***).when('/owners/:ownerId', {
        template: '<owner-details***REMOVED***</owner-details***REMOVED***'
    ***REMOVED***).when('/owners', {
        template: '<owner-list***REMOVED***</owner-list***REMOVED***'
    ***REMOVED***).when('/owners/:ownerId/edit', {
        template: '<owner-form***REMOVED***</owner-form***REMOVED***'
    ***REMOVED***).when('/new-owner', {
        template: '<owner-form***REMOVED***</owner-form***REMOVED***'
    ***REMOVED***).when('/owners/:ownerId/new-pet', {
        template: '<pet-form***REMOVED***</pet-form***REMOVED***'
    ***REMOVED***).when('/owners/:ownerId/pets/:petId', {
        template: '<pet-form***REMOVED***</pet-form***REMOVED***'
    ***REMOVED***).when('/vets', {
        template: '<vet-list***REMOVED***</vet-list***REMOVED***'
    ***REMOVED***).otherwise('/welcome');

***REMOVED***]);

angular.module('layoutWelcome', []);

angular.module("layoutWelcome").component("layoutWelcome", {
    templateUrl: "scripts/app/fragments/welcome.html"
***REMOVED***);

angular.module('layoutNav', []);

angular.module("layoutNav").component("layoutNav", {
    templateUrl: "scripts/app/fragments/nav.html"
***REMOVED***);

angular.module('layoutFooter', []);

angular.module("layoutFooter").component("layoutFooter", {
    templateUrl: "scripts/app/fragments/footer.html"
***REMOVED***);