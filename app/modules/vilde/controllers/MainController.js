define(function() {

   var app = angular.module('vilde');

   app.controller('MainController', function($scope, $rootScope, $http, parallaxHelper, GetAndPrepareGigsService, AsynchIframeService) {

      $scope.title = 'Vilde';
      $scope.background = parallaxHelper.createAnimator(-0.3, 300, -250);
      $scope.foreground = parallaxHelper.createAnimator(-0.1, 150, -150);

      function getElement(getFunction) {
        getFunction('#about');
      }

      $scope.headings = [
         {'OM VILDE': '#about'},
         {'MEDLEMMAR': '#member-section'},
         {'NYHETER': '#news'},
         {'KONSERTER': '#gigs'},
         {'MEDIA': '#media-section'},
         {'KONTAKT': '#contact'}
      ];
      $scope.adminHeadings = [
         {'DASHBOARD': 'admin.dashboard'},
         {'KONSERTER': 'admin.gigs'},
         {'NYHETER': 'admin.news'}
      ];

      $http.get($rootScope.serverRoot + 'description').then(function(response) {
         $scope.description = response.data;
      });

      $http.get($rootScope.serverRoot + 'quotes?id=1').then(function(response) {
         $scope.quote1 = response.data[0];
      });

      $http.get($rootScope.serverRoot + 'quotes?id=2').then(function(response) {
         $scope.quote2 = response.data[0];
      });

      $http.get($rootScope.serverRoot + 'news').then(function(response) {
         $scope.news = response.data;
      });

      GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
         $scope.gigs = gigs;
      });

      $scope.email = 'vildeland@gmail.com';

      $http.get($rootScope.serverRoot + 'contactpersons').then(function(response) {
         $scope.contactpersons = response.data;
      });

   });

});
