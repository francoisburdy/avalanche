'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.parametres',
  'mobile-angular-ui'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log('deviceready');
  console.log(navigator.camera);
}

var storage = window.localStorage;