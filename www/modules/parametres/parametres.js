'use strict';

angular.module('myApp').controller('ParametresCtrl', function($scope, Parametres) {

	$scope.metiers = Parametres.getMetiers();
	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituation = Parametres.getVictimeSituation();

	$scope.$on('metiersUpdated', function(event) {
        $scope.metiers = Parametres.getMetiers();
    });

	$scope.addMetier = function() {
		alert('addMetier()');
	} 

	$scope.addVictimeStatus = function(){
		
	}

	$scope.addVictimeSituation = function(){
		
	}
});