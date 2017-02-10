'use strict';

angular.module('myApp').controller('JournalCtrl', function($scope, Operation) {
		$scope.operation = Operation.getOperation();
		$scope.journal = Operation.getJournal($scope.operation);
});