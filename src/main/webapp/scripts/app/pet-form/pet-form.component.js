'use strict';

angular.module('petForm', [
    'ngRoute'
]);

angular.module("petForm").component("petForm", {
    templateUrl: "/petclinic/scripts/app/pet-form/pet-form.template.html",
    controller: ["$http", '$routeParams', '$location', function ($http, $routeParams, $location) {
        var self = this;
        var ownerId = $routeParams.ownerId || 0;

        $http.get('petTypes').then(function(resp) {
            self.types = resp.data;
  ***REMOVED***).then(function () {

            var petId = $routeParams.petId || 0;

            if (petId) { // edit
                $http.get("owner/" + ownerId + "/pet/" + petId).then(function(resp) {
                    self.pet = resp.data;
                    self.pet.birthDate = new Date(self.pet.birthDate);
                    self.petTypeId = "" + self.pet.type.id;
          ***REMOVED***);
      ***REMOVED*** else {
                $http.get('owner/' + ownerId).then(function(resp) {
                    self.pet = {
                        owner: resp.data.firstName + " " + resp.data.lastName
              ***REMOVED***;
                    self.petTypeId = "1";
          ***REMOVED***)

      ***REMOVED***
  ***REMOVED***);

        self.submit = function() {
            console.log(this.pet);

            var id = self.pet.id || 0;

            var data = {
                id : id,
                name : self.pet.name,
                birthDate : self.pet.birthDate,
                typeId: self.petTypeId
      ***REMOVED***;

            var req;
            if (id) {
                req = $http.put("owners/" + ownerId + "/pets/" + id, data);
      ***REMOVED*** else {
                req = $http.post("owners/" + ownerId + "/pets", data);
      ***REMOVED***

            req.then(function () {
                $location.url("owners/" + ownerId);
      ***REMOVED***, function (response) {
                var error = response.data;
                error.errors = error.errors || [];
                alert(error.error + "\r\n" + error.errors.map(function (e) {
                        return e.field + ": " + e.defaultMessage;
              ***REMOVED***).join("\r\n"));
      ***REMOVED***);
  ***REMOVED***;
    ***REMOVED***]
***REMOVED***);