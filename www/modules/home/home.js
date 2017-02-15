'use strict';

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
            [$scope.translation.create, $scope.translation.cancel],
            $scope.translation.home.avalancheFrom + ' ' + $filter('date')(new Date(), $scope.translation.dateFormat)
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
            $scope.translation.home.confirmDelete, 
            function(results) {
                if(results.buttonIndex == 1 && results.input1.toLowerCase() == "supprimer") {
                    console.log('Purge all data !');
                    Global.purgeData();
                    // TODO : mettre une confirm pop-up
                } else {
                    console.log('Purge annulée')
                }
            }, 
            $scope.translation.home.deleteData,
            [$scope.translation.delete, $scope.translation.cancel]
        );
    }

    /**
     * Vide le contenu du localStorage et charge les données de démonstration de l'application
     */
    $scope.loadDemoData = function() {
        console.log('Chargement des données de test ...');
        navigator.notification.prompt(
            $scope.translation.home.confirmDemo, 
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
            $scope.translation.home.demoData,
            [$scope.translation.ok, $scope.translation.cancel]
        );
    }

    /**
     * Ferme l'application après avoir demandé la confirmation
     */
    $scope.exitApp = function(){
        Global.exitApp();
    }    

});
