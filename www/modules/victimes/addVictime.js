'use strict';

angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation, Parametres, SharedState) {
	$scope.newVictime = {};
	$scope.newVictime.numero = Operation.generateVictimeNumber();
    $scope.newVictime.situation = Parametres.defaultSituation();
    $scope.newVictime.status = Parametres.defaultStatus();

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.addVictime = function() {
		$scope.newVictime.beginDate = new Date();
		$scope.newVictime.endDate = null;
		Operation.addVictime($scope.newVictime);

	    //SharedState.initialize($scope, 'activeTab', 2);
		//SharedState.set('activeTab', 2);
	}
});
