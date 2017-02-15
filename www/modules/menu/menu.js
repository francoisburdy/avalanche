'use strict';

angular.module('myApp').controller('MenuCtrl', function($scope, Operation, Translation) {

    function init() {
        Translation.getTranslation($scope);
        $scope.hasOperation = Operation.getOperation() != null;
    }
    
    init();

    $scope.$on('operationUpdated', function(event) {
        $scope.hasOperation = Operation.getOperation() != null;
    });

    $scope.$on('dataFlushed', function(event) {
        $scope.hasOperation = Operation.getOperation() != null;
    });

    $scope.$on('langUpdated', function(event) {
        Translation.getTranslation($scope);
    });
});