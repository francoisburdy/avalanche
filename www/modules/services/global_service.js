angular.module('myApp').service('Global', function($localStorage, $rootScope, $location) {
    
    
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
		$location.url('/home');
    }

    this.loadDemoData = function() {
        // TODO : charger données de démo
    }

});
