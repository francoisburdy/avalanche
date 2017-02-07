'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'mp.colorPicker'
])

.run(function($rootScope, $location, Operation) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) { 
    if(next.$$route && next.$$route.originalPath == '/home' && Operation.getOperation() != null) {
      $location.url('/dashboard');
    }
  });
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log('deviceready');
  console.log(navigator.camera);
}
