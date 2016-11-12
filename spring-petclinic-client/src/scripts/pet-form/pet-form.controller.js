'use strict';

angular.module('petForm')
    .controller('PetFormController', ['$http', '$state', '$stateParams', function ($http, $state, $stateParams) {
        var self = this;
        var ownerId = $stateParams.ownerId || 0;

        $http.get('api/client/petTypes').then(function (resp) {
            self.types = resp.data;
  ***REMOVED***).then(function () {

            var petId = $stateParams.petId || 0;

            if (petId) { // edit
                $http.get("api/client/owners/" + ownerId + "/pets/" + petId).then(function (resp) {
                    self.pet = resp.data;
                    self.pet.birthDate = new Date(self.pet.birthDate);
                    self.petTypeId = "" + self.pet.type.id;
          ***REMOVED***);
      ***REMOVED*** else {
                $http.get('api/client/owners/' + ownerId).then(function (resp) {
                    self.pet = {
                        owner: resp.data.firstName + " " + resp.data.lastName
              ***REMOVED***;
                    self.petTypeId = "1";
          ***REMOVED***)

      ***REMOVED***
  ***REMOVED***);

        self.submit = function () {
            var id = self.pet.id || 0;

            var data = {
                id: id,
                name: self.pet.name,
                birthDate: self.pet.birthDate,
                typeId: self.petTypeId
      ***REMOVED***;

            var req;
            if (id) {
                req = $http.put("api/client/owners/" + ownerId + "/pets/" + id, data);
      ***REMOVED*** else {
                req = $http.post("api/client/owners/" + ownerId + "/pets", data);
      ***REMOVED***

            req.then(function () {
                $state.go("owners", {ownerId: ownerId***REMOVED***);
      ***REMOVED***, function (response) {
                var error = response.data;
                error.errors = error.errors || [];
                alert(error.error + "\r\n" + error.errors.map(function (e) {
                        return e.field + ": " + e.defaultMessage;
              ***REMOVED***).join("\r\n"));
      ***REMOVED***);
  ***REMOVED***;
    ***REMOVED***]);
