define(function() {

    var app = angular.module('vilde');

    app.factory('QuoteSectionsService', ['$http', '$rootScope', function($http, $rootScope) {
        var quoteSectionsEndpoint = $rootScope.serverRoot + 'quotesections';
        var firstQuoteSectionPromise;
        var secondQuoteSectionPromise;
        var quoteSectionsService = {
            getFirstQuoteSection: function() {
                if(!firstQuoteSectionPromise) {
                    firstQuoteSectionPromise = $http.get(quoteSectionsEndpoint + '?id=1').then(function(response) {
                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return firstQuoteSectionPromise;
            },
            refreshFirstQuoteSection: function() {
                firstQuoteSectionPromise = $http.get(quoteSectionsEndpoint + '?id=1').then(function(response) {
                    return response.data;
                });
                return firstQuoteSectionPromise;
            },
            getSecondQuoteSection: function() {
                if(!secondQuoteSectionPromise) {
                    secondQuoteSectionPromise = $http.get(quoteSectionsEndpoint + '?id=2').then(function(response) {
                        return response.data;
                    });
                }
                return secondQuoteSectionPromise;
            },
            refreshSecondQuoteSection: function() {
                secondQuoteSectionPromise = $http.get(quoteSectionsEndpoint + '?id=2').then(function(response) {
                    return response.data;
                });
                return secondQuoteSectionPromise;
            }
        };
        return quoteSectionsService;
    }]);

});
