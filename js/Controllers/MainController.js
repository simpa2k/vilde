/**
 * Created by simpa2k on 2016-06-29.
 */
var app = angular.module('vilde', []);

var root = 'backend/server.php/';

app.controller('MainController', function($scope, $http) {
   $scope.title = 'Vilde';

   $http.get(root + 'description').then(function(response) {
      $scope.description = response.data;
   });

   $http.get(root + 'quotes?id=1').then(function(response) {
      $scope.quote1 = response.data[0];
   });

   $http.get(root + 'quotes?id=2').then(function(response) {
      $scope.quote2 = response.data[0];
   });

   $http.get(root + 'news').then(function(response) {
      $scope.news = response.data;
   });

   $http.get(root + 'gigs').then(function(response) {
      var gigs = response.data;

      for(var i = 0; i < gigs.length; i++) {
         if(gigs[i].price == null) {
            gigs[i].price = 'Gratis!';
         }
      }

      $scope.gigs = gigs;
   });
});