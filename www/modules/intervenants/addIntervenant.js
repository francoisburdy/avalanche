'use strict';

angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $location, $document, Operation, Parametres) {
	$scope.newIntervenant = {};
    $scope.newIntervenant.beginDate = new Date();
    $scope.newIntervenant.endDate = null;

    $scope.metiers = Parametres.getMetiers();

    $scope.tmpPersonnel = Operation.getTmpPersonnel();

    angular.element(document).ready(function () {
        console.log('document.ready');
        if($location.path() == "/confirmIntervenant" && $scope.tmpPersonnel.image){
            console.log('print img', $scope.tmpPersonnel.image);
            document.getElementById('img-preview-confirm').src = $scope.tmpPersonnel.image ;
        }
    }); 

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
            navigator.camera.getPicture(onSuccess, onFail, { 
                quality: 50, 
                destinationType: Camera.DestinationType.DATA_URL
            });
        }
    }
    
    function onSuccess(imageData) {
        console.log('image : onSuccess');
        var imgSrc = "data:image/jpeg;base64," + imageData;
        document.getElementById('img-preview').src = imgSrc ;
        $scope.newIntervenant.image = imgSrc; 
        $scope.hasImg = true;
        $scope.$apply();
    }
    
    function onFail(message) {
        console.log('image : onFail');
        document.getElementById('img-preview').src = "";
        $scope.hasImg = false;
        $scope.$apply();

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
