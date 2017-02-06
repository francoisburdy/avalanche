'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope, $location, Operation) {
  	$scope.createOperation = function() {
  		Operation.createOperation();
  		$location.url('/dashboard');
  	}
  	
  	$scope.historique = function() {
  		$location.url('historique');
  	}
});
