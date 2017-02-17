'use strict';


/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name MenuCtrl
 * @param $scope {service} native scope service
 * @param Operation {service} Avalanche Operation service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('MenuCtrl', function($scope, Operation, Translation, Global) {

    /**
      * Initialise le scope du controller
      * @memberof MenuCtrl
      * @function init
      */
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

    $scope.$on('menuUpdated', function(event) {
        $scope.isMenuDisabled = Global.isMenuDisabled();
    });

});