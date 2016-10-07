'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope) {
	
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


});