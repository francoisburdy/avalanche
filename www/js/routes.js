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

  }).when('/exportPdf', {
    templateUrl: 'modules/export/exportPDF.html',
    controller: 'ExportPDFCtrl'

  }).when('/journal', {
    templateUrl: 'modules/journal/journal.html',
    controller: 'JournalCtrl'

  }).otherwise({redirectTo: '/home'});

}])
