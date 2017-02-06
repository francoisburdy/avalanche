'use strict';

angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation) {
	$scope.newVictime = {};
	$scope.newVictime.numero = Operation.generateVictimeNumber();

  	$scope.addVictime = function() {
  		$scope.newVictime.beginDate = new Date();
  		$scope.newVictime.endDate = null;
  		Operation.addVictime($scope.newVictime);
  		$location.url('/dashboard');
  	}
});
