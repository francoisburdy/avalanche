'use strict';

/**
 * Contrôleur associé à la vue Historique des opérations passées.
 * @ngdoc controllers
 * @memberof avalanche
 * @name HistoriqueCtrl
 * @param $scope {service} native scope service
 * @param Operation {service} Avalanche Operation service
 * @param Export {service} Avalanche Export service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('HistoriqueCtrl', function ($scope, Operation, Export, Translation) {

  Translation.getTranslation($scope);

  /**
   * Vérifie si l'index passé est sélectionné
   * @memberof HistoriqueCtrl
   * @function isSelected
   * @param {int} index à vérifier
   * @returns {boolean} true si l'onglet est sélectionné, sinon false
   */
  $scope.isSelected = function (index) {
    return $scope.selected == index;
  };

  /**
   * Sélectionne l'index passé en paramètre
   * @memberof HistoriqueCtrl
   * @function select
   * @param {int} index à sélectionner
   */
  $scope.select = function (index) {
    if ($scope.selected == index) $scope.selected = null;
    else $scope.selected = index;
  };

  /**
   * Déclanche l'export PDF de l'ensemble des opérations
   * @memberof HistoriqueCtrl
   * @function exportPdf
   */
  $scope.exportPdf = function () {
    Export.exportAllOperation($scope);
  };

  $scope.$on('langUpdated', function () {
    $scope.journaux = Operation.getJournaux($scope);
    Translation.getTranslation($scope);
  });

  $scope.$on('translationLoaded', function () {
    $scope.journaux = Operation.getJournaux($scope);
  });

});