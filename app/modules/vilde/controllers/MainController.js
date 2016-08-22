define(function() {

   var app = angular.module('vilde');

   app.controller('MainController', function($scope,
                                             $rootScope,
                                             $http,
                                             parallaxHelper,
                                             GetDateService,
                                             DescriptionService,
                                             QuotesService,
                                             QuoteSectionsService,
                                             NewsService,
                                             GigsService) {

      $scope.title = 'Vilde';
      $scope.background = parallaxHelper.createAnimator(-0.3, 300, -250);
      $scope.foreground = parallaxHelper.createAnimator(-0.1, 150, -150);

      GetDateService.getCurrentDate(function(currentDate) {
          $scope.currentDate = currentDate;
      });

      $scope.description = {};

      DescriptionService.getDescription().then(function(descriptionObject) {
         $scope.description = descriptionObject;
      });


      QuoteSectionsService.getFirstQuoteSection().then(function(firstQuoteSection) {
         $scope.firstQuoteSection = firstQuoteSection[0];
      });

      QuoteSectionsService.getSecondQuoteSection().then(function(secondQuoteSection) {
         $scope.secondQuoteSection = secondQuoteSection[0];
      });

      NewsService.getNews().then(function(news) {
         $scope.news = news;
      });

      GigsService.getGigs().then(function(gigs) {
         $scope.gigs = gigs;
      });

      $scope.email = 'vildeland@gmail.com';

      $http.get($rootScope.serverRoot + 'contactpersons').then(function(response) {
         $scope.contactpersons = response.data;
      });

   });

});
