/**
 * Created by simon on 2016-07-31.
 */
app.service('GetAndPrepareGigsService', ['$rootScope', '$http', function($rootScope, $http) {
    var self = this;
    
    self.getAndPrepareGigs = function(callback) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDay();

        var currentDate = year + "-" + month + "-" + day;

        $http.get($rootScope.serverRoot + 'gigs?date=gte=' + currentDate).then(function(response) {
            var gigs = response.data;

            for(var i = 0; i < gigs.length; i++) {
                if(gigs[i].price == null) {
                    gigs[i].price = 'Gratis!';
                }
            }
            callback(gigs);
        });
    }
}]);