define(function() {

    var app = angular.module('vilde');

    app.factory('NewsService', ['$http', '$rootScope', 'DateService', function($http, $rootScope, DateService) {
        var newsEndpoint = $rootScope.serverRoot + 'news';
        var promise;

        var instantiateNewsItemDates = function(newsItems) {
            for(var i = 0; i < newsItems.length; i++) {
                var date = DateService.parseDate(newsItems[i].date);
                newsItems[i].date = new Date(date['year'], date['month'], date['day']);
            }
        };

        var newsService = {
            getNews: function() {
                if(!promise) {
                    promise = $http.get(newsEndpoint).then(function(response) {
                        instantiateNewsItemDates(response.data);

                        return response.data;
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshNews: function() {
                promise = $http.get(newsEndpoint).then(function(response) {
                    instantiateNewsItemDates(response.data);

                    return response.data;
                });
                return promise;
            },
            getEarliestNewsItemDate: function(newsItems) {
                var earliestDate = newsItems[0].date;

                for(var i = 0; i < newsItems.length; i++) {
                    if(newsItems[i].date < earliestDate) {
                        earliestDate = newsItems[i].date;
                    }
                }

                return earliestDate;
            }
        };
        return newsService;
    }]);

});
