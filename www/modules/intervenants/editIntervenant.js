'use strict';

angular.module('myApp').controller('EditIntervenantCtrl', function($scope, $routeParams, $location, Operation, Parametres) {
	$scope.personnel = Operation.getPersonnel($routeParams.num);
    $scope.missions = Parametres.getMissions();

	$scope.evacuatePersonnel = function() {
		$location.url('/metiers/' + $scope.personnel.metier.libelle);
		Operation.evacuatePersonnel($scope.personnel);
	}

	$scope.deletePersonnel = function() {
		// TODO : confirmation
		$location.url('/metiers/' + $scope.personnel.metier.libelle);
		Operation.removePersonnel($scope.personnel);
	}

	$scope.confirm = function() {
		if($scope.personnel.missions && $scope.selectedMission != $scope.personnel.missions[$scope.personnel.missions.length - 1].libelle) {
			if($scope.newSelectedMission) $scope.personnel.missions.push({libelle: $scope.newSelectedMission, beginDate: new Date()});
			else $scope.personnel.missions.push({libelle: $scope.selectedMission, beginDate: new Date()});
		}
		$location.url('/metiers/' + $scope.personnel.metier.libelle);
	}

    /**
     * Met à jour l'opération dans le scope lorsque le local storage est modifié 
     */
	$scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
