/**
 * Created by simon on 2016-07-30.
 */
app.directive('gig', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/gig/gig.html',
        controller: function($scope) {
            $scope.template = 'partials/gig/overview.html';
            $scope.toggleEditable = function() {
                $scope.template = ($scope.template == 'partials/gig/overview.html') ? 'partials/gig/editable.html' : 'partials/gig/overview.html'
            }
        }
    };
});