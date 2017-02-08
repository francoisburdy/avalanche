'use strict';

angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $location, Operation, Parametres) {
	$scope.newIntervenant = {};
    $scope.newIntervenant.beginDate = new Date();
    $scope.newIntervenant.endDate = null;

    $scope.metiers = Parametres.getMetiers();

    $scope.tmpPersonnel = Operation.getTmpPersonnel();

    $scope.goToConfirmation = function() {
        Operation.addTmpPersonnel($scope.newIntervenant);
        $location.url('/confirmIntervenant');
    }

  	$scope.addIntervenant = function() {
  		Operation.addPersonnel();
        $location.url('/dashboard');
  	}

     $scope.launchCamera = function() {
        console.log(navigator.camera);
        if(navigator.camera !== undefined) {
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
        }
    }
    
    function onSuccess(imageData) {
        console.log('image : onSuccess');
        
        var image = document.getElementById('img-preview') ;
        $scope.newIntervenant.image = "data:image/jpeg;base64," + imageData; // ToDo stocker
        image.src = $scope.newIntervenant.image;
    }
    
    function onFail(message) {
        console.log('image : onFail');
    }

    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e) {
        $scope.keyboardVisible = true;
        $scope.$apply();
    }

    function keyboardHideHandler(e) {
        $scope.keyboardVisible = false;
        $scope.$apply();
    }
});
