/**
 * Created by simon on 2016-08-01.
 */
app.controller('AdminNewsController', function($scope, $rootScope, $http, AuthenticationService, SendObjectService, AppendCredentialsService) {
    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');
    
    AuthenticationService.checkToken(username, token);
    
    function getNews() {
        $http.get($rootScope.serverRoot + 'news').then(function(response) {
            $scope.news = response.data;
        });
    };

    $scope.newsItemToBeSent = {
        id: '',
        date: '',
        content: ''
    };

    $scope.assignFocus = function(newsItem) {
        $scope.newsItemToBeSent.id = newsItem.id;
        $scope.newsItemToBeSent.date = newsItem.date;
        $scope.newsItemToBeSent.content = newsItem.content;

        $scope.heading = 'Redigera nyhet';
        $scope.newsItemAction = 'Uppdatera nyhet';
        $scope.addingNewNewsItem = false;
        $scope.sendNewsItem = $scope.putNewsItem();
    };

    $scope.removeFocus = function() {
        angular.forEach($scope.newsItemToBeSent, function(value, key) {
            $scope.newsItemToBeSent[key] = '';
        });

        $scope.heading = 'Lägg till nyhet';
        $scope.newsItemAction = 'Lägg till nyhet';
        $scope.addingNewNewsItem = true;
        $scope.sendNewsItem = $scope.postNewsItem;
    };
    var newsEndpoint = $rootScope.serverRoot + 'news';

    $scope.putNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.putObject(newsEndpoint, $scope.gigToBeSent, function(news) {
            getNews();
        });
    };

    $scope.postNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.postObject(newsEndpoint, $scope.gigToBeSent, function(news) {
            getNews();
        });
    };

    $scope.deleteNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.deleteObject(newsEndpoint, $scope.gigToBeSent, function(news) {
            getNews();
        });
    };
    
    getNews();
    $scope.heading = 'Lägg till nyhet';
    $scope.newsItemAction = 'Lägg till nyhet';
    $scope.addingNewNewsItem = true;
    $scope.sendNewsItem = $scope.postNewsItem;
});
