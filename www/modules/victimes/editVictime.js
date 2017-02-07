'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, Operation, Parametres) {
	$scope.victime = Operation.getVictime($routeParams.num);

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.deleteVictime = function() {
		// OUVRIR UNE POP-UP A LA PLACE
		//Operation.deleteVictime($scope.victime);
		alert('Bientôt, ça supprimera ... Mais la flemme !');
	}
});
