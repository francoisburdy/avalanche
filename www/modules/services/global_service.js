'use strict';

/**
 * @memberof avalanche
 * @ngdoc services
 * @name Global
 * @param $localStorage {service} native localStorage service
 * @param $rootScope {service} native rootScope service
 * @param $location {service} native location service
 * @param $http {service} native http service
 * @description 
 *   Service Global
 */
angular.module('myApp').service('Global', function($localStorage, $rootScope, $location, $http) {
    
    /**
     * Ferme l'application, après avoir demandé une confirmation.
     * @memberof Global
     * @func exitApp
     */
    this.exitApp = function(scope) {
        navigator.notification.confirm(
            scope.translation.home.closeConfirm, 
            function(buttonIndex) {
                if(buttonIndex == 2) navigator.app.exitApp();
            }, 
            scope.translation.home.menuClose,
            [scope.translation.cancel, scope.translation.close]
        );
    }

    /**
     * Définit l'onglet du dashboard courant
     * @memberof Global
     * @func setDashboardTab
     * @param {integer} index Index de l'onget (1 ou 2)
     */
    this.setDashboardTab = function(index){
        $localStorage.dashboardTab = index;
    }

    /**
     * Retourne l'onglet courant du dashboard
     * @memberof Global
     * @func getDashboardTab
     * @returns {integer} onglet courant du dashboard (1 ou 2)
     */
    this.getDashboardTab = function(){
        if ($localStorage.dashboardTab == undefined) this.setDashboardTab(1);
        return $localStorage.dashboardTab;
    }

    /**
     * ATTENTION ! Remet à zéro l'ensemble du localStorage de la WebView, sans demander de confirmation.
     * @memberof Global
     * @func purgeData
     * @fires operationUpdated
     */
    this.purgeData = function() {
        $localStorage.$reset();
        $rootScope.$broadcast('operationUpdated');
    }

    /**
     * Charge les données de démonstrations.
     * ATTENTION ! Remet à zéro l'ensemble du localStorage de la WebView, sans demander de confirmation.
     * @memberof Global
     * @func loadDemoData
     */
    this.loadDemoData = function() {
        $http.get('demo/demo-historique.json').then(function(res) {
            if(res.status == 200 && res.data){
                $localStorage.historique = res.data;                
                $http.get('demo/demo-operation.json').then(function(res) {
                    if(res.status == 200 && res.data) {
                        $localStorage.operation = res.data;                
                        $rootScope.$broadcast('dataFlushed');
                    }
                });
            }
        });
    }

});
