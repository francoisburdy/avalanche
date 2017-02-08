'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, $location, Operation, Parametres) {
	$scope.victime = Operation.getVictime($routeParams.num);

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.evacuateVictime = function() {
		Operation.evacuateVictime($scope.victime);
		$location.url('/dashboard'); // ToDo Onglet victime
	}

	$scope.deleteVictime = function() {
		// ToDo OUVRIR UNE POP-UP A LA PLACE
		alert('Bientôt, ça supprimera ... Mais la flemme !');
	}

	$scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
