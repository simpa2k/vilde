define(function() {

    var app = angular.module('vilde');

    app.directive('youtube', function() {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {

                /*
                 * From https://www.sitepoint.com/faster-youtube-embeds-javascript/, with minor modifications.
                 */

                // Based on the YouTube ID, we can easily find the thumbnail image
                element.css('background-image', 'url(http://i.ytimg.com/vi/' + attrs.id + '/sddefault.jpg)');
                console.log(element.width());

                // Overlay the Play icon to make it look like a video player
                element.append($('<div/>', {'class': 'play'}));

                $(document).delegate('#'+ attrs.id, 'click', function() {
                    // Create an iFrame with autoplay set to true
                    var iframeUrl = 'https://www.youtube.com/embed/' + attrs.id + '?autoplay=1&autohide=1';

                    // The height and width of the iFrame should be the same as parent
                    var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframeUrl, 'width': element.width(), 'height': element.height() })

                    // Replace the YouTube thumbnail with YouTube HTML5 Player
                    element.replaceWith(iframe);
                });
            }
        }
    });

});