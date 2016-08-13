/**
 * Created by simon on 2016-07-29.
 */

app.controller('LoginController', function($scope, $rootScope, $http, $state, AuthenticationService) {

    $scope.loginInfo = {
        username: '',
        password: ''
    }

    $scope.sendCredentials = function() {
        AuthenticationService.login($scope.loginInfo.username, $scope.loginInfo.password, function(response) {
            localStorage.setItem('username', $scope.loginInfo.username);
            localStorage.setItem('token', response.token);
            $state.go('admin.dashboard');
        });
    };

});
