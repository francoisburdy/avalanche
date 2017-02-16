'use strict';

 /**
   * @ngdoc controllers
   * @memberof avalanche
   * @name HistoriqueCtrl
   * @param $scope {service} native scope service
   * @param Operation {service} Avalanche Operation service
   * @param Export {service} Avalanche Export service
   * @param Translation {service} Avalanche Translation service
   */
angular.module('myApp').controller('HistoriqueCtrl', function($scope, Operation, Export, Translation) {

    Translation.getTranslation($scope);

    /**
     * Vérifie si l'index passé est sélectionné
     * @memberof HistoriqueCtrl
     * @function isSelected
     * @param {integer} index à vérifier
     * @returns {bool} true si l'onglet est sélectionné, sinon false
     */
    $scope.isSelected = function(index) {
        return $scope.selected == index;
    }

    /**
     * Sélectionne l'index passé en paramètre
     * @memberof HistoriqueCtrl
     * @function select
     * @param {integer} index à sélectionner
     */
    $scope.select = function(index) {
        if($scope.selected == index) $scope.selected = null;
        else $scope.selected = index;
    }

    /**
     * Déclanche l'export PDF de l'ensemble des opérations
     * @memberof HistoriqueCtrl
     * @function exportPdf
     */
    $scope.exportPdf = function() {
        Export.exportAllOperation($scope);
    }

    $scope.$on('langUpdated', function(event) {
        $scope.journaux = Operation.getJournaux($scope);
        Translation.getTranslation($scope);
    });

    $scope.$on('translationLoaded', function(event) {
        $scope.journaux = Operation.getJournaux($scope);
    });

});