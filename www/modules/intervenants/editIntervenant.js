'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name EditIntervenantCtrl
 */
angular.module('myApp').controller('EditIntervenantCtrl', function($scope, $routeParams, $location, Operation, Parametres, Translation) {
    /**
     * Récupère les informations stockées localement sur l'intervenant
     * @memberof EditIntervenantCtrl
     * @function init
     */
    function init() {
        Translation.getTranslation($scope);
        $scope.personnel = Operation.getPersonnel($routeParams.num);
        $scope.missions = Parametres.getMissions();
    }
    init();
    /**
     * Retourne à la page précédente
     * @memberof EditIntervenantCtrl
     * @function goToPrevious
     */
    $scope.goToPrevious = function() {
        $location.url('/metiers/' + $scope.personnel.metier.libelle);
    }
    /**
     * Confirmation du retour à la page précédente
     * @memberof EditIntervenantCtrl
     * @function confirmGoBack
     */
    $scope.confirmGoBack = function() {
        if(!$scope.personnel.numero) { // L'intervenant n'a pas de numéro
            navigator.notification.alert("Saisissez le numéro de l'intervenant", null, "Numéro intervenant", "OK");
        } else if(!$scope.personnel.metier) { // L'intervenant n'a pas de métier
            navigator.notification.alert("Choisissez le métier de l'intervenant", null, "Corps de métier", "OK");
        } else {
            $scope.goToPrevious();
        }
    }
     /**
     * Fait sortir un intervenant
     * @memberof EditIntervenantCtrl
     * @function evacuatePersonnel
     */
    $scope.evacuatePersonnel = function() {
        $scope.confirmGoBack();
        Operation.evacuatePersonnel($scope.personnel);
    }
     /**
     * Supprime un intervenant
     * @memberof EditIntervenantCtrl
     * @function deletePersonnel
     */
    $scope.deletePersonnel = function() {
        // TODO : confirmation
        $scope.goToPrevious();
        Operation.removePersonnel($scope.personnel);
    }
     /**
     * Confirme le changement de mission d'un intervenant
     * @memberof EditIntervenantCtrl
     * @function confirm
     */
    $scope.confirm = function() {
        var missionDifferente = $scope.personnel.missions.length && $scope.selectedMission != $scope.personnel.missions[$scope.personnel.missions.length - 1].libelle;

        if(($scope.personnel.missions.length == 0 || missionDifferente) && $scope.selectedMission) {
            let libMission = $scope.selectedMission;
            if($scope.selectedMission == '-- Autre --' && $scope.newSelectedMission) libMission = $scope.newSelectedMission;
                $scope.personnel.missions.push({libelle: libMission, beginDate: new Date()});
        } 
        $scope.confirmGoBack();
    }

    /**
     * Ecoute les évenements clavier pour cacher afficher les boutons flottants
     */
    window.addEventListener('native.keyboardshow', function(e) {
        $scope.keyboardVisible = true;
        $scope.$apply();        
    });

    window.addEventListener('native.keyboardhide', function(e) {
        $scope.keyboardVisible = false;
        $scope.$apply();
    });    

    /**
     * Met à jour l'opération dans le scope lorsque le local storage est modifié 
     */
    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });

});
