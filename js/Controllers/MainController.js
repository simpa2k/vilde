/**
 * Created by simpa2k on 2016-06-29.
 */
var app = angular.module('vilde', ['ngParallax']);

var root = 'backend/server.php/';

app.controller('MainController', function($scope, $http) {
   $scope.$on('$includeContentLoaded', function(event, source) {

      if('partials/members.html' === source) {
         $(function() {
            $('#members').parallax({
               imageSrc: 'images/allatre.jpg',
               bleed: 100,
               position: "bottom"
            });
         })
      };

   });

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

   var date = new Date();
   var year = date.getFullYear()
   var month = date.getMonth() + 1;
   var day = date.getDay();

   var currentDate = year + "-" + month + "-" + day;

   $http.get(root + 'gigs?date=gte=' + currentDate).then(function(response) {
      var gigs = response.data;

      for(var i = 0; i < gigs.length; i++) {
         if(gigs[i].price == null) {
            gigs[i].price = 'Gratis!';
         }
      }

      $scope.gigs = gigs;
   });

   $scope.email = 'vildeland@gmail.com';

   $http.get(root + 'contactpersons').then(function(response) {
      $scope.contactpersons = response.data;
   });

});