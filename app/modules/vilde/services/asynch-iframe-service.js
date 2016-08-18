define(function() {

    var app = angular.module('vilde');

    app.service('AsynchIframeService', [function() {

        var self = this;

        self.appendAsynchIframe = function(parentElement, attributes) {
            var iframe = $(document.createElement('iframe'));
            iframe.attr(attributes);
            console.log($(parentElement));

            parentElement.append(iframe);
        }

    }]);

});
