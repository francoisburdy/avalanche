'use strict';

angular.module('myApp.addvictime', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addvictime', {
    templateUrl: 'views/addvictime/addvictime.html',
    controller: 'AddVictimeCtrl'
  });
}])

.controller('AddVictimeCtrl', function($scope) {
	
});
