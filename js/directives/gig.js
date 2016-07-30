/**
 * Created by simon on 2016-07-30.
 */
app.directive('gig', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/gig.html',
        link: function($scope, element, attrs) {
            element.bind('click', function() {
                var data = $scope.$eval(attrs.data);

                $scope.newGig.date = data.date;
                $scope.newGig.time = data.time;
                $scope.newGig.ticketlink = data.ticketlink;
                $scope.newGig.info = data.info;
                $scope.newGig.venue_name = data.venue_name;
                $scope.newGig.price = data.price;
                $scope.$apply();
            });
        }
    };
});