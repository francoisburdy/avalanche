'use strict';

angular.module('myApp').controller('DashboardCtrl', function($scope, $location, Operation) {

    $scope.operation = Operation.getOperation();

    $scope.terminate = function() {
        Operation.terminate();
        $location.url('/home');
    }

    $scope.editVictime = function(num) {
        $location.url('/victimes/' + num);
    }

    $scope.deleteIntervenant = function() {
        alert("deleteIntervenant");
    }

    $scope.$on('$viewContentLoaded', function() {
        //var imageData = storage.getItem("imageData"); // Pass a key name and its value to add or update that key.
        //refreshImageContent(imageData);
    });

    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
