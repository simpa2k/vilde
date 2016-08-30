define(function() {

    var app = angular.module('vilde');

    app.controller('AdminNewsController', function($scope,
                                                   $rootScope,
                                                   $http,
                                                   NewsService,
                                                   DateService,
                                                   SendObjectService) {

        var refreshNews = function() {
            NewsService.refreshNews().then(function(news) {
                $scope.news = news;
            });
        };


        $scope.datetime = NewsService.getEarliestNewsItemDate($scope.news);

        $scope.newsItemDatePopup = {
            opened: false
        };

        $scope.openNewsItemDatePopup = function() {
            $scope.newsItemDatePopup.opened = true;
        };

        $scope.newsDateFilter = function() {
            return function(newsItem) {
                return DateService.compareYearMonthDay(newsItem.date, $scope.datetime);
            }
        };

        $scope.newsItemToBeSent = {};

        $scope.sendNewsItem = $scope.postNewsItem;

        $scope.setPutState = function(newsItem) {
            $scope.newsItemToBeSent.id = newsItem.id;
            $scope.newsItemToBeSent.date = newsItem.date;
            $scope.newsItemToBeSent.content = newsItem.content;

            $scope.heading = 'Redigera nyhet';
            $scope.newsItemAction = 'Bekräfta ändringar';
            $scope.addingNewNewsItem = false;
            $scope.sendNewsItem = $scope.putNewsItem;
        };

        $scope.setPostState = function() {
            $scope.newsItemToBeSent = {};
            DateService.getCurrentDatetime(function(currentDate) {
                $scope.newsItemToBeSent.date = currentDate;
            });

            $scope.heading = 'Lägg till nyhet';
            $scope.newsItemAction = 'Lägg till nyhet';
            $scope.addingNewNewsItem = true;
            $scope.sendNewsItem = $scope.postNewsItem;
        };

        var newsEndpoint = $rootScope.serverRoot + 'news';

        $scope.makeRequest = function() {
            $scope.newsItemToBeSent.date = DateService.stringifyDate($scope.newsItemToBeSent.date, 'yyyy-MM-dd');
            console.log($scope.newsItemToBeSent);

            $scope.sendNewsItem();
        };

        $scope.putNewsItem = function() {
            SendObjectService.putObject(newsEndpoint, $scope.newsItemToBeSent, function() {
                refreshNews();
            });
        };

        $scope.postNewsItem = function() {
            SendObjectService.postObject(newsEndpoint, $scope.newsItemToBeSent, function() {
                refreshNews();
                $scope.setPostState();
            });
        };

        $scope.deleteNewsItem = function() {
            SendObjectService.deleteObject(newsEndpoint, $scope.newsItemToBeSent, function() {
                refreshNews();
                $scope.setPostState();
            });
        };

        $scope.setPostState();
    });
    
});
