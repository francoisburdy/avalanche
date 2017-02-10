'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, $location, Operation, Parametres) {
	$scope.victime = Operation.getVictime($routeParams.num);

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.evacuateVictime = function() {
		Operation.evacuateVictime($scope.victime);
		$location.url('/dashboard'); // TODO : Onglet victime
	}

	$scope.checkSituation = function() {
		if($scope.victime.situation == 'Évacuée') Operation.evacuateVictime($scope.victime);
	}

	$scope.deleteVictime = function() {
		Operation.removeVictime($scope.victime);
		// TODO : Confirmation
		$location.url('/dashboard'); // TODO Onglet victime
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
