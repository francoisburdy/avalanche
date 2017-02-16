'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name DetailsMetierCtrl
 */
angular.module('myApp').controller('DetailsMetierCtrl', function($scope, $routeParams, $location, Operation, Translation) {
    
    function init() {
        Translation.getTranslation($scope);
        $scope.metier = $routeParams.lib; 
        $scope.personnels = Operation.getPersonnelsByMetier($routeParams.lib);
    }
    init();

    $scope.seeDetails = function(num) {
    	$location.url('/intervenants/' + num);
    }

    $scope.addIntervenantMetier = function(lib) {
        $location.url('/addIntervenantMetier/' + lib);
    }

    /**
     * Met à jour l'opération dans le scope lorsque le local storage est modifié 
     */
    $scope.$on('operationUpdated', function(event) {
        $scope.operation = Operation.getOperation();
    });

});
