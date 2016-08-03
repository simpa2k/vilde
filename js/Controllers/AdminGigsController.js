/**
 * Created by simon on 2016-07-30.
 */
app.controller('AdminGigsController', function($scope, 
                                               $rootScope, 
                                               $http, 
                                               AuthenticationService, 
                                               GetAndPrepareGigsService,
                                               AppendCredentialsService,
                                               SendObjectService) {

    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');

    AuthenticationService.checkToken(username, token);
    
    function getGigs() {
        GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
            console.log(gigs);
            $scope.gigs = gigs;
        });
    };

    $scope.gigToBeSent = {
        id: '',
        date: '',
        time: '',
        ticketlink: '',
        info: '',
        venue_name: '',
        price: ''
    };
    
    $scope.assignFocus = function(gig) {
        $scope.gigToBeSent.id = gig.id;
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
    
    var gigsEndpoint = $rootScope.serverRoot + 'gigs';
    
    $scope.putGig = function() {
       AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token); 
        
       SendObjectService.putObject(gigsEndpoint, $scope.gigToBeSent, function() {
           getGigs();
       });
    };
    
    $scope.postGig = function() {
        AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token); 
        
        SendObjectService.postObject(gigsEndpoint, $scope.gigToBeSent, function() {
            getGigs();
            $scope.removeFocus();
        });
    };
    
    $scope.deleteGig = function() {
        AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token); 
        
        SendObjectService.deleteObject(gigsEndpoint, $scope.gigToBeSent, function() {
            getGigs();
            $scope.removeFocus();
        });
    };
    
    getGigs();
    $scope.heading = 'Lägg till nytt gig';
    $scope.gigAction = 'Lägg till gig';
    $scope.addingNewGig = true;
    $scope.sendGig = $scope.postGig;
    
});
