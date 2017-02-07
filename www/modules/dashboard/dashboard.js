'use strict';

angular.module('myApp').controller('DashboardCtrl', function($scope, $location, Operation) {

    $scope.operation = Operation.getOperation();

    $scope.terminate = function() {
        Operation.terminate();
        $location.url('/home');
    }

    $scope.launchCamera = function() {
        console.log(navigator.camera);
        if(navigator.camera !== undefined) {
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
        }
    }

    $scope.deleteIntervenant = function() {
        alert("deleteIntervenant");
    }

    $scope.$on('$viewContentLoaded', function() {
        //var imageData = storage.getItem("imageData"); // Pass a key name and its value to add or update that key.
        //refreshImageContent(imageData);
    });

    function onSuccess(imageData) {
        console.log('image : onSuccess');
        console.log(imageData);
        storage.setItem('imageData', imageData);
        refreshImageContent(imageData);     
    }

    function onFail(message) {
        console.log('image : onFail');
    }

    function refreshImageContent(imageData) {
        if(imageData != undefined) {
            var image = document.getElementById('imagePreview') ;
            image.src = "data:image/jpeg;base64," + imageData;
        }
    }

    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
