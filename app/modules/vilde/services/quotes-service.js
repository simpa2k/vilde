define(function() {

    var app = angular.module('vilde');

    app.factory('QuotesService', ['$http', '$rootScope', function($http, $rootScope) {
        var quotesEndpoint = $rootScope.serverRoot + 'quotes';
        var promise;
        var quotesService = {
            getQuotes: function() {
                if(!promise) {
                    promise = $http.get(quotesEndpoint).then(function(response) {
                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshQuotes: function() {
                promise = $http.get(quotesEndpoint).then(function(response) {
                    return response.data;
                });
                return promise;
            }
        };
        return quotesService;
    }]);

});
