/**
 * Created by simon on 2016-08-01.
 */
app.controller('AdminNewsController', function($scope, $rootScope, $http, AuthenticationService, SendObjectService) {
    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');
    
    $scope.getNews = function() {
        $http.get($rootScope.serverRoot + 'news').then(function(response) {
            $scope.news = response.data;
        });
    };

    $scope.newsItemToBeSent = {
        id: '',
        date: '',
        content: ''
    };

    $scope.putNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.putObject(gigsEndpoint, $scope.gigToBeSent, function(news) {
            $scope.getNews();
        });
    };

    $scope.postNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.postObject(gigsEndpoint, $scope.gigToBeSent, function(news) {
            $scope.getNews();
        });
    };

    $scope.deleteNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.deleteObject(gigsEndpoint, $scope.gigToBeSent, function(news) {
            $scope.getNews();
        });
    };
    
    $scope.getNews();
});
