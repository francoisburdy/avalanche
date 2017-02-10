'use strict';

 /**
 * @class angular_module.myApp
 * @memberOf angular_module 
 */
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'mobile-angular-ui.core.sharedState',
  'tb-color-picker'
])

.run(function($rootScope, $location, Operation) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) { 
        if(next.$$route && next.$$route.originalPath == '/home' && Operation.getOperation() != null) {
            console.log('Redirection automatique vers le dashboard');
            $location.url('/dashboard');
        }
    });
});


document.addEventListener("deviceready", onDeviceReady, false);

/**
* Cordova callback
*/
function onDeviceReady() {
    console.log('deviceready');
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 50);
}
