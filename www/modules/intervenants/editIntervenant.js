'use strict';

angular.module('myApp').controller('EditIntervenantCtrl', function($scope, $routeParams, $location, Operation, Parametres, Translation) {

    function init() {
        Translation.getTranslation($scope);
        $scope.personnel = Operation.getPersonnel($routeParams.num);
        $scope.missions = Parametres.getMissions();
    }
    init();

    $scope.evacuatePersonnel = function() {
        $location.url('/metiers/' + $scope.personnel.metier.libelle);
        Operation.evacuatePersonnel($scope.personnel);
    }

    $scope.deletePersonnel = function() {
        // TODO : confirmation
        $location.url('/metiers/' + $scope.personnel.metier.libelle);
        Operation.removePersonnel($scope.personnel);
    }

    $scope.confirm = function() {
        var missionDifferente = $scope.personnel.missions.length && $scope.selectedMission != $scope.personnel.missions[$scope.personnel.missions.length - 1].libelle;

        if(($scope.personnel.missions.length == 0 || missionDifferente) && $scope.selectedMission) {
            let libMission = $scope.selectedMission;
            if($scope.selectedMission == '-- Autre --' && $scope.newSelectedMission) libMission = $scope.newSelectedMission;
                $scope.personnel.missions.push({libelle: libMission, beginDate: new Date()});
        } 
        $location.url('/metiers/' + $scope.personnel.metier.libelle);
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
