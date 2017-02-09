'use strict';

angular.module('myApp').controller('DetailsMetierCtrl', function($scope, $routeParams, $location, Operation) {
    $scope.metier = $routeParams.lib;
    
    $scope.personnels = Operation.getPersonnelsByMetier($routeParams.lib);

    $scope.seeDetails = function(num) {
    	$location.url('/intervenants/' + num);
    }

    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });
});
