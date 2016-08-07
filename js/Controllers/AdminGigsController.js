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
            $scope.gigs = gigs;
        });
    };
    
    $http.get($rootScope.serverRoot + 'venues').then(function(response) {
        $scope.venues = response.data;
        $scope.selectedVenue = $scope.venues[0];
    });

    $scope.gigToBeSent = {
        id: '',
        date: '',
        time: '',
        ticketlink: '',
        info: '',
        venue_name: '',
        price: ''
    };
    
    function selectVenue(venueName) {
        angular.forEach($scope.venues, function(value) {
            if(value.name == venueName) {
                $scope.selectedVenue = value;
            }
        });
    };
    
    $scope.assignFocus = function(gig) {
        $scope.gigToBeSent.id = gig.id;
        $scope.gigToBeSent.date = gig.date;
        $scope.gigToBeSent.time = gig.time;
        $scope.gigToBeSent.ticketlink = gig.ticketlink;
        $scope.gigToBeSent.info = gig.info;
        $scope.gigToBeSent.price = gig.price;
        
        selectVenue(gig.venue_name);
        
        $scope.heading = 'Redigera gig';
        $scope.gigAction = 'Bekräfta ändringar';
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
       
       /*
        This needs to be done on put and post in order
        to ensure that the venue name sent actually reflects
        the selected venue name as the <select> tag cannot be bound to gigToBeSent.venue_name
        but must be bound to a venue object, due to the fact that the tag's ng-options
        gets its data from venue objects.
         */
        
       $scope.gigToBeSent.venue_name = $scope.selectedVenue.name; 
        
       SendObjectService.putObject(gigsEndpoint, $scope.gigToBeSent, function() {
           getGigs();
       });
    };
    
    $scope.postGig = function() {
        AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token);
        $scope.gigToBeSent.venue_name = $scope.selectedVenue.name;

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
    /*$scope.heading = 'Lägg till nytt gig';
    $scope.gigAction = 'Lägg till gig';
    $scope.addingNewGig = true;
    $scope.sendGig = $scope.postGig;*/
    $scope.removeFocus();
    
});
