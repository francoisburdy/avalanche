'use strict';

angular.module('myApp').controller('HistoriqueCtrl', function($scope, Operation) {
	$scope.journaux = Operation.getJournaux();

	$scope.isSelected = function(index) {
		return $scope.selected == index;
	}

	$scope.select = function(index) {
		$scope.selected = index;
	}
});