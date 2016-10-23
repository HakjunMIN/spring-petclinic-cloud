'use strict';
/* App Module */
var petClinicApp = angular.module('petClinicApp', [
    'ngRoute', 'layoutNav', 'layoutFooter', 'layoutWelcome',
    'ownerList', 'ownerDetails', 'ownerForm', 'petForm', 'visits', 'vetList']);

petClinicApp.config(['$locationProvider', '$routeProvider', '$httpProvider', function(
    $locationProvider, $routeProvider, $httpProvider) {

    // safari turns to be lazy sending the Cache-Control header
    $httpProvider.defaults.headers.common["Cache-Control"] = 'no-cache';

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
    ***REMOVED***).when('/owners/:ownerId/pets/:petId/visits', {
        template: '<visits***REMOVED***</visits***REMOVED***'
    ***REMOVED***).when('/vets', {
        template: '<vet-list***REMOVED***</vet-list***REMOVED***'
    ***REMOVED***).otherwise('/welcome');

***REMOVED***]);

['welcome', 'nav', 'footer'].forEach(function(c) {
    var mod = 'layout' + c.toUpperCase().substring(0, 1) + c.substring(1);
    angular.module(mod, []);
    angular.module(mod).component(mod, {
        templateUrl: "scripts/fragments/" + c + ".html"
    ***REMOVED***);
***REMOVED***);