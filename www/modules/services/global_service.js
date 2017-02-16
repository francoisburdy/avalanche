'use strict';

/**
 * @memberof avalanche
 * @ngdoc services
 * @name Global
 * @description 
 *   Service Global
 */
angular.module('myApp').service('Global', function($localStorage, $rootScope, $location, $http) {
    
    /**
     * Ferme l'application
     * @memberof Global
     * @func exitApp
     */
    this.exitApp = function() {
        navigator.notification.confirm(
            'Souhaitez-vous fermer l\'application ?', 
            function(buttonIndex) {
                if(buttonIndex == 2) navigator.app.exitApp();
            }, 
            'Fermer l\'application',
            ['Annuler', 'Fermer']
        );
    }

    /**
     * @memberof Global
     * @func setDashboardTab
     */
    this.setDashboardTab = function(index){
        $localStorage.dashboardTab = index;
    }

    /**
     * @memberof Global
     * @func getDashboardTab
     */
    this.getDashboardTab = function(){
        if ($localStorage.dashboardTab == undefined) this.setDashboardTab(1);
        return $localStorage.dashboardTab;
    }

    /**
     * @memberof Global
     * @func purgeData
     */
    this.purgeData = function() {
        $localStorage.$reset();
        $rootScope.$broadcast('operationUpdated');
    }

    /**
     * @memberof Global
     * @func loadDemoData
     */
    this.loadDemoData = function() {
        $http.get('demo/demo-historique.json').then(function(res) {
            console.log("historique", res);
            if(res.status == 200 && res.data){
                $localStorage.historique = res.data;                

                $http.get('demo/demo-operation.json').then(function(res) {
                    console.log("operation", res);
                    if(res.status == 200 && res.data) {
                        $localStorage.operation = res.data;                
                        $rootScope.$broadcast('dataFlushed');
                    }
                });
            }
        });
    }

});
