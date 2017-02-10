'use strict';

angular.module('myApp').controller('ParametresCtrl', function($scope, Parametres) {

	$scope.metiers = Parametres.getMetiers();
	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituation = Parametres.getVictimeSituations();

	$scope.$on('metiersUpdated', function(event) {
        $scope.metiers = Parametres.getMetiers();
    });

    $scope.updateLastClicked = function(index){
    	$scope.lastClickedIndex = index;
    }

	$scope.addMetier = function(color, metier) {
		var metier = {
			libelle: metier, 
			bg: color, 
			text: '#000'
		}
		Parametres.addMetier(metier);
	} 

	$scope.addVictimeStatus = function(){
		
	}

	$scope.addVictimeSituation = function(){
		
	}

	$scope.removeMetier = function(metier){
		var i=0;
		while ($scope.metiers[i].libelle != metier && i<$scope.metiers.length){
			i++;
		}
		if (i<$scope.metiers.length){
			Parametres.removeMetier($scope.metiers[i]);
		}else{
			console.log("Ce métier n'existe pas dans la liste des métiers.");
		}

		Parametres.removeMetier(metier)
	}

	$scope.modifyMetier = function(color, metier){
		var metier = {
			libelle: metier, 
			bg: color, 
			text: '#000'
		}
		Parametres.modifyMetier(metier);
	}
	
	$scope.options = ['#FFF', '#FFA773', '#FFD180', '#FFFF8D', 
					'#CFD8DC', '#80D8FF', '#A7FFEB', '#E969A8', 
					'#6996D3', '#CCFF90', '#5FD2B5', '#FF8A80'];
    // $scope.color = '#FF8A80';

    $scope.colorChanged = function(newColor, oldColor) {
        console.log('from ', oldColor, ' to ', newColor);
    }


});