/**
 * Created by simon on 2016-07-29.
 */
var app = angular.module('vilde', ['ui.router', 'duParallax', 'ui.tinymce', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {
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

});

app.run(['$rootScope', '$state', 'AuthenticationService', function($rootScope, $state, AuthenticationService) {
    $rootScope.serverRoot = 'backend/server.php/';

    $rootScope.$on('$stateChangeStart', function(event, toState) {
         var requireLogin = toState.data['requireLogin'];

         if(requireLogin) {
             var username = localStorage.getItem('username');
             var token = localStorage.getItem('token');

             AuthenticationService.checkToken(username, token, function() {
                 event.preventDefault();
                 $state.go('home');
             });
         }

     });
}]);

