'use strict';

/**
 * Contrôleur associé à la page d'accueil de l'application.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name HomeCtrl
 * @param $scope {service} native controller scope
 * @param $location {service} native location service
 * @param $route {service} native route service
 * @param $filter {service} native filter service
 * @param Operation {service} Avalanche Operation service
 * @param Global {service} Avalanche Global service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('HomeCtrl', function ($scope, $location, $route, $filter, Operation, Global, Translation) {

  Translation.getTranslation($scope);

  /**
   * Démarre une nouvelle opération. Ouvre une boîte de dialogue de saisie
   * du nom de l'opération.
   * @memberof HomeCtrl
   * @func createOperation
   */
  $scope.createOperation = function () {
    navigator.notification.prompt(
      $scope.translation.home.newOpName,
      function (results) {
        if (results.buttonIndex == 1 && results.input1) {
          console.log('Création d\'une nouvelle opération');
          Operation.createOperation(results.input1);
          $route.reload();
        }
      },
      $scope.translation.home.newOp,
      [$scope.translation.create, $scope.translation.cancel],
      $scope.translation.home.avalancheFrom + ' ' + $filter('date')(new Date(), $scope.translation.dateFormat)
    );
  };

  /**
   * Redirige vers la page "historique".
   * @memberof HomeCtrl
   * @func historique
   */
  $scope.historique = function () {
    $location.url('historique');
  };

  /**
   * Vide le contenu du local storage. Ouvre une boite de dialogue
   * de confirmation avec saisie de mot de confirmation.
   * @memberof HomeCtrl
   * @func purgeStorage
   */
  $scope.purgeStorage = function () {
    navigator.notification.prompt(
      $scope.translation.home.confirmDelete,
      function (results) {
        if (results.buttonIndex == 2 && results.input1.toLowerCase() == "supprimer") {
          console.log('Purge all data !');
          Global.purgeData();
          toast($scope.translation.home.purgeSuccess);
        } else {
          console.log('Purge annulée')
        }
      },
      $scope.translation.home.deleteData,
      [$scope.translation.cancel, $scope.translation.delete]
    );
  };

  /**
   * Vide le contenu du localStorage et charge les données
   * de démonstration de l'application.
   * @memberof HomeCtrl
   * @func loadDemoData
   */
  $scope.loadDemoData = function () {
    navigator.notification.prompt(
      $scope.translation.home.confirmDemo,
      function (results) {
        if (results.buttonIndex == 2 && results.input1.toLowerCase() == "demo") {
          console.log('Charger les données de démo !');
          Global.purgeData();
          Global.loadDemoData();
        } else {
          console.log('Chargement données démo annulé !');
        }
      },
      $scope.translation.home.demoData,
      [$scope.translation.cancel, $scope.translation.ok]
    );
  };

  /**
   * Ferme l'application après avoir demandé la confirmation
   * @memberof HomeCtrl
   * @function exitApp
   */
  $scope.exitApp = function () {
    Global.exitApp($scope);
  };

  $scope.$on('dataFlushed', function () {
    toast($scope.translation.home.demoLoadSuccess);
    $location.url('/dashboard');
  });

});
