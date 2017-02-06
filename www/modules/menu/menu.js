'use strict';

angular.module('myApp').controller('MenuCtrl', function($scope, Operation) {
	$scope.hasOperation = Operation.getOperation() != null;

	$scope.swipe = function($event) {
		simulateClick();
	};

  	$scope.$on('operationUpdated', function(event) {
		$scope.hasOperation = Operation.getOperation() != null;
	});
})