﻿'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $location, $route, $filter, Operation, Global, Translation, Export) {
    
    Translation.getTranslation($scope);

    $scope.createOperation = function() {
        navigator.notification.prompt(
            $scope.translation.home.newOpName,
            function(results) {
                if(results.buttonIndex == 1 && results.input1){
                    console.log('Création d\'une nouvelle opération');
                    Operation.createOperation(results.input1);
                    $route.reload();
                }
            }, 
            $scope.translation.home.newOp,
            ['Créer', 'Annuler'],
            'Avalanche du ' + $filter('date')(new Date(), 'dd/MM/yyyy')
        );
    }

    $scope.historique = function() {
        $location.url('historique');
    }

    /**
     * Vide le contenu du local storage
     */
    $scope.purgeStorage = function() {
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir SUPPRIMER pour confirmer', 
            function(results) {
                if(results.buttonIndex == 1 && results.input1.toLowerCase() == "supprimer") {
                    console.log('Purge all data !');
                    Global.purgeData();
                    // TODO : mettre une confirm pop-up
                } else {
                    console.log('Purge annulée')
                }
            }, 
            'Supprimer les données',
            ['Supprimer', 'Annuler']
        );
    }

    /**
     * Vide le contenu du localStorage et charge les données de démonstration de l'application
     */
    $scope.loadDemoData = function() {
        console.log('Chargement des données de test ...');
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir DEMO pour confirmer', 
            function(results) {
                if(results.buttonIndex == 1 && results.input1.toLowerCase() == "demo") {
                    console.log('Charger les données de démo !');
                    Global.purgeData();
                    Global.loadDemoData();
                    
                    // TODO : mettre une confirm pop-up
                } else {
                    console.log('Chargement données démo annulé !');
                }
            }, 
            'Données de démo',
            ['OK', 'Annuler']
        );
    }

    /**
     * Ferme l'application après avoir demandé la confirmation
     */
    $scope.exitApp = function(){
        Global.exitApp();
    }    

});
