'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name JournalCtrl
 */
angular.module('myApp').controller('JournalCtrl', function($scope, Operation, Export, Translation) {

    function init() {
        Translation.getTranslation($scope);
    }
    
    init();

    $scope.exportPdf = function() {
        Export.exportCurrentOperation($scope);
    }

    $scope.$on('translationLoaded', function(event) {
        $scope.operation = Operation.getOperation();
        $scope.journal = Operation.getJournal($scope.operation, $scope);
    });
});