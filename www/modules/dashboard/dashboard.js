'use strict';

angular.module('myApp').controller('DashboardCtrl', function($scope, $location, $rootScope, Operation, Parametres, Global) {

    $scope.operation = Operation.getOperation();
    $scope.metiers = Parametres.getMetiers();

    angular.element(document).ready(function () {
        console.log('activeTab', Global.getDashboardTab());
        $scope.goTab(Global.getDashboardTab());
        $scope.$apply();
    }); 


    /* Retourne le nombre de personnels pour un métier donné */
    $scope.nbPersonnels = function(metier) {
        if(! $scope.operation.personnels) return 0;
        
        let compteur = 0;
        for(let i = 0; i < $scope.operation.personnels.length; i++) {
            let p = $scope.operation.personnels[i];
            if(p.metier.libelle == metier && !p.endDate) compteur++;
        }
        return compteur;
    }

    /* Retourne le nombre de personnels encore présents sur le site */
    $scope.nbActivePersonnels = function() {
        if(!$scope.operation.personnels) return 0;
        
        let compteur = 0;
        for(let i = 0; i < $scope.operation.personnels.length; i++) {
            let p = $scope.operation.personnels[i];
            if(!p.endDate) compteur++;
        }
        return compteur;        
    }

    $scope.terminate = function() {
         navigator.notification.confirm(
            'Souhaitez-vous mettre fin à l\'opération ?\nIl ne sera plus possible de modifier les informations.', 
            function(buttonIndex) {
                if(buttonIndex == 2) {
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

    $scope.detailsMetier = function(lib) {
        $location.url('/metiers/' + lib);
    }

    $scope.purgeStorage = function() {
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir SUPPRIMER pour confirmer', 
            function(results) {
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "supprimer") {
                    console.log('Purge all data !');
                    Global.purgeData();
                } else {
                    console.log('Purge annulée')
                }
            }, 
            'Supprimer les données',
            ['Annuler', 'Supprimer']
        );
    }

    $scope.exitApp = function() {
        navigator.notification.confirm(
            'Souhaitez-vous fermer l\'application ?', 
            function(buttonIndex) {
                if(buttonIndex == 2) {
                    navigator.app.exitApp();
                } 
            }, 
            'Quitter l\'application',
            ['Annuler', 'Quitter']
        );
    }

    $scope.loadDemoData = function() {
        console.log('Chargement des données de test ...');
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir DEMO pour confirmer', 
            function(results) {
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "demo") {
                    console.log('Charger les données de démo !');
                    Global.purgeData();
                    Global.loadDemoData();
                } else {
                    console.log('Chargement données démo annulé !');
                }
            }, 
            'Supprimer les données',
            ['Supprimer', 'Annuler']
        );
    }

    $scope.goTab = function(index){
        $scope.activeTab = index;
        Global.setDashboardTab(index);
    }

    $scope.nextTab = function(){
        if( $scope.activeTab <= 2) $scope.goTab(2);
    }

    $scope.prevTab = function(){
        if ($scope.activeTab > 1) $scope.goTab(1)
        else $rootScope.Ui.turnOn('uiSidebarLeft');
    }

    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
