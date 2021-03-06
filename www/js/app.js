'use strict';

/**
 * Charge les modules externes utilisés par l'application.
 * @memberof avalanche
 * @ngdoc global
 * @name app
 * @param {service} $rootScope native rootScope service
 * @param {service} $location native location service
 * @param {service} Operation Avalanche Operation service
 */
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'ngResource',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'tb-color-picker',
  'ngLocale'
]).run(function ($rootScope, $location, Operation, Global) {

  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.broadcast('$routeChangeStart');
  });

  $rootScope.$on("$routeChangeStart", function (event, next) {
    Global.setMenuDisabled(false);
    if (next.$$route) {
      let nextPath = next.$$route.originalPath;
      if (nextPath == '/home' && Operation.getOperation() != null) $location.url('/dashboard');
      if (nextPath == '/dashboard' && Operation.getOperation() == null) $location.url('/home');
    }
  });
});

/**
 * Helpers javascript.
 * Voir la documentation des plugins cordova pour plus d'informations sur l'API.
 * @memberof avalanche
 * @ngdoc helpers
 * @name JS helpers
 */

document.addEventListener("deviceready", onDeviceReady, false);

/**
 * Callback executé quand cordova émet l'évènement 'deviceready'
 * @memberof JS helpers
 * @func onDeviceReady
 */
function onDeviceReady() {
  console.log('deviceready');
  setTimeout(function () {
    navigator.splashscreen.hide();
  }, 50);
}

/**
 * Affiche un toast en bas au centre, sur fond gris clair transparent.
 * @memberof JS helpers
 * @func toast
 * @param {string} message - Message à afficher dans un toast
 */
function toast(message) {
  window.plugins.toast.showWithOptions({
    message: message,
    duration: "short",
    position: "bottom",
    addPixelsY: -60,
    styling: {
      opacity: 0.65,
      backgroundColor: '#222222',
      textColor: '#FFFFFF',
      textSize: 14,
      cornerRadius: 35,
      horizontalPadding: 50,
      verticalPadding: 30
    }
  });
}

/**
 * Vérifie si la valeur est un entier naturel strictement positif.
 * @memberof JS helpers
 * @func isInt
 * @param {mixed} value - La valeur à tester
 * @returns {boolean} true - true si la valeur est un entier naturel positif,
 * false sinon
 */
function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value && !isNaN(parseInt(value, 10) && value > 0);
}

/**
 * Structure d'object JavaScript réprésentant un intervenant (ou personnel) d'une opération
 * @ngdoc Généralités
 * @name service
 * @desc Service angularJS. Se référer au guide dans la documentation officielle.
 * @see {@link https://docs.angularjs.org/guide/services}
 */

/**
 * Structure d'object JavaScript réprésentant un intervenant (ou personnel) d'une opération
 * @ngdoc Généralités
 * @name scope
 * @desc Scope angularJS. Se référer au guide dans la documentation officielle.
 * @see {@link https://docs.angularjs.org/guide/scope}
 */