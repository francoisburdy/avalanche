'use strict';

/**
 * Contrôleur associé à la vue d'édition d'un intervenant.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name EditIntervenantCtrl
 * @param {service} $scope - native controller scope AngularJS service
 * @param {service} $routeParams - native route parameters AngularJS service
 * @param {service} $location - native location AngularJS service
 * @param {service} Operation - Avalanche Operation service
 * @param {service} Parametres - Avalanche Parametres service
 * @param {service} Global - Avalanche Global service
 * @param {service} Translation - Avalanche Translation service
 */
angular.module('myApp').controller('EditIntervenantCtrl', function ($scope, $routeParams, $location, Operation, Parametres, Translation, Global) {

  /**
   * Récupère les informations stockées localement sur l'intervenant
   * @memberof EditIntervenantCtrl
   * @function init
   */
  function init() {
    Translation.getTranslation($scope);
    $scope.personnel = Operation.getPersonnel($routeParams.num);
    $scope.missions = Parametres.getMissions();
    Global.setMenuDisabled(true);
  }

  init();

  /**
   * Retourne à la page précédente.
   * @memberof EditIntervenantCtrl
   * @function goToPrevious
   */
  $scope.goToPrevious = function () {
    $location.url('/metiers/' + $scope.personnel.metier.libelle);
  };

  /**
   * Confirmation du retour à la page précédente.
   * @memberof EditIntervenantCtrl
   * @func confirmGoBack
   */
  $scope.confirmGoBack = function () {
    if (!$scope.personnel.numero) { // L'intervenant n'a pas de numéro
      toast($scope.translation.intervenants.editIntervenant.chooseNumber);
    } else if (!$scope.personnel.metier) { // L'intervenant n'a pas de métier
      toast($scope.translation.intervenants.editIntervenant.chooseProfession);
    } else {
      $scope.goToPrevious();
    }
  };

  /**
   * Fait sortir un intervenant.
   * @memberof EditIntervenantCtrl
   * @func evacuatePersonnel
   */
  $scope.evacuatePersonnel = function () {
    navigator.notification.confirm(
      $scope.translation.intervenants.editIntervenant.evacuateConfirm + $scope.personnel.numero + ' ?',
      function (buttonIndex) {
        if (buttonIndex == 2) {
          $scope.confirmGoBack();
          Operation.evacuatePersonnel($scope.personnel);
          toast($scope.translation.intervenants.number2 + $scope.personnel.numero + ' ' + $scope.translation.evacuated);
          $scope.$apply();
        }
      },
      $scope.translation.confirmation,
      [$scope.translation.cancel, $scope.translation.confirm]
    );
  };
  /**
   * Supprime un intervenant.
   * @memberof EditIntervenantCtrl
   * @func deletePersonnel
   */
  $scope.deletePersonnel = function () {
    navigator.notification.confirm(
      $scope.translation.intervenants.editIntervenant.deleteConfirm + $scope.personnel.numero + ' ?',
      function (buttonIndex) {
        if (buttonIndex == 2) {
          $scope.goToPrevious();
          Operation.removePersonnel($scope.personnel);
          toast($scope.translation.intervenants.number2 + $scope.personnel.numero + ' ' + $scope.translation.deleted);
          $scope.$apply();
        }
      },
      $scope.translation.intervenants.editIntervenant.delete,
      [$scope.translation.cancel, $scope.translation.delete]
    );
  };
  /**
   * Confirme le changement de mission d'un intervenant.
   * @memberof EditIntervenantCtrl
   * @func confirm
   */
  $scope.confirm = function () {
    let missionDifferente = $scope.personnel.missions.length && $scope.selectedMission != $scope.personnel.missions[$scope.personnel.missions.length - 1].libelle;

    if (($scope.personnel.missions.length == 0 || missionDifferente) && $scope.selectedMission) {
      let libMission = $scope.selectedMission;
      if ($scope.selectedMission == '-- Autre --' && $scope.newSelectedMission) libMission = $scope.newSelectedMission;
      $scope.personnel.missions.push({
        libelle: libMission,
        beginDate: new Date()
      });
    }
    $scope.confirmGoBack();
  };

  /**
   * Ecoute les évenements clavier pour cacher afficher les boutons flottants.
   * @ngdoc events
   * @memberof EditIntervenantCtrl
   */
  window.addEventListener('native.keyboardshow', function () {
    $scope.keyboardVisible = true;
    $scope.$apply();
  });

  window.addEventListener('native.keyboardhide', function () {
    $scope.keyboardVisible = false;
    $scope.$apply();
  });

  /**
   * Met à jour l'opération dans le scope lorsque le local storage est modifié.
   */
  $scope.$on('operationUpdated', function () {
    $scope.operation = Operation.getOperation();
  });

});
