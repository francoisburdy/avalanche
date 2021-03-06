'use strict';

/**
 * Contrôleur associé à la vue du journal de l'opération courante.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name JournalCtrl
 * @param $scope {service} native controller scope
 * @param Operation {service} Avalanche Operation service
 * @param Export {service} Avalanche Export service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('JournalCtrl', function ($scope, Operation, Export, Translation) {

  /**
   * Initialise le scope du controller
   * @memberof JournalCtrl
   * @function init
   */
  function init() {
    Translation.getTranslation($scope);
  }

  init();

  /**
   * Déclanche l'export de l'opération courante en PDF.
   * @memberof JournalCtrl
   * @func exportPdf
   */
  $scope.exportPdf = function () {
    Export.exportCurrentOperation($scope);
  };

  /**
   * Lorsqu'un nouvelle langue est chargée, recharge le journal.
   * @func $on(translationLoaded)()
   * @memberof JournalCtrl
   */
  $scope.$on('translationLoaded', function () {
    $scope.operation = Operation.getOperation();
    $scope.journal = Operation.getJournal($scope.operation, $scope);
  });
});