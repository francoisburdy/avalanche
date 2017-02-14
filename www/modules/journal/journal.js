'use strict';

angular.module('myApp').controller('JournalCtrl', function($scope, Operation, Export, Translation) {
    Translation.getTranslation($scope);

    function init() {
        $scope.operation = Operation.getOperation();
        $scope.journal = Operation.getJournal($scope.operation);
    }
    init();

    $scope.exportPdf = function() {
        Export.exportCurrentOperation();
    }

});