'use strict';

angular.module('ownerForm')
    .controller('OwnerFormController', ["$http", '$state', '$stateParams', function ($http, $state, $stateParams) {
        var self = this;

        var ownerId = $stateParams.ownerId || 0;

        if (!ownerId) {
            self.owner = {***REMOVED***;
  ***REMOVED*** else {
            $http.get("api/customer/owners/" + ownerId).then(function (resp) {
                self.owner = resp.data;
      ***REMOVED***);
  ***REMOVED***

        self.submitOwnerForm = function () {
            var id = self.owner.id;
            var req;
            if (id) {
                req = $http.put("api/customer/owners/" + id, self.owner);
      ***REMOVED*** else {
                req = $http.post("api/customer/owners", self.owner);
      ***REMOVED***

            req.then(function () {
                $state.go('owners');
      ***REMOVED***, function (response) {
                var error = response.data;
                alert(error.error + "\r\n" + error.errors.map(function (e) {
                        return e.field + ": " + e.defaultMessage;
              ***REMOVED***).join("\r\n"));
      ***REMOVED***);
  ***REMOVED***;
    ***REMOVED***]);