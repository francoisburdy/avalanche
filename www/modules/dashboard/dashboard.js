'use strict';


 /**
   * @ngdoc controllers
   * @memberof avalanche
   * @name DashboardCtrl
   */
angular.module('myApp').controller('DashboardCtrl', function($scope, $location, $rootScope, Operation, Parametres, Global, Translation) {

    /**
      * Initialise le scope du controller
      * @memberof DashboardCtrl
      * @function init
      */
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
     * Retourne le nombre de personnels pour un métier donné.
     * @memberof DashboardCtrl
     * @function nbPersonnels
     * @param {string} metier Métier des personnels
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
     * @memberof DashboardCtrl
     * @function nbActivePersonnels     
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
     * @memberof DashboardCtrl
     * @function terminateOperation
     */
    $scope.terminateOperation = function() {
        /* ToDo: Vérifier que tout le monde est sorti */
        navigator.notification.confirm(
            $scope.translation.dashboard.confirmTerminateMsg, 
            function(buttonIndex) {
                if(buttonIndex == 2) {
                    Operation.terminate();
                    $location.url('/home');
                    toast($scope.translation.operationTerminated);
                    $scope.$apply();
                }
            }, 
            $scope.translation.terminate + ' ' + $scope.translation.theOperation, 
            [$scope.translation.cancel, $scope.translation.terminate]
        );
    }

    /**
     * Redirige vers la page d'édition de victime
     * @function editVictime
     * @memberof DashboardCtrl
     * @param num {integer} Numéro de la victime à éditer
     */
    $scope.editVictime = function(num) {
        $location.url('/victimes/' + num);
    }

    /**
     * 
     * @function detailsMetier
     * @memberof DashboardCtrl
     * @param lib {string} Libellé du métier recherché
     */
    $scope.detailsMetier = function(lib) {
        $location.url('/metiers/' + lib);
    }

    /**
     * @memberof DashboardCtrl
     * @function evacuatePersonnel
     */
    $scope.evacuatePersonnel = function() {
        navigator.notification.prompt(
            $scope.translation.dashboard.rescuerOutMsg, 
            checkPersonnel, 
            $scope.translation.dashboard.rescuerOut, 
            [$scope.translation.validate, $scope.translation.cancel]
        );
    }

    /**
     * Redirige vers la page de détails d'un métier
     * @memberof DashboardCtrl
     * @function checkPersonnel
     * @param results {string} Libellé du métier recherché
     */
    function checkPersonnel(results) {
        if(results.buttonIndex == 1) {
            console.log($scope.translation.dashboard.rescuerOut, results.input1);
            var personnel = Operation.getPersonnel(results.input1);
            if(!personnel) { // Personnel inexistant
                toast($scope.translation.intervenantNum + results.input1 + ' ' + $scope.translation.dashboard.notFound + '.');
            } else if(personnel.endDate) { // L'intervenant est déjà sorti
                console.log('Personnel déjà sorti');
                navigator.notification.confirm(
                    $scope.translation.intervenantNum + personnel.numero + ' ' + $scope.translation.dashboard.isAlreadyOut + ' ' + personnel.endDate.toLocaleString() ,
                    null, $scope.translation.alreadyOut, [$scope.translation.ok]
                )
            } else { // On sort l'intervenant
                navigator.notification.confirm(
                    $scope.translation.dashboard.exit + ' : ' + personnel.metier.libelle + ' ' + $scope.translation.dashboard.number + personnel.numero + '.',
                    function(buttonIndex) {
                        if(buttonIndex == 1){
                            console.log('buttonIndex', buttonIndex);
                            Operation.evacuatePersonnel(personnel);
                            toast($scope.translation.intervenants.number + personnel.numero + ' ' + $scope.translation.evacuated);
                            $scope.$apply();
                        }
                    },
                    $scope.translation.dashboard.confirmation, [$scope.translation.validate, $scope.translation.cancel]
                )
            }
        } else { // Annulation
            console.log($scope.translation.dashboard.exitCanceled);
            toast($scope.translation.dashboard.exitCanceled);
        }
    }

    /**
     * Va vers l'index d'onglet passé en paramètre
     * @function goTab
     * @param index de l'onglet recherché
     */
    $scope.goTab = function(index) {
        $scope.activeTab = index;
        Global.setDashboardTab(index);
    }

    /**
     * Affiche l'onglet suivant.
     * @function nextTab
     */
    $scope.nextTab = function() {
        if( $scope.activeTab <= 2) $scope.goTab(2);
    }

    /**
     * Affiche l'onglet précédent
     * @function prevTab
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

