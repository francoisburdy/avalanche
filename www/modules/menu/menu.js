'use strict';

angular.module('myApp').controller('MenuCtrl', function($scope, Operation) {
	$scope.hasOperation = Operation.getOperation() != null;

	$scope.swipe = function($event) {
		simulateClick();
	};

	function simulateClick() {
		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
		var cb = document.getElementById('burger'); 
		var cancelled = !cb.dispatchEvent(event);
		if (cancelled) {
			// A handler called preventDefault.
			alert("cancelled");
		} else {
			// None of the handlers called preventDefault.
			alert("not cancelled");
		}
	}

  	$scope.$on('operationUpdated', function(event) {
		$scope.hasOperation = Operation.getOperation() != null;
	});
})