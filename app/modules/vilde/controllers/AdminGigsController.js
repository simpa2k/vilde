define(function() {
    
    var app = angular.module('vilde');
    
    app.controller('AdminGigsController', function($scope,
                                                   $rootScope,
                                                   $http,
                                                   AuthenticationService,
                                                   GetAndPrepareGigsService,
                                                   AppendCredentialsService,
                                                   SendObjectService) {

        function getGigs() {
            GetAndPrepareGigsService.getAndPrepareGigs(function(gigs) {
                $scope.gigs = gigs;
            });
        };

        function getVenues() {
            $http.get($rootScope.serverRoot + 'venues').then(function (response) {
                $scope.venues = {};
                angular.forEach(response.data, function (value) {
                    $scope.venues[value.name] = value;
                });
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

        /*
         foundVenueRecently tries to determine
         if the user is trying to add a new venue
         or is searching for an already added one.
         As it is now the address, city and webpage fields
         will be cleared if a venue was just found and the
         user continues to change the input field, but
         not if a venue wasn't found. This might not be the optimal solution, however.
         */
        var foundVenueRecently = false;
        $scope.searchVenues = function() {
            // Make sure to create a copy of the venue object 
            var venue = jQuery.extend({}, $scope.venues[$scope.gigToBeSent.venue_name]);
            if(venue !== undefined) {
                $scope.selectedVenue = venue;
                foundVenueRecently = true;
            } else if(foundVenueRecently) {
                $scope.selectedVenue = undefined;
            }

        };

        function selectVenue(venueName) {
            angular.forEach($scope.venues, function(value) {
                if(value.name == venueName) {
                    // Make sure to create a copy of the venue object 
                    $scope.selectedVenue = jQuery.extend({}, value);
                }
            });
        };

        $scope.setPutState = function(gig) {
            $scope.gigToBeSent.id = gig.id;
            $scope.gigToBeSent.date = gig.date;
            $scope.gigToBeSent.time = gig.time;
            $scope.gigToBeSent.ticketlink = gig.ticketlink;
            $scope.gigToBeSent.info = gig.info;
            $scope.gigToBeSent.venue_name = gig.venue_name;
            $scope.gigToBeSent.price = gig.price;

            selectVenue(gig.venue_name);

            $scope.heading = 'Redigera gig';
            $scope.gigAction = 'Bekräfta ändringar';
            $scope.addingNewGig = false;
            $scope.sendGig = $scope.putGig;
        };

        $scope.setPostState = function() {
            angular.forEach($scope.gigToBeSent, function(value, key) {
                $scope.gigToBeSent[key] = '';
            });

            $scope.heading = 'Lägg till nytt gig';
            $scope.gigAction = 'Lägg till gig';
            $scope.addingNewGig = true;
            $scope.selectedVenue = undefined;
            $scope.sendGig = $scope.postGig;
        };

        function sendVenue() {
            $scope.selectedVenue.name = $scope.gigToBeSent.venue_name;
            var venueForComparison = $scope.venues[$scope.selectedVenue.name];
            var venuesEndpoint = $scope.serverRoot + 'venues';

            console.log(JSON.stringify($scope.selectedVenue), JSON.stringify(venueForComparison));
            if(venueForComparison == undefined) {
                // If there is no venue with the specified name, post the venue (i.e. create it)
                //AppendCredentialsService.appendCredentials($scope.selectedVenue, username, token);
                SendObjectService.postObject(venuesEndpoint, $scope.selectedVenue, function() {
                    getVenues();
                });
            } else if(JSON.stringify($scope.selectedVenue) != JSON.stringify(venueForComparison)) {
                /* 
                 If there is a venue with the specified name, but some of the other fields have been changed,
                 put the venue (i.e. update it)
                 */
                //AppendCredentialsService.appendCredentials($scope.selectedVenue, username, token);
                SendObjectService.putObject(venuesEndpoint, $scope.selectedVenue, function() {
                    getVenues();
                });
            }
        };

        var gigsEndpoint = $rootScope.serverRoot + 'gigs';

        $scope.putGig = function() {
            //AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token);

            /*
             The setting of gigToBeSent.venue_name cannot be done before the actual put and post.
             This is to ensure that the venue name sent actually reflects
             the selected venue name as the <select> tag cannot be bound to gigToBeSent.venue_name
             but must be bound to a venue object, due to the fact that the tag's ng-options
             gets its data from venue objects.
             */

            //$scope.gigToBeSent.venue_name = $scope.selectedVenue.name;
            sendVenue();

            SendObjectService.putObject(gigsEndpoint, $scope.gigToBeSent, function() {
                getGigs();
            });
        };

        $scope.postGig = function() {
            //AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token);
            //$scope.gigToBeSent.venue_name = $scope.selectedVenue.name;
            sendVenue();

            SendObjectService.postObject(gigsEndpoint, $scope.gigToBeSent, function() {
                getGigs();
                $scope.setPostState();
            });
        };

        $scope.deleteGig = function() {
            //AppendCredentialsService.appendCredentials($scope.gigToBeSent, username, token);

            SendObjectService.deleteObject(gigsEndpoint, $scope.gigToBeSent, function() {
                getGigs();
                $scope.setPostState();
            });
        };

        $scope.debugVenue = function() {
            console.log($scope.selectedVenue);
            console.log($scope.venues[$scope.selectedVenue.name]);
        };

        getGigs();
        getVenues();
        $scope.setPostState();

    });
    
});
