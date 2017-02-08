angular.module('myApp').service('Global', function($localStorage, $rootScope, $location) {
    this.purgeData = function() {
        $localStorage.$reset();
        $rootScope.$broadcast('operationUpdated');
		$location.url('/home');
    }

    this.loadDemoData = function() {
        
    }
});
