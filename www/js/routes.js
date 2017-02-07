'use strict';

angular.module('myApp').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/victimes', {
    templateUrl: 'modules/victimes/addVictime.html',
    controller: 'AddVictimeCtrl'

  }).when('/victimes/:num', {
    templateUrl: 'modules/victimes/editVictime.html',
    controller: 'EditVictimeCtrl'
  
  }).when('/home', {
    templateUrl: 'modules/home/home.html',
    controller: 'HomeCtrl'

  }).when('/dashboard', {
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl'

  }).when('/parametres', {
    templateUrl: 'modules/parametres/parametres.html',
    controller: 'ParametresCtrl'

  }).when('/historique', {
    templateUrl: 'modules/historique/historique.html',
    controller: 'HistoriqueCtrl'

  }).when('/journal', {
    templateUrl: 'modules/journal/journal.html',
    controller: 'JournalCtrl'

  }).when('/addIntervenant', {
    templateUrl: 'modules/addIntervenant/addIntervenant.html',
    controller: 'AddIntervenantCtrl'

  }).otherwise({redirectTo: '/home'});
}])
