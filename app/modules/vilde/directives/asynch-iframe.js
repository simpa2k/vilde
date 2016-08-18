define(function() {

    var app = angular.module('vilde');

    app.directive('asynchIframe', function() {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
               var iframe = $(document.createElement("iframe"));
               iframe.attr({
                   'scrolling': attrs.scrolling,
                   'frameborder': attrs.frameborder,
                   'src': attrs.src
               });

               element.append(iframe);
            }
        }
    });

});