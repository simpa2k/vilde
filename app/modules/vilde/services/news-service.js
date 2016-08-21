define(function() {

    var app = angular.module('vilde');

    app.factory('NewsService', ['$http', '$rootScope', function($http, $rootScope) {
        var newsEndpoint = $rootScope.serverRoot + 'news';
        var promise;
        var newsService = {
            getNews: function() {
                if(!promise) {
                    promise = $http.get(newsEndpoint).then(function(response) {
                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshNews: function() {
                return $http.get(newsEndpoint).then(function(response) {
                    return response.data;
                });
            }
        };
        return newsService;
    }]);

});
