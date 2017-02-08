angular.module('myApp').service('Global', function($localStorage, $rootScope, $filter) {
    
    this.purgeData = function() {
        $localStorage.$reset();
        $rootScope.$broadcast('operationUpdated');
    }

    this.loadDemoData = function(){
        
    }
    
});
