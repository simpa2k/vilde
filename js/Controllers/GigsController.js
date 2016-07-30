/**
 * Created by simon on 2016-07-30.
 */
app.controller('GigsController', function($scope, $rootScope, $http) {
    var date = new Date();
    var year = date.getFullYear()
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

        $scope.gigs = gigs;
        console.log($scope.gigs);
    });

    $scope.newGig = {
        date: '',
        time: '',
        ticketlink: '',
        info: '',
        venue_name: '',
        price: ''
    }
    
    $scope.addGig = function() {
       $http.post($rootScope.serverRoot + 'gigs?date=' + $scope.newGig.date + 
                    '&time=' + $scope.newGig.time +
                    '&ticketlink=' + $scope.newGig.ticketlink +
                    '&info=' + $scope.newGig.info + 
                    '&venue_name=' + $scope.newGig.venue_name + 
                    '&price=' + $scope.newGig.price) 
       .then(function(response) {
            console.log(response.data);    
       }); 
    }
});
