define(function() {

    var app = angular.module('vilde');

    app.controller('AdminQuotesController', function($scope, $rootScope, QuotesService, SendObjectService) {

        $scope.quoteToBeSent = {};

        var refreshQuotes = function() {
            QuotesService.refreshQuotes().then(function(quotes) {
                $scope.quotes = quotes;
            });
        };

        $scope.setPutState = function(quote) {
            $scope.quoteToBeSent.id = quote.id;
            $scope.quoteToBeSent.review = quote.review;
            $scope.quoteToBeSent.source = quote.source;

            $scope.heading = 'Redigera citat';
            $scope.quoteAction = 'Bekräfta ändringar';
            $scope.addingNewQuote = false;
            $scope.sendQuote = $scope.putQuote;
        };

        $scope.setPostState = function() {
            $scope.quoteToBeSent = {};

            $scope.heading = 'Lägg till nytt citat';
            $scope.quoteAction = 'Lägg till citat';
            $scope.addingNewQuote = true;
            $scope.sendQuote = $scope.postQuote;
        };

        var quotesEndpoint = $rootScope.serverRoot + 'quotes';

        $scope.putQuote = function() {
            SendObjectService.putObject(quotesEndpoint, $scope.quoteToBeSent, function() {
                refreshQuotes();
            });
        };

        $scope.postQuote = function() {
            SendObjectService.postObject(quotesEndpoint, $scope.quoteToBeSent, function() {
                refreshQuotes();
                $scope.setPostState();
            });
        };

        $scope.deleteQuote = function() {
            SendObjectService.deleteObject(quotesEndpoint, $scope.quoteToBeSent, function() {
                refreshQuotes();
                $scope.setPostState();
            });
        };

        $scope.setPostState();

    });

});
