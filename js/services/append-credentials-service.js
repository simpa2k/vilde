/**
 * Created by simon on 2016-08-01.
 */
app.service('AppendCredentialsService', [function() {
    var self = this;
    
    self.appendCredentials = function(object, username, token) {
        object['username'] = username;
        object['token'] = token;
    }
}]);