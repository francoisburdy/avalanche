'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, $location, Operation, Parametres) {
	$scope.victime = Operation.getVictime($routeParams.num);

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.evacuateVictime = function() {
		Operation.evacuateVictime($scope.victime);
		$location.url('/dashboard'); // ToDo Onglet victime
	}

	$scope.checkSituation = function() {
		if($scope.victime.situation == 'Évacuée') Operation.evacuateVictime($scope.victime);
	}

	$scope.deleteVictime = function() {
		Operation.removeVictime($scope.victime);
		// ToDo Confirmation
		$location.url('/dashboard'); // ToDo Onglet victime
	}

	$scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
