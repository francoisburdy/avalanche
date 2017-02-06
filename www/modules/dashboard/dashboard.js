'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', function($scope, Operation) {
	

  	$scope.operation = Operation.getOperation();

  	$scope.addVictime = function() {
  		Operation.addVictime({numero: 1, statut: 'Crevée'});
  	}

	$scope.launchCamera = function() {
    	console.log(navigator.camera);
    	if(navigator.camera !== undefined)
			navigator.camera.getPicture (onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.DATA_URL
			}) ;
  	};

  	$scope.$on('$viewContentLoaded', function() {
		var imageData = storage.getItem("imageData"); // Pass a key name and its value to add or update that key.
		refreshImageContent(imageData);
	});

	function onSuccess(imageData) {
		console.log('image : onSuccess');
		console.log(imageData);
		storage.setItem('imageData', imageData);
		refreshImageContent(imageData);		
	}

	function onFail(message) {;
		console.log('image : onFail');
	}

	function refreshImageContent(imageData){
		if(imageData != undefined){
			var image = document.getElementById('imagePreview') ;
   			image.src = "data:image/jpeg;base64," + imageData;
		}
	}

	$scope.testVictimes = [
	    {num:5, etat:'DCD', gender:'female'},
	    {num:2, etat:'UR', gender:'female'},
	    {num:4, etat:'I', gender:'female'},
	    {num:7, etat:'UR', gender:'male'},
	    {num:6, etat:'DCD', gender:'female'},
	    {num:11, etat:'UA', gender:'male'},
	    {num:1, etat:'DCD', gender:'male'},
	    {num:11, etat:'I', gender:'male'},
	    {num:10, etat:'UA', gender:'female'},
	    {num:12, etat:'I', gender:'female'}
	];


	$scope.etatTexte = function(etat) {
    	var textes = {
    		DCD: 'Décédé(e)',
    		UA: 'Urgence Absolue',
    		UR: 'Urgence Relative',
    		I: 'Impliqué(e)'
    	};
    	return textes[etat];
  	}

  	//$scope.organismes = window.config.organismes;

});
