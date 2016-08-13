/**
 * Created by simon on 2016-07-29.
 */

app.controller('LoginController', function($scope, $rootScope, $http, $location, AuthenticationService) {

    $scope.loginInfo = {
        username: '',
        password: ''
    }

    $scope.sendCredentials = function() {
        AuthenticationService.login($scope.loginInfo.username, $scope.loginInfo.password, function(response) {
            localStorage.setItem('username', $scope.loginInfo.username);
            localStorage.setItem('token', response.token);
            $location.path('/admin/dashboard');
        });
    };

});
