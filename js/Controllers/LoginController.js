/**
 * Created by simon on 2016-07-29.
 */

app.controller('LoginController', function($scope, $rootScope, $http, $location) {

    $scope.loginInfo = {
        username: '',
        password: ''
    }

    $scope.sendCredentials = function() {
        $http.get($rootScope.serverRoot + 'users?username=' + $scope.loginInfo.username + '&password=' + $scope.loginInfo.password).then(function(response) {
            localStorage.setItem("username", $scope.loginInfo.username);
            localStorage.setItem("token", response.data.token);
            $location.path('/admin');
        });
    };

});
