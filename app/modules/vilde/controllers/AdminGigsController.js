define(function() {
    
    var app = angular.module('vilde');
    
    app.controller('AdminGigsController', function($scope,
                                                   $rootScope,
                                                   $http,
                                                   GigsService,
                                                   SendObjectService) {

        var refreshGigs = function() {
            GigsService.refreshGigs().then(function(gigs) {
                $scope.gigs = gigs;
            });
        };

        var getVenues = function() {
            $http.get($rootScope.serverRoot + 'venues').then(function (response) {
                $scope.venues = {};
                angular.forEach(response.data, function (value) {
                    $scope.venues[value.name] = value;
                });
            });
        };

        $scope.date = $scope.currentDate;

        $scope.dateFilter = function() {
            return function(gig) {
                return gig.date >= $scope.date;
            }
        };

        $scope.gigToBeSent = {};

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

        var selectVenue = function(venueName) {
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
            $scope.gigToBeSent = {};

            $scope.heading = 'Lägg till nytt gig';
            $scope.gigAction = 'Lägg till gig';
            $scope.addingNewGig = true;
            $scope.selectedVenue = undefined;
            $scope.sendGig = $scope.postGig;
        };

        var sendVenue = function() {
            $scope.selectedVenue.name = $scope.gigToBeSent.venue_name;
            var venueForComparison = $scope.venues[$scope.selectedVenue.name];
            var venuesEndpoint = $scope.serverRoot + 'venues';

            if(venueForComparison == undefined) {
                // If there is no venue with the specified name, post the venue (i.e. create it).
                SendObjectService.postObject(venuesEndpoint, $scope.selectedVenue, function() {
                    getVenues();
                });
            } else if(JSON.stringify($scope.selectedVenue) != JSON.stringify(venueForComparison)) {
                /* 
                 If there is a venue with the specified name, but some of the other fields have been changed,
                 put the venue (i.e. update it).
                 */
                SendObjectService.putObject(venuesEndpoint, $scope.selectedVenue, function() {
                    getVenues();
                });
            }
        };

        var gigsEndpoint = $rootScope.serverRoot + 'gigs';

        $scope.putGig = function() {
            sendVenue();
            SendObjectService.putObject(gigsEndpoint, $scope.gigToBeSent, function() {
                refreshGigs();
            });
        };

        $scope.postGig = function() {
            sendVenue();
            SendObjectService.postObject(gigsEndpoint, $scope.gigToBeSent, function() {
                refreshGigs();
                $scope.setPostState();
            });
        };

        $scope.deleteGig = function() {
            SendObjectService.deleteObject(gigsEndpoint, $scope.gigToBeSent, function() {
                refreshGigs();
                $scope.setPostState();
            });
        };

        getVenues();
        $scope.setPostState();

    });
    
});
