/**
 * Created by simon on 2016-08-01.
 */
app.controller('AdminNewsController', function($scope, $rootScope, $http) {
    $http.get($rootScope.serverRoot + 'news').then(function(response) {
        $scope.news = response.data;
    });
});
