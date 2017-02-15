'use strict';

angular.module('myApp').controller('HistoriqueCtrl', function($scope, Operation, Export, Translation) {

    Translation.getTranslation($scope);

    /**
     * Vérifie si l'index passé est sélectionné
     * @param index à vérifier
     * @returns true si l'onglet est sélectionné, sinon false
     */
    $scope.isSelected = function(index) {
        return $scope.selected == index;
    }

    /**
     * Sélectionne l'index passé en paramètre
     * @param index à sélectionner
     */
    $scope.select = function(index) {
        if($scope.selected == index) $scope.selected = null;
        else $scope.selected = index;
    }

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