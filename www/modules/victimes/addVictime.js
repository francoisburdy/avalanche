'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name AddVictimeCtrl
 */
angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation, Parametres, SharedState, Translation) {
    
    Translation.getTranslation($scope);
    $scope.newVictime = {};
    $scope.newVictime.numero = Operation.generateVictimeNumber();
    $scope.newVictime.situation = Parametres.defaultSituation();
    $scope.newVictime.status = Parametres.defaultStatus();
    $scope.victimeStatus = Parametres.getVictimeStatus();
    $scope.victimeSituations = Parametres.getVictimeSituations();

    $scope.addVictime = function() {
        navigator.notification.confirm($scope.translation.victimes.addVictime.confirm + " ?",
            function(buttonIndex) {
                if(buttonIndex == 1) {
                    $scope.newVictime.beginDate = new Date();
                    $scope.newVictime.endDate = null;
                    Operation.addVictime($scope.newVictime);

                    if($scope.newVictime.situation == 'Évacuée') Operation.evacuateVictime($scope.newVictime);

                    $scope.$apply();
                }
            },
            $scope.translation.victimes.addVictime.addVictime,
            [$scope.translation.add, $scope.translation.cancel]
        );
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
