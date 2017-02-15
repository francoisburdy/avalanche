angular.module('myApp').service('Global', function($localStorage, $rootScope, $location, $http) {
    
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
        $http.get('demo/demo-historique.json').then(function(res) {
            console.log("historique", res);
            if(res.status == 200 && res.data){
                $localStorage.historique = res.data;                
                $rootScope.$broadcast('operationUpdated');
            }
        });

        $http.get('demo/demo-operation.json').then(function(res) {
            console.log("operation", res);
            if(res.status == 200 && res.data) {
                $localStorage.operation = res.data;                
                $rootScope.$broadcast('operationUpdated');
            }
        });
        // TODO : faire une redirection sur dashboard après chargement terminé (promise ?)
    }

});
