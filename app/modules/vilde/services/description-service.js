define(function() {

    var app = angular.module('vilde');

    app.factory('DescriptionService', ['$http', '$rootScope', function($http, $rootScope) {
        var descriptionEndpoint = $rootScope.serverRoot + 'description';
        var promise;

        var decodeHtml = function(html) {
            var textArea = document.createElement('textarea');
            textArea.innerHTML = html;
            return textArea.value;
        };

        var pickOutDropCap = function(description) {
            var description = decodeHtml(description);
            var dropCapAndTruncatedDescription = {};
            var previousLetter = '';

            for(var i = 0; i < description.length; i++) {
                var currentLetter = description.charAt(i);

                /*
                 * If we find a character that is not '<' and is preceded by a '>', we ought to have found
                 * the first letter of the actual content. This letter will be formatted as a drop cap.
                 */

                if((previousLetter == '>') && (currentLetter != '<')) {
                    dropCapAndTruncatedDescription.dropCap = currentLetter;
                    dropCapAndTruncatedDescription.truncatedContent = description.slice(0, i) + description.slice(i + 1);

                    return dropCapAndTruncatedDescription;
                } else {
                    previousLetter = currentLetter;
                }
            }
        };

        var concatenateObjects = function(object1, object2) {
            var concatenatedObject = jQuery.extend({}, object1);

            for(var property in object2) {
                concatenatedObject[property] = object2[property];
            }

            return concatenatedObject;
        };

        var buildDescriptionObject = function(descriptionObject) {
            var description = descriptionObject.content;
            var dropCapAndTruncatedDescription = pickOutDropCap(description);

            return concatenateObjects(descriptionObject, dropCapAndTruncatedDescription);
        };

        var descriptionService = {
            getDescription: function() {
                if(!promise) {
                    promise = $http.get(descriptionEndpoint).then(function(response) {
                        return buildDescriptionObject(response.data[0]);
                    });
                }
                //By returning the promise, the $http request won't be made unless it has to be.
                //See http://stackoverflow.com/questions/12505760/processing-http-response-in-service
                return promise;
            },
            refreshDescription: function() {
                promise = $http.get(descriptionEndpoint).then(function(response) {
                    return buildDescriptionObject(response.data[0].content);
                });
                return promise;
            }
        };
        return descriptionService;
    }]);

});
