'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $location, Operation) {
  	$scope.createOperation = function() {
  		Operation.createOperation();
  		$location.url('/dashboard');
  	}

  	$scope.historique = function() {
  		$location.url('historique');
  	}
});
