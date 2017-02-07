'use strict';

angular.module('myApp').controller('ConfirmIntervenantCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newIntervenant = {};


  	$scope.confirmIntervenant = function() {
  		$scope.newIntervenant.beginDate = new Date();
  		$scope.newIntervenant.endDate = null;
  		Operation.addPersonnel($scope.newIntervenant);
  		$location.url('/dashboard');
  	}

    
      $scope.metier= "pompier";
      
      $scope.num = "68";
      var color = "red"

     document.getElementById("confirmIntervenant").style.backgroundColor = color;

    

    function refreshImageContent(imageData) {
        if(imageData != undefined) {
            var image = document.getElementById('imagePreview') ;
            image.src = "data:image/jpeg;base64," + imageData;
        }
    }



});
