'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name AddIntervenantCtrl
 */
angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $routeParams, $location, $document, Operation, Parametres, Translation) {

    function init() {
        //if (cordova) cordova.plugins.Keyboard.disableScroll(false);

        Translation.getTranslation($scope);
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

        if($routeParams.lib) {
            $scope.newIntervenant.metier = Parametres.getMetier($routeParams.lib);
        }
    }
    init();

    /**
     * Remplit l'intervenant temporaire et le passe à l'écran de confirmation
     */
    $scope.goToConfirmation = function() {
        if(!$scope.newIntervenant.numero) {
            navigator.notification.alert("Saisissez le numéro de l'intervenant", null, "Numéro intervenant", "OK");
        } else if(!$scope.newIntervenant.metier) {
            navigator.notification.alert("Choisissez le métier de l'intervenant", null, "Corps de métier", "OK");
        } else {
            let libMission = $scope.newSelectedMission || $scope.selectedMission;
            $scope.newIntervenant.missions = libMission ? [{libelle: libMission, beginDate: new Date()}] : [];

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
                null, "Appareil photo incompatible", "OK"
            );
        }
    }
    
    function onSuccess(imageData) {
        console.log('image : onSuccess');
        var imgSrc = 'data:image/jpeg;base64,' + imageData;
        $scope.newIntervenant.image = imgSrc; 
        $scope.$apply();
    }
    
    function onFail(message) {
        console.log('image : onFail');
    }

    /**
     * Ecoute les évenements clavier pour cacher afficher les boutons flottants
     */
    window.addEventListener('native.keyboardshow', function(e) {
        $scope.keyboardVisible = true;
        $scope.$apply();        
    });

    window.addEventListener('native.keyboardhide', function(e) {
        $scope.keyboardVisible = false;
        $scope.$apply();
    });

});
