/**
 * Created by simon on 2016-07-29.
 */
var app = angular.module('vilde', ['ngRoute', 'duParallax']);

app.config(function($routeProvider) {
   $routeProvider

       .when('/', {
          templateUrl : 'partials/home.html',
          controller  : 'MainController'
       })
      
       .when('/login', {
          templateUrl : 'partials/login.html',
          controller : 'LoginController'
       })
        
       .when('/admin', {
           templateUrl : 'partials/admin.html',
           controller : 'AdminController'
       })
    
       .when('/admin/gigs', {
           templateUrl : 'partials/gigs.html',
           controller : 'AdminGigsController'
       });

});

app.run(function($rootScope) {
    $rootScope.serverRoot = 'backend/server.php/';
});
