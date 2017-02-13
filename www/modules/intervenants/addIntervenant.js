'use strict';

angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $location, $document, Operation, Parametres) {
    
    
    function init() {
        $scope.tmpPersonnel = Operation.getTmpPersonnel();
        
        if(!$scope.tmpPersonnel) {
            $scope.newIntervenant = {};
            $scope.newIntervenant.beginDate = new Date();
            $scope.newIntervenant.endDate = null;
            $scope.newIntervenant.missions = [];
        } else {
            $scope.newIntervenant = $scope.tmpPersonnel;
        }
        
        $scope.missions = Parametres.getMissions();
        $scope.metiers = Parametres.getMetiers();

        // Affichage de la photo si elle est présente dans $scope.tmpPersonnel
        angular.element(document).ready(function() {
            console.log('document.ready', $scope.tmpPersonnel, $location.path());
            if($scope.tmpPersonnel){
                if($location.path() == "/confirmIntervenant" && $scope.tmpPersonnel.image) {
                    $scope.hasImg = true;
                    document.getElementById('img-preview-confirm').src = $scope.tmpPersonnel.image;
                    $scope.$apply()
                } else if ($location.path() == "/addIntervenant" && $scope.tmpPersonnel.image) {
                    $scope.hasImg = true;
                    document.getElementById('img-preview').src = $scope.tmpPersonnel.image ;
                    $scope.$apply()                    
                }
            }
        }); 
    }


    init();

    $scope.goToConfirmation = function() {
        if(!$scope.newIntervenant.numero){
            navigator.notification.alert("Saisissez le numéro de l'intervenant", null, "Numéro intervenant", "OK");
        } else if(!$scope.newIntervenant.metier){
            navigator.notification.alert("Choisissez le métier de l'intervenant", null, "Corps de métier", "OK");
        } else {
            if($scope.newSelectedMission) 
                $scope.newIntervenant.missions.push({libelle: $scope.newSelectedMission, beginDate: new Date()});
            else 
                $scope.newIntervenant.missions.push({libelle: $scope.selectedMission, beginDate: new Date()});
            Operation.addTmpPersonnel($scope.newIntervenant);
        }
    }

    $scope.addIntervenant = function() {
        // TODO : ajouter confirmation
        Operation.addPersonnel();
        $location.url('/dashboard');
    }

    $scope.cancelAddIntervenant = function() {
        Operation.cancelTmpPersonnel();
        $location.url('/dashboard');
    }

    $scope.launchCamera = function() {
        console.log(navigator.camera);
        if(navigator.camera !== undefined) {
            navigator.camera.getPicture(onSuccess, onFail, { 
                quality: 40,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true,
                targetWidth: 600,
                destinationType: Camera.DestinationType.DATA_URL
            });
        } else {
            navigator.notification.alert(
                "Votre appareil photo n'est pas compatible avec cette fonctionnalité", 
                null, 
                "Appareil photo incompatible", "OK"
            );
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
