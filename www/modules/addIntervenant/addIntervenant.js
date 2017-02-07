'use strict';

angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newIntervenant = {};
	$scope.newIntervenant.numero = Operation.generateIntervenantNumber();

	$scope.IntervenantStatus = Parametres.getIntervenantStatus();

	$scope.IntervenantPhoto= null;

  	$scope.addIntervenant = function() {
  		$scope.newIntervenant.beginDate = new Date();
  		$scope.newIntervenant.endDate = null;
  		Operation.addPersonnel($scope.newIntervenant);
  		$location.url('/dashboard');
  	}


});
