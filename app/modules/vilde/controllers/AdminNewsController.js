define(function() {

    var app = angular.module('vilde');

    app.controller('AdminNewsController', function($scope,
                                                   $rootScope,
                                                   $http,
                                                   NewsService,
                                                   SendObjectService,
                                                   GetDateService) {

        var refreshNews = function() {
            NewsService.refreshNews().then(function(news) {
                $scope.news = news;
            });
        };

        $scope.newsItemToBeSent = {
            id: '',
            date: '',
            content: ''
        };

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
            angular.forEach($scope.newsItemToBeSent, function(value, key) {
                if(key === 'date') {
                    GetDateService.getCurrentDate(function(currentDate) {
                        $scope.newsItemToBeSent[key] = currentDate;
                    });
                } else {
                    $scope.newsItemToBeSent[key] = '';
                }
            });

            $scope.heading = 'Lägg till nyhet';
            $scope.newsItemAction = 'Lägg till nyhet';
            $scope.addingNewNewsItem = true;
            $scope.sendNewsItem = $scope.postNewsItem;
        };

        var newsEndpoint = $rootScope.serverRoot + 'news';

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
