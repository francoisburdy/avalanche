'use strict';

angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newIntervenant = {};

	$scope.intervenantStatus = Parametres.getIntervenantStatus();

	$scope.intervenantPhoto = null;

  	$scope.addIntervenant = function() {
  		$scope.newIntervenant.beginDate = new Date();
  		$scope.newIntervenant.endDate = null;
  		Operation.addPersonnel($scope.newIntervenant);
  		$location.url('/dashboard');
  	}


});
