'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.journal',
  'myApp.historique',
  'myApp.addvictime',
  'myApp.parametres',
  'mobile-angular-ui'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}]);


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log('deviceready');
  console.log(navigator.camera);
}


retreiveConfig();
retreiveCurrentOperation();



