'use strict';


angular.module('myApp').controller('DashboardCtrl', function($scope, $location, $rootScope, Operation, Parametres, Global, Translation) {

    function init() {
        Translation.getTranslation($scope);
        $scope.operation = Operation.getOperation();
        $scope.metiers = Parametres.getMetiers();

        angular.element(document).ready(function () {
            $scope.goTab(Global.getDashboardTab());
            $scope.$apply();
        }); 
    }

    init();

    /**
     * Retourne le nombre de personnels pour un métier donné 
     * @param metier Métier des personnels
     */
    $scope.nbPersonnels = function(metier) {
        if(! $scope.operation || ! $scope.operation.personnels) return 0;
        
        let compteur = 0;
        for(let p of $scope.operation.personnels)
            if(p.metier.libelle == metier && !p.endDate) compteur++;
        return compteur;
    }

    /**
     * Retourne le nombre de personnels encore présents sur le site
     */
    $scope.nbActivePersonnels = function() {
        if(! $scope.operation || ! $scope.operation.personnels) return 0;
        
        let compteur = 0;
        for(let p of $scope.operation.personnels) {
            if(!p.endDate) compteur++;
        }
        return compteur;        
    }

    /**
     * Termine une opération.
     * Enregistre également dans le journal toutes les évènements effectués. 
     */
    $scope.terminateOperation = function() {
         navigator.notification.confirm(
            $scope.translation.dashboard.confirmTerminateMsg, 
            function(buttonIndex) {
                if(buttonIndex == 2) {
                    Operation.terminate();
                    $location.url('/home')
                    $scope.$apply();
                }
            }, 
            $scope.translation.terminate + ' ' + $scope.translation.theOperation, 
            [$scope.translation.cancel, $scope.translation.terminate]
        );
    }

    /**
     * Redirige vers la page d'édition de victime
     * @param Numéro de la victime à éditer
     */
    $scope.editVictime = function(num) {
        $location.url('/victimes/' + num);
    }

    /**
     * Redirige vers la page de détails d'un métier
     * @param Libellé du métier recherché
     */
    $scope.detailsMetier = function(lib) {
        $location.url('/metiers/' + lib);
    }

    $scope.evacuatePersonnel = function() {
        navigator.notification.prompt(
            'Saisissez le numéro de l\'intervenant sortant', 
            checkPersonnel, 
            'Sortie de personnel', 
            ['Valider', 'Annuler']
        );
    }

    function checkPersonnel(results) {
        if(results.buttonIndex == 1) {
            console.log('Sortie du personnel', results.input1);
            var personnel = Operation.getPersonnel(results.input1);
            if(!personnel) { // Personnel inexistant
                navigator.notification.alert(
                    'L\'intervenant n°' + results.input1 + ' est introuvable.',
                    null, 'Intervenant introuvable', ['OK']
                )
            } else if(personnel.endDate) { // L'intervenant est déjà sorti
                console.log('Personnel déjà sorti');
                navigator.notification.confirm(
                    'L\'intervenant n°' + personnel.numero + ' est déjà sorti le ' + personnel.endDate.toLocaleString() ,
                    null, 'Déjà sorti', ['OK']
                )
            } else { // On sort l'intervenant
                navigator.notification.confirm(
                    'Sortie : ' + personnel.metier.libelle + ' n°' + personnel.numero + '.',
                    function(buttonIndex) {
                        console.log('buttonIndex', buttonIndex);
                        Operation.evacuatePersonnel(personnel);
                        $scope.$apply();
                    },
                    'Confirmation', ['Valider', 'Annuler']
                )
            }
        } else { // Annulation
            console.log('Sortie de personnel annulée');
            navigator.notification.confirm(
                'Sortie de personnel annulée.', null, 'Annulation', ['OK']
            )
        }
    }

    /**
     * Va vers l'index d'onglet passé en paramètre
     * @param index de l'onglet recherché
     */
    $scope.goTab = function(index) {
        $scope.activeTab = index;
        Global.setDashboardTab(index);
    }

    /**
     * Affiche l'onglet suivant
     */
    $scope.nextTab = function() {
        if( $scope.activeTab <= 2) $scope.goTab(2);
    }

    /**
     * Affiche l'onglet précédent
     */
    $scope.prevTab = function() {
        if ($scope.activeTab > 1) $scope.goTab(1)
        else $rootScope.Ui.turnOn('uiSidebarLeft');
    }

    /**
     * Met à jour l'opération dans le scope lorsque le local storage est modifié 
     */
    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });

    /**
     * Ferme l'application après avoir demandé la confirmation
     */
    $scope.exitApp = function(){
        Global.exitApp();
    }

});
