'use strict';

angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newVictime = {};
	$scope.newVictime.numero = Operation.generateVictimeNumber();
    $scope.newVictime.situation = Parametres.defaultSituation();

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.addVictime = function() {
		$scope.newVictime.beginDate = new Date();
		$scope.newVictime.endDate = null;
		Operation.addVictime($scope.newVictime);
		$location.url('/dashboard');
	}
});
