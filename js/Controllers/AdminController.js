/**
 * Created by simon on 2016-07-30.
 */
app.controller('AdminController', function($scope, $rootScope, $http, AuthenticationService) {

    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');
    
    AuthenticationService.checkToken(username, token);

});
