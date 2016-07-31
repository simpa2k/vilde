/**
 * Created by simon on 2016-07-31.
 */
app.directive('gig', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/gig.html',
        link: function($scope, element, attrs) {
            element.bind('click', function() {
                if(element.hasClass('expanded')) {
                    element.removeClass('expanded');
                    element.addClass('collapsed');

                } else {
                    element.removeClass('collapsed');
                    element.addClass('expanded');
                }
            });
        }
    };
});