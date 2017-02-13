'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, $location, Operation, Parametres) {

    function init() {
        $scope.victime = Operation.getVictime($routeParams.num);
        $scope.victimeStatus = Parametres.getVictimeStatus();
        $scope.victimeSituations = Parametres.getVictimeSituations();
        console.log($scope.victime.status);
    }

    init();

    $scope.evacuateVictime = function() {
        navigator.notification.confirm(
            'Souhaitez-vous marquer la victime ' + $scope.victime.numero + ' comme évacuée ?',
            function(buttonIndex) {
                if(buttonIndex == 1) {
                    Operation.evacuateVictime($scope.victime);
                    $location.url('/dashboard');
                    $scope.$apply();  
                }
            }, 
            'Évacuer une victime', 
            ['Évacuer', 'Annuler']
        );
    }

    $scope.checkSituation = function() {
        // TODO : ajouter confirmation
        if($scope.victime.situation == 'Évacuée') Operation.evacuateVictime($scope.victime);
    }

    $scope.deleteVictime = function() {
        navigator.notification.confirm(
            'Souhaitez-vous vraiment supprimer la victime ' + $scope.victime.numero + ' ?',
            function(buttonIndex) {
                if(buttonIndex == 1) {
                    Operation.removeVictime($scope.victime);
                    $location.url('/dashboard');
                    $scope.$apply();
                }
            }, 
            'Supprimer une victime', 
            ['Supprimer', 'Annuler']
        );
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
