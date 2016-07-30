/**
 * Created by simon on 2016-07-30.
 */
app.service('AuthenticationService', ['$rootScope', '$http', '$location', function($rootScope, $http, $location) {
   var self = this;

   self.checkToken = function(username, token) {
      $http.get($rootScope.serverRoot + 'users?username=' + username + '&token=' + token).error(function(response) {
         $location.path('/');
      })
   }

}]);
