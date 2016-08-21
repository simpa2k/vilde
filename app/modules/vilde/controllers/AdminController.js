define(function() {

    var app = angular.module('vilde');

    app.controller('AdminController', function($scope, $rootScope, $http, AuthenticationService) {

        $scope.headings = [
            {
                'BESKRIVNING': 'admin.description',
                'CITAT': 'admin.quotes',
                'NYHETER': 'admin.news'
            },
            {
                'KONSERTER': 'admin.gigs',
                'KONTAKT': 'admin.contact'
            }
        ]

    });
});
