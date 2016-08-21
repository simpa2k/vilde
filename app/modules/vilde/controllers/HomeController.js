define(function() {

    var app = angular.module('vilde');

    app.controller('HomeController', function($scope) {

        $scope.headings = [
            {
                'OM VILDE': '#about',
                'MEDLEMMAR': '#member-section',
                'NYHETER': '#news'
            },

            {
                'KONSERTER': '#gigs',
                'MEDIA': '#media-section',
                'KONTAKT': '#contact'
            }
        ];

        $scope.socialmedia = {
            'https://soundcloud.com/vildeland': 'images/socialmedia/sc29.png',
            'http://www.facebook.com/vildeland': 'images/socialmedia/facebooklogga_29.png',
            'https://www.youtube.com/channel/UC-v-m14JPztcf6mKgQif9NA': 'images/socialmedia/yt29.png'
        };

    });

});