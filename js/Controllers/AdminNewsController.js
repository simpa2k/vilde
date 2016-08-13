/**
 * Created by simon on 2016-08-01.
 */
app.controller('AdminNewsController', function($scope,
                                               $rootScope,
                                               $http,
                                               AuthenticationService,
                                               SendObjectService,
                                               AppendCredentialsService,
                                               GetDateService) {
    
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
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.putObject(newsEndpoint, $scope.newsItemToBeSent, function() {
            getNews();
        });
    };

    $scope.postNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token);

        console.log($scope.newsItemToBeSent);
        SendObjectService.postObject(newsEndpoint, $scope.newsItemToBeSent, function() {
            getNews();
            $scope.setPostState();
        });
    };

    $scope.deleteNewsItem = function() {
        AppendCredentialsService.appendCredentials($scope.newsItemToBeSent, username, token); 

        SendObjectService.deleteObject(newsEndpoint, $scope.newsItemToBeSent, function() {
            getNews();
            $scope.setPostState();
        });
    };
    
    getNews();
    $scope.setPostState();
});
