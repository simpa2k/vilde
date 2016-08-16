define(function() {

    var app = angular.module('vilde');
    
    app.service('GetAndPrepareGigsService', ['$rootScope', '$http', 'GetDateService', function($rootScope, $http, GetDateService) {
        var self = this;

        self.getAndPrepareGigs = function(callback) {
            GetDateService.getCurrentDate(function(currentDate) {
                $http.get($rootScope.serverRoot + 'gigs?date=gte=' + currentDate).then(function(response) {
                    var gigs = response.data;

                    for(var i = 0; i < gigs.length; i++) {
                        if(gigs[i].price == null) {
                            gigs[i].price = 'Gratis!';
                        }
                    }
                    callback(gigs);
                });
            });
        }
    }]);
    
});
