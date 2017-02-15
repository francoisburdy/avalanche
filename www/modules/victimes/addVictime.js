'use strict';

angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation, Parametres, SharedState, Translation) {
    
    Translation.getTranslation($scope);
    $scope.newVictime = {};
    $scope.newVictime.numero = Operation.generateVictimeNumber();
    $scope.newVictime.situation = Parametres.defaultSituation();
    $scope.newVictime.status = Parametres.defaultStatus();
    $scope.victimeStatus = Parametres.getVictimeStatus();
    $scope.victimeSituations = Parametres.getVictimeSituations();

    $scope.addVictime = function() {
        // TODO : ajouter confirmation
        $scope.newVictime.beginDate = new Date();
        $scope.newVictime.endDate = null;
        Operation.addVictime($scope.newVictime);

        if($scope.newVictime.situation == 'Évacuée') Operation.evacuateVictime($scope.newVictime);
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

});
