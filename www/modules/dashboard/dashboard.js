'use strict';

angular.module('myApp').controller('DashboardCtrl', function($scope, $location, Operation, Global) {

    $scope.operation = Operation.getOperation();

    $scope.terminate = function() {
         navigator.notification.confirm(
            'Souhaitez-vous mettre fin à l\'opération ?\nIl ne sera plus possible de modifier les informations.', 
            function(buttonIndex){
                if(buttonIndex == 2){
                    Operation.terminate();
                    $location.url('/home');
                } 
            }, 
            'Terminer l\'opération',
            ['Annuler', 'Terminer l\'opération']
        );
       
    }

    $scope.editVictime = function(num) {
        $location.url('/victimes/' + num);
    }

    $scope.deleteIntervenant = function() {
        alert("deleteIntervenant");
    }

    $scope.purgeStorage = function(){
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir SUPPRIMER pour confirmer', 
            function(results){
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "supprimer"){
                    console.log('Purge all data !');
                    Global.purgeData();
                    $location.url('/home');
                } else {
                    console.log('Purge annulée')
                }
            }, 
            'Supprimer les données',
            ['Annuler', 'Supprimer']
        );
    }

    $scope.loadDemoData = function(){
        console.log('Chargement des données de test...');
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir DEMO pour confirmer', 
            function(results){
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "demo"){
                    console.log('Charger les données de démo !');
                    Global.purgeData();
                    Global.loadDemoData();
                } else {
                    console.log('Chargement données démo annulé !');
                }
            }, 
            'Supprimer les données',
            ['Annuler', 'Supprimer']
        );
    }

    $scope.$on('$viewContentLoaded', function() {
        //var imageData = storage.getItem("imageData"); // Pass a key name and its value to add or update that key.
        //refreshImageContent(imageData);
    });

    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
