define(function() {

    var app = angular.module('vilde');

    app.factory('GigsService', ['$http', '$rootScope', function($http, $rootScope) {
        var handlePricesSetToZero = function(gigs) {
            for(var i = 0; i < gigs.length; i++) {
                if( (gigs[i].price == null) || (gigs[i].price == '0') ) {
                    gigs[i].price = 'Gratis!';
                }
            }
        };

        var gigsEndpoint = $rootScope.serverRoot + 'gigs';
        var promise;
        var gigsService = {
            getGigs: function() {
                if(!promise) {
                    promise = $http.get(gigsEndpoint).then(function(response) {
                        handlePricesSetToZero(response.data);

                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshGigs: function() {
                return $http.get(gigsEndpoint).then(function(response) {
                    handlePricesSetToZero(response.data);

                    return response.data;
                });
            }
        }
        return gigsService;
    }]);

});
