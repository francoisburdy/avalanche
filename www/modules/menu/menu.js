'use strict';


/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name MenuCtrl
 * @param $scope {service} native scope service
 * @param Operation {service} Avalanche Operation service
 * @param Translation {service} Avalanche Translation service
 * @desc
 *   Contrôleur associé au menu latéral de l'application
 */
angular.module('myApp').controller('MenuCtrl', function ($scope, Operation, Translation, Global) {

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

  $scope.$on('operationUpdated', function () {
    $scope.hasOperation = Operation.getOperation() != null;
  });

  $scope.$on('dataFlushed', function () {
    $scope.hasOperation = Operation.getOperation() != null;
  });

  $scope.$on('langUpdated', function () {
    Translation.getTranslation($scope);
  });

  $scope.$on('menuUpdated', function () {
    $scope.isMenuDisabled = Global.isMenuDisabled();
  });

});