/**
 * Created by simpa2k on 2016-06-29.
 */
var app = angular.module('vilde', ['ngRoute', 'duParallax']);

app.config(function($routeProvider) {
   $routeProvider

       .when('/', {
          templateUrl : 'partials/home.html',
          controller  : 'MainController'
       });

});

var serverRoot = 'backend/server.php/';

app.controller('MainController', function($scope, $http, parallaxHelper) {

   $scope.title = 'Vilde';
   $scope.background = parallaxHelper.createAnimator(-0.3, 300, -250);
   $scope.foreground = parallaxHelper.createAnimator(0.3, 150, -150);

   $http.get(serverRoot + 'description').then(function(response) {
      $scope.description = response.data;
   });

   $http.get(serverRoot + 'quotes?id=1').then(function(response) {
      $scope.quote1 = response.data[0];
   });

   $http.get(serverRoot + 'quotes?id=2').then(function(response) {
      $scope.quote2 = response.data[0];
   });

   $http.get(serverRoot + 'news').then(function(response) {
      $scope.news = response.data;
   });

   var date = new Date();
   var year = date.getFullYear()
   var month = date.getMonth() + 1;
   var day = date.getDay();

   var currentDate = year + "-" + month + "-" + day;

   $http.get(serverRoot + 'gigs?date=gte=' + currentDate).then(function(response) {
      var gigs = response.data;

      for(var i = 0; i < gigs.length; i++) {
         if(gigs[i].price == null) {
            gigs[i].price = 'Gratis!';
         }
      }

      $scope.gigs = gigs;
   });

   $scope.email = 'vildeland@gmail.com';

   $http.get(serverRoot + 'contactpersons').then(function(response) {
      $scope.contactpersons = response.data;
   });

});