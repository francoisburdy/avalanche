'use strict';

angular.module('myApp.parametres', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/parametres', {
    templateUrl: 'views/parametres/parametres.html',
    controller: 'ParametresCtrl'
  });
}])

.controller('ParametresCtrl', [function() {

}]);