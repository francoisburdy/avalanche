'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name AddIntervenantCtrl
 * @param $scope {service} native controller scope
 * @param $routeParams {service} native route parameters service
 * @param $location {service} native location service
 * @param $document {service} native document service
 * @param Operation {service} Avalanche Operation service
 * @param Parametres {service} Avalanche Parametres service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('AddIntervenantCtrl', function($scope, $routeParams, $location, $document, Operation, Parametres, Translation) {

    /**
     * Initialise le scope du controller et initialise la page de confirmation avec les informations du nouveau intervenant.
     * Initialise le formulaire avec les métiers et les missions possibles.
     * @memberof AddIntervenantCtrl
     * @function init
     */
    function init() {
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
     * Remplit l'intervenant temporaire et le passe à l'écran de confirmation.
     * @memberof AddIntervenantCtrl
     * @function goToConfirmation
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

    /**
     * Ajoute un intervenant après confirmation. Le nouvel intervenant est récupéré dans $scope.
     * @memberof AddIntervenantCtrl
     * @function addIntervenant
     */
    $scope.addIntervenant = function() {
        // TODO : ajouter confirmation
        Operation.addPersonnel();
        $location.url('/dashboard');
    }

    /**
     * Annule l'ajout d'un intervenant. Retour à la page principale
     * @memberof AddIntervenantCtrl
     * @function cancelAddIntervenant
     */
    $scope.cancelAddIntervenant = function() {
        Operation.cancelTmpPersonnel();
        $location.url('/dashboard');
    }

    /**
     * Permet de lancer l'appareil photo
     * @memberof AddIntervenantCtrl
     * @function launchCamera
     */
    $scope.launchCamera = function() {
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
    
    /**
     * Enregistre l'image pour l'intervenant concerné 
     * @memberof AddIntervenantCtrl
     * @function onSuccess
     * @param {string} imageData les données de l'image
     */
    function onSuccess(imageData) {
        console.log('image : onSuccess');
        var imgSrc = 'data:image/jpeg;base64,' + imageData;
        $scope.newIntervenant.image = imgSrc; 
        $scope.$apply();
    }

    /**
     * Affiche l'erreur si la prise de la photo n'a pas fonctionné.
     * @memberof AddIntervenantCtrl
     * @function onFail
     * @param {string} message message d'erreur
     */
    function onFail(message) {
        console.log('image : onFail ', message);
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
