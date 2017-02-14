'use strict';

angular.module('myApp').controller('EditIntervenantCtrl', function($scope, $routeParams, $location, Operation, Parametres, Translation) {
    Translation.getTranslation($scope);

    $scope.personnel = Operation.getPersonnel($routeParams.num);
    $scope.missions = Parametres.getMissions();

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


    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e) {
        $scope.keyboardVisible = true;
        $scope.$apply();
    }

    function keyboardHideHandler(e) {
        $scope.keyboardVisible = false;
        $scope.$apply();
    }
    

    /**
     * Met à jour l'opération dans le scope lorsque le local storage est modifié 
     */
    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
