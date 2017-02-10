'use strict';

angular.module('myApp').controller('EditIntervenantCtrl', function($scope, $routeParams, $location, Operation) {
	$scope.personnel = Operation.getPersonnel($routeParams.num);

	$scope.evacuatePersonnel = function() {
		$location.url('/metiers/' + $scope.personnel.metier.libelle);
		Operation.evacuatePersonnel($scope.personnel);
	}

	$scope.deletePersonnel = function() {
		// TODO : confirmation
		$location.url('/metiers/' + $scope.personnel.metier.libelle);
		Operation.removePersonnel($scope.personnel);
	}

	$scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
