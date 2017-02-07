'use strict';

angular.module('myApp').controller('EditVictimeCtrl', function($scope, $routeParams, Operation, Parametres) {
	$scope.victime = Operation.getVictime($routeParams.num);
	
	$scope.victimeStatus = Parametres.getVictimeStatus();

});
