'use strict';

angular.module('myApp.suivi', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/suivi', {
    templateUrl: 'views/suivi/suivi.html',
    controller: 'SuiviCtrl'
  });
}])

.controller('SuiviCtrl', function($scope) {
	
	


});