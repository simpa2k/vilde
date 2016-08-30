define(function() {

    var app = angular.module('vilde');

    app.factory('GigsService', ['$http', '$rootScope', function($http, $rootScope) {
        var parseDate = function(date) {
            var splitDate = date.split('-');
            var year = splitDate[0];
            var month = parseInt(splitDate[1]) - 1; // Since JavaScript counts months from 0-11
            var day = splitDate[2];

            date = {
                'year': year,
                'month': month,
                'day': day
            };

            return date;

        };

        var parseTime = function(time) {
            var splitTime = time.split(':');
            var hours = splitTime[0];
            var minutes = splitTime[1];

            time = {
                'hours': hours,
                'minutes': minutes
            };

            return time;

        };

        var instantiateGigDate = function(gig) {
            var splitDateTime = gig.datetime.split(' ');
            var date = splitDateTime[0];
            var time = splitDateTime[1];

            date = parseDate(date);
            time = parseTime(time);

            gig.datetime = new Date(date['year'], date['month'], date['day'], time['hours'], time['minutes'])
        };

        var handlePriceSetToZero = function(gig) {
            if( (gig.price == null) || (gig.price == '0') ) {
                gig.price = 'Gratis!';
            }
        };

        var formatGigs = function(gigs) {
            for(var i = 0; i < gigs.length; i++) {
                instantiateGigDate(gigs[i])
                handlePriceSetToZero(gigs[i])
            }
        };

        var gigsEndpoint = $rootScope.serverRoot + 'gigs';
        var promise;
        var gigsService = {
            getGigs: function() {
                if(!promise) {
                    promise = $http.get(gigsEndpoint).then(function(response) {
                        formatGigs(response.data);

                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshGigs: function() {
                promise = $http.get(gigsEndpoint).then(function(response) {
                    formatGigs(response.data);

                    return response.data;
                });
                return promise;
            }
        };
        return gigsService;
    }]);

});
