'use strict';

   /**
    * Définit les routes de l'application et les relations vues-controleurs
    * @memberof avalanche
    * @ngdoc config
    * @name routes
    * @param {service} $locationProvider native locationProvider service
    * @param {service} $routeProvider native routeProvider service
    */
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
    templateUrl: 'modules/intervenants/addIntervenant.html',
    controller: 'AddIntervenantCtrl'

  }).when('/addIntervenantMetier/:lib', {
    templateUrl: 'modules/intervenants/addIntervenant.html',
    controller: 'AddIntervenantCtrl'

  }).when('/intervenants/:num', {
    templateUrl: 'modules/intervenants/editIntervenant.html',
    controller: 'EditIntervenantCtrl'

  }).when('/confirmIntervenant', {
    templateUrl: 'modules/intervenants/confirmIntervenant.html',
    controller: 'AddIntervenantCtrl'

  }).when('/metiers/:lib', {
    templateUrl: 'modules/intervenants/detailsMetier.html',
    controller: 'DetailsMetierCtrl'

  }).when('/journal', {
    templateUrl: 'modules/journal/journal.html',
    controller: 'JournalCtrl'

  }).otherwise({redirectTo: '/home'});

}])
