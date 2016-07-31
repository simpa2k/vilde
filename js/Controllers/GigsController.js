/**
 * Created by simon on 2016-07-30.
 */
app.controller('GigsController', function($scope, $rootScope, $http, AuthenticationService, GetAndPrepareGigsService) {

    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');

    AuthenticationService.checkToken(username, token);
    
    GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
        $scope.gigs = gigs;
    });

    $scope.gigToBeSent = {
        date: '',
        time: '',
        ticketlink: '',
        info: '',
        venue_name: '',
        price: ''
    };
    
    $scope.assignFocus = function(gig) {
        $scope.gigToBeSent.date = gig.date;
        $scope.gigToBeSent.time = gig.time;
        $scope.gigToBeSent.ticketlink = gig.ticketlink;
        $scope.gigToBeSent.info = gig.info;
        $scope.gigToBeSent.venue_name = gig.venue_name;
        $scope.gigToBeSent.price = gig.price;
        
        $scope.heading = 'Redigera gig';
        $scope.gigAction = 'Uppdatera gig';
        $scope.addingNewGig = false;
        $scope.sendGig = $scope.putGig;
    };
    
    $scope.removeFocus = function() {
        angular.forEach($scope.gigToBeSent, function(value, key) {
            $scope.gigToBeSent[key] = '';
        });

        $scope.heading = 'Lägg till nytt gig';
        $scope.gigAction = 'Lägg till gig';
        $scope.addingNewGig = true;
        $scope.sendGig = $scope.postGig;
    };

    $scope.putGig = function() {
       var uri =  $rootScope.serverRoot + 'gigs?date=' + $scope.gigToBeSent.date +
        '&time=' + $scope.gigToBeSent.time +
        '&ticketlink=' + $scope.gigToBeSent.ticketlink +
        '&info=' + $scope.gigToBeSent.info +
        '&venue_name=' + $scope.gigToBeSent.venue_name +
        '&price=' + $scope.gigToBeSent.price;

       $http.put(uri).then(function(response) {
           GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
               $scope.gigs = gigs;
           });
       }); 
    };
    
    $scope.postGig = function() {
        var uri = $rootScope.serverRoot + 'gigs?date=' + $scope.gigToBeSent.date +
        '&time=' + $scope.gigToBeSent.time +
        '&ticketlink=' + $scope.gigToBeSent.ticketlink +
        '&info=' + $scope.gigToBeSent.info +
        '&venue_name=' + $scope.gigToBeSent.venue_name +
        '&price=' + $scope.gigToBeSent.price;
        
        $http.post(uri).then(function(response) {
            GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
                $scope.gigs = gigs;
            });
        });
    };
    
    $scope.deleteGig = function() {
        var uri = $rootScope.serverRoot + 'gigs?date=' + $scope.gigToBeSent.date +
        '&time=' + $scope.gigToBeSent.time +
        '&ticketlink=' + $scope.gigToBeSent.ticketlink +
        '&info=' + $scope.gigToBeSent.info +
        '&venue_name=' + $scope.gigToBeSent.venue_name +
        '&price=' + $scope.gigToBeSent.price;
        
        console.log(uri);
        $http.delete(uri).then(function(response) {
            GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
                $scope.gigs = gigs;
            });
        });    
    };
    
    $scope.heading = 'Lägg till nytt gig';
    $scope.gigAction = 'Lägg till gig';
    $scope.addingNewGig = true;
    $scope.sendGig = $scope.postGig;
    
});
