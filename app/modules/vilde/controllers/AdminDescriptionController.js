define(function() {

    var app = angular.module('vilde');

    app.controller('AdminDescriptionController', function($scope,
                                                          $rootScope,
                                                          $http,
                                                          DescriptionService,
                                                          SendObjectService) {

        $scope.descriptionToBeSent = {};

        var updateDescriptionToBeSent = function() {
          $scope.descriptionToBeSent.id = $scope.description.id;
          $scope.descriptionToBeSent.content = $scope.description.content;
        };

        $scope.putDescription = function() {
            SendObjectService.putObject($rootScope.serverRoot + 'description', $scope.descriptionToBeSent, function() {
                DescriptionService.refreshDescription().then(function(descriptionObject) {
                    $scope.description = descriptionObject;

                    updateDescriptionToBeSent();
                });
            });
        };

        updateDescriptionToBeSent();
    });

});