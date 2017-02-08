'use strict';

angular.module('myApp').controller('DetailsMetierCtrl', function($scope, $routeParams, Operation) {
    $scope.metier = $routeParams.lib;
    //$scope.personnels = Operation.getPersonnelsByMetier($routeParams.lib);
});
