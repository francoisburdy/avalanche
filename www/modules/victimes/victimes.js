'use strict';

angular.module('myApp').controller('VictimesCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newVictime = {};
	$scope.newVictime.numero = Operation.generateVictimeNumber();

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituation = Parametres.getVictimeSituation();

  	$scope.addVictime = function() {
  		$scope.newVictime.beginDate = new Date();
  		$scope.newVictime.endDate = null;
  		Operation.addVictime($scope.newVictime);
  		$location.url('/dashboard');
  	}
});
