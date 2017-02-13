angular.module('myApp').service('Global', function($localStorage, $rootScope, $location) {
    
    /**
     * Ferme l'application
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

    this.setDashboardTab = function(index){
        $localStorage.dashboardTab = index;
    }

    this.getDashboardTab = function(){
        if ($localStorage.dashboardTab == undefined) this.setDashboardTab(1);
        return $localStorage.dashboardTab;
    }

    this.purgeData = function() {
        $localStorage.$reset();
        $rootScope.$broadcast('operationUpdated');
    }

    this.loadDemoData = function() {
        // TODO : charger données de démo
    }

});
