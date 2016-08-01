/**
 * Created by simon on 2016-08-01.
 */
app.service('SendObjectService', ['$http', function($http) {
    var self = this;
    
    function countNumberOfProperties(object) {
        var counter = 0;
        
        angular.forEach(object, function() {
           counter++; 
        });
        
        return counter;
    }
    
    function constructUri(endpoint, object) {
        var uri = endpoint + '?';
        var numberOfIterations = countNumberOfProperties(object);
        var counter = 0;

        angular.forEach(object, function(value, key) {
            uri += key + '=' + value;
            counter++;
            if(counter < numberOfIterations) {
                uri += '&';
            }
        });
        return uri;
    };
    
    self.putObject = function(endpoint, object, callback) {
        $http.put(constructUri(endpoint, object)).then(function(response) {
           callback(response.data); 
        });
    };
    
    self.postObject = function(endpoint, object, callback) {
        $http.post(constructUri(endpoint, object)).then(function(response) {
            callback(response.data);
        });
    };
    
    self.deleteObject = function(endpoint, object, callback) {
        $http.delete(constructUri(endpoint, object)).then(function(response) {
            callback(response.data);
        });
    };
    
}]);
