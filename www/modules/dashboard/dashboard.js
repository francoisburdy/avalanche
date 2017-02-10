'use strict';


angular.module('myApp').controller('DashboardCtrl', function($scope, $location, $rootScope, Operation, Parametres, Global) {

    $scope.operation = Operation.getOperation();
    $scope.metiers = Parametres.getMetiers();

    angular.element(document).ready(function () {
        $scope.goTab(Global.getDashboardTab());
        $scope.$apply();
    }); 


    /**
     * Retourne le nombre de personnels pour un métier donné 
     * @param metier Métier des personnels
     */
    $scope.nbPersonnels = function(metier) {
        if(! $scope.operation || ! $scope.operation.personnels) return 0;
        
        let compteur = 0;
        for(let p of $scope.operation.personnels) {
            if(p.metier.libelle == metier && !p.endDate) compteur++;
        }
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


    /**
     * Vide le contenu du local storage
     */
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

    /**
     * Ferme l'application
     */
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

    /**
     * Charge les données de démonstration de l'application
     */
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


    $scope.evacuatePersonnel = function() {
        navigator.notification.prompt(
            'Saisissez le numéro de l\'intervenant sortant', 
            checkPersonnel, 
            'Sortie de personnel', 
            ['Valider', 'Annuler']
        );
    }

    function checkPersonnel(results) {
        console.log(results);
        if(results.buttonIndex == 1) {
            console.log('Sortie du personnel', results.input1);
            var personnel = Operation.getPersonnel(results.input1);
            if(!personnel) { // Personnel inexistant
                navigator.notification.alert(
                    'L\'intervenant n°' + results.input1 + ' est introuvable.',
                    null,
                    'Intervenant introuvable',
                    ['OK']
                )
            } else if(personnel.endDate) { // L'intervenant est déjà sorti
                console.log('Personnel déjà sorti');
                navigator.notification.confirm(
                    'L\'intervenant n°' + personnel.numero + ' est déjà sorti le ' + personnel.endDate.toLocaleString() ,
                    null,
                    'Déjà sorti',
                    ['OK']
                )
            } else { // On sort l'intervenant
                navigator.notification.confirm(
                    'Sortie : ' + personnel.metier.libelle + ' n°' + personnel.numero + '.',
                    function(buttonIndex) {
                        console.log('buttonIndex', buttonIndex);
                        Operation.evacuatePersonnel(personnel);
                    },
                    'Confirmation',
                    ['Valider', 'Annuler']
                )
            }
        } else { // Annulation
            console.log('Sortie de personnel annulée');
            navigator.notification.confirm(
                'Sortie de personnel annulée.',
                null,
                'Annulation',
                ['OK']
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
});
