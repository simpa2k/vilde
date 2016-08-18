define(function() {

   var app = angular.module('vilde');

   app.controller('MainController', function($scope, $rootScope, $http, parallaxHelper, GetAndPrepareGigsService, AsynchIframeService) {

      $scope.title = 'Vilde';
      $scope.background = parallaxHelper.createAnimator(-0.3, 300, -250);
      $scope.foreground = parallaxHelper.createAnimator(-0.1, 150, -150);

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

      var iframe = {
         'id': 'test-iframe',
         'scrolling': 'no',
         'frameborder': 'no',
         'src': 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/238951938&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'
      };

      AsynchIframeService.appendAsynchIframe($("#soundcloud"), iframe);
      $scope.email = 'vildeland@gmail.com';

      $http.get($rootScope.serverRoot + 'contactpersons').then(function(response) {
         $scope.contactpersons = response.data;
      });

   });

});
