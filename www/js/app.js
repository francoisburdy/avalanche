'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'myApp.home',
  'myApp.dashboard',
  'myApp.journal',
  'myApp.historique',
  'myApp.addvictime',
  'myApp.parametres',
  'mobile-angular-ui',
  'swipe'
])
.controller('GlobalController', ['$scope', function($scope) {
  $scope.swipe = function($event) {
    //console.log($event);
    simulateClick();
  };
}])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}]);


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log('deviceready');
  console.log(navigator.camera);
}

function simulateClick() {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('burger'); 
  var cancelled = !cb.dispatchEvent(event);
  if (cancelled) {
    // A handler called preventDefault.
    alert("cancelled");
  } else {
    // None of the handlers called preventDefault.
    alert("not cancelled");
  }
}

//retreiveConfig();
//retreiveCurrentOperation();



