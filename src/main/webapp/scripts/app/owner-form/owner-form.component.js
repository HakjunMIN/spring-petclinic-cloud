'use strict';

angular.module('ownerForm', [
    'ngRoute'
]);

angular.module("ownerForm").component("ownerForm", {
    templateUrl: "/petclinic/scripts/app/owner-form/owner-form.template.html",
    controller: ["$http", '$routeParams', '$location', function ($http, $routeParams, $location) {
        var self = this;

        var ownerId = $routeParams.ownerId || 0;

        if (!ownerId) {
            self.owner = {***REMOVED***;
  ***REMOVED*** else {
            $http.get("owner/" + ownerId).then(function(resp) {
                self.owner = resp.data;
      ***REMOVED***);
  ***REMOVED***

        self.submitOwnerForm = function() {
            var id = self.owner.id;
            var req;
            if (id) {
                req = $http.put("owner/" + id, self.owner);
      ***REMOVED*** else {
                req = $http.post("owner", self.owner);
      ***REMOVED***

            req.then(function () {
                $location.url("/owners");
      ***REMOVED***, function (response) {
                var error = response.data;
                alert(error.error + "\r\n" + error.errors.map(function (e) {
                        return e.field + ": " + e.defaultMessage;
              ***REMOVED***).join("\r\n"));
      ***REMOVED***);
  ***REMOVED***;
    ***REMOVED***]
***REMOVED***);