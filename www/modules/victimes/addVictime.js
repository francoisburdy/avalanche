'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name AddVictimeCtrl
 * @param $scope {service} native controller scope
 * @param $location {service} native location service
 * @param Operation {service} Avalanche Operation service
 * @param Parametres {service} Avalanche Parametres service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('AddVictimeCtrl', function ($scope, $location, Operation, Parametres, Translation) {

  Translation.getTranslation($scope);
  $scope.newVictime = {};
  $scope.newVictime.numero = Operation.generateVictimeNumber();
  $scope.newVictime.situation = Parametres.defaultSituation();
  $scope.newVictime.status = Parametres.defaultStatus();
  $scope.victimeStatus = Parametres.getVictimeStatus();
  $scope.victimeSituations = Parametres.getVictimeSituations();

  /**
   * Ajoute une victime après confirmation. La nouvelle victime est récupérée dans $scope.
   * @memberof AddVictimeCtrl
   * @function addVictime
   */
  $scope.addVictime = function () {
    navigator.notification.confirm($scope.translation.victimes.addVictime.confirm + " ?",
      function (buttonIndex) {
        if (buttonIndex == 2) {
          $scope.newVictime.beginDate = new Date();
          $scope.newVictime.endDate = null;
          Operation.addVictime($scope.newVictime);
          if ($scope.newVictime.situation == 'Évacuée') Operation.evacuateVictime($scope.newVictime);
          $scope.$apply();
        }
      },
      $scope.translation.victimes.addVictime.addVictime,
      [$scope.translation.cancel, $scope.translation.add]
    );
  };

  /**
   * Ecoute les évenements clavier pour cacher afficher les boutons flottants
   */
  window.addEventListener('native.keyboardshow', function () {
    $scope.keyboardVisible = true;
    $scope.$apply();
  });

  window.addEventListener('native.keyboardhide', function () {
    $scope.keyboardVisible = false;
    $scope.$apply();
  });

});
