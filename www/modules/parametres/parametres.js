'use strict';

angular.module('myApp').controller('ParametresCtrl', function($scope, Parametres) {

	$scope.metiers = Parametres.getMetiers();
	$scope.victimeStatus = Parametres.getVictimeStatus();
	
/*	ColorPicker(
	    document.getElementById('slide'),
	    document.getElementById('picker'),

		function(hex, hsv, rgb) {
			document.body.style.backgroundColor = hex;
		});*/
	$scope.options = {
		alpha: [false, false],
		hue: [true, false]
	}


	$scope.$on('metiersUpdated', function(event) {
        $scope.metiers = Parametres.getMetiers();
    });

	$scope.addMetier = function() {
		alert('addMetier()');
	} 

	$scope.addVictimeStatus = function(){
		
	}

});