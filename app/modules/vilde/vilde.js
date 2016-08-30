define(['modules/vilde/runners/authenticationRunner', 'modules/vilde/runners/rootScopeRunner'], function(authenticationRunner, rootScopeRunner) {

   var app = angular.module('vilde', ['ui.bootstrap', 'ui.router', 'duParallax', 'ui.tinymce', 'ngSanitize', 'AuthenticationModule', 'DateModule']);

   app.factory('sessionInjector', ['$injector', function($injector) {
       var sessionInjector = {
           request: function(config) {
               var SendObjectService = $injector.get('SendObjectService');
               var requestMethod = config.method;
               var authenticationRequired = (requestMethod == "POST") || (requestMethod == "PUT") || (requestMethod == "DELETE");

               if(authenticationRequired) {
                   var session = {
                       username: localStorage.getItem('username'),
                       token: localStorage.getItem('token')
                   };
                   config.url = SendObjectService.appendToUri(config.url, session);
                   console.log(config.url);
               }
               return config;
           }
       };
       return sessionInjector;
   }]);
    
   app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
       $urlRouterProvider.otherwise('/home');

       $stateProvider
           .state('home', {
               url: '/home',
               templateUrl: 'partials/home.html',
               controller: 'MainController',
               data: {
                   requireLogin: false
               }
           })

           .state('login', {
               url: '/login',
               templateUrl: 'partials/login.html',
               controller: 'LoginController',
               data: {
                   requireLogin: false
               }
           })

           .state('admin', {
               abstract: true,
               url: '/admin',
               templateUrl: 'partials/admin.html',
               data: {
                   requireLogin: true
               }
           })

           .state('admin.dashboard', {
               url: '/dashboard',
               templateUrl: 'partials/admin-dashboard.html',
               controller: 'AdminController'
           })

           .state('admin.quotes', {
               url: '/quotes',
               templateUrl: 'partials/admin-quotes.html',
               controller: 'AdminQuotesController'
           })

           .state('admin.description', {
               url: '/description',
               templateUrl: 'partials/admin-description.html',
               controller: 'AdminDescriptionController'
           })

           .state('admin.gigs', {
               url: '/gigs',
               templateUrl: 'partials/admin-gigs.html',
               controller: 'AdminGigsController'
           })

           .state('admin.news', {
               url: '/news',
               templateUrl: 'partials/admin-news.html',
               controller: 'AdminNewsController'
           });

       $httpProvider.interceptors.push('sessionInjector');
   });

   app.run(authenticationRunner);
   app.run(rootScopeRunner);

   require(['modules/vilde/references'], function(references) {
     require(references, function() {
        angular.bootstrap(document, ['vilde']);
     });
   });
   
});