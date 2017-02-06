'use strict';

angular.module('myApp.journal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/journal', {
    templateUrl: 'modules/journal/journal.html',
    controller: 'JournalCtrl'
  });
}])

.controller('JournalCtrl', function($scope) {
	
	


});