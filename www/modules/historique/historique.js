'use strict';

angular.module('myApp.historique', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/historique', {
    templateUrl: 'modules/historique/historique.html',
    controller: 'HistoriqueCtrl'
  });
}])

.controller('HistoriqueCtrl', [function() {

}]);