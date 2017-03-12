'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name EditVictimeCtrl
 * @param $scope {service} native controller scope
 * @param $routeParams {service} native routeParams service
 * @param $location {service} native location service
 * @param Operation {service} Avalanche Operation service
 * @param Parametres {service} Avalanche Parametres service
 * @param Translation {service} Avalanche Translation service
 * @param Global {service} Avalanche Global service
 */
angular.module('myApp').controller('EditVictimeCtrl', function ($scope, $routeParams, $location, Operation, Parametres, Translation, Global) {
  Translation.getTranslation($scope);

  /**
   * Initialise le scope du controller.
   * @memberof EditVictimeCtrl
   * @function init
   */
  function init() {
    $scope.victime = Operation.getVictime($routeParams.num);
    $scope.victimeStatus = Parametres.getVictimeStatus();
    $scope.victimeSituations = Parametres.getVictimeSituations();
    Global.setMenuDisabled(true);
  }

  init();

  /**
   * Passe l'état de la victime à évacuer
   * @memberof EditVictimeCtrl
   * @function evacuateVictime
   */
  $scope.evacuateVictime = function () {
    navigator.notification.confirm(
      $scope.translation.victimes.editVictime.evacuateConfirm1 + ' ' + $scope.victime.numero
      + ' ' + $scope.translation.victimes.editVictime.evacuateConfirm2,
      function (buttonIndex) {
        if (buttonIndex == 2) {
          Operation.evacuateVictime($scope.victime);
          $location.url('/dashboard');
          toast($scope.translation.victimes.number2 + $scope.victime.numero + ' ' + $scope.translation.evacuatedFemale);
          $scope.$apply();
        }
      },
      $scope.translation.victimes.editVictime.evacuateVictime,
      [$scope.translation.cancel, $scope.translation.victimes.editVictime.evacuate]
    );
  };

  /**
   * Enregistre les modifications de statut et/ou situation apportées à la victime.
   * @memberof EditVictimeCtrl
   * @function checkSituation
   */
  $scope.checkSituation = function () {
    toast("Victime n°" + $scope.victime.numero + " mise à jour");
    if ($scope.victime.situation == 'Évacuée')
      Operation.evacuateVictime($scope.victime);
  };

  /**
   * Supprime la victime.
   * @memberof EditVictimeCtrl
   * @function deleteVictime
   */
  $scope.deleteVictime = function () {
    navigator.notification.confirm(
      'Souhaitez-vous vraiment supprimer la victime ' + $scope.victime.numero + ' ?',
      function (buttonIndex) {
        if (buttonIndex == 2) {
          Operation.removeVictime($scope.victime);
          $location.url('/dashboard');
          toast($scope.translation.victimes.number2 + $scope.victime.numero + ' ' + $scope.translation.deleted);
          $scope.$apply();
        }
      },
      $scope.translation.victimes.editVictime.deleteVictime,
      [$scope.translation.cancel, $scope.translation.delete]
    );
  };

  /**
   * Met à jour l'opération dans le scope lorsque le local storage est modifié
   */
  $scope.$on('operationUpdated', function () {
    $scope.operation = Operation.getOperation();
  });

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
