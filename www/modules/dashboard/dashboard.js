'use strict';

/**
 * Contrôleur associé à la vue dashboard de l'application.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name DashboardCtrl
 * @param {service} $scope  - native scope AngularJS service
 * @param {service} $location  - native location AngularJS service
 * @param {service} $rootScope  - native rootScope AngularJS service
 * @param {service} Operation  - Avalanche Operation AngularJS service
 * @param {service} Parametres  - Avalanche Parametres AngularJS service
 * @param {service} Global  - Avalanche Global AngularJS service
 * @param {service} Translation  - Avalanche Translation AngularJS service
 */
angular.module('myApp').controller('DashboardCtrl', function ($scope, $location, $rootScope, Operation, Parametres, Global, Translation) {

  /**
   * Initialise le scope du controller.
   * @memberof DashboardCtrl
   * @function init
   */
  function init() {
    Translation.getTranslation($scope);
    $scope.operation = Operation.getOperation();
    $scope.metiers = Parametres.getMetiers();

    angular.element(document).ready(function () {
      $scope.goTab(Global.getDashboardTab());
      $scope.$apply();
    });
  }

  init();

  /**
   * Retourne le nombre de personnels présents sur zone de l'opération
   * courante pour un corps de métier donné.
   * @memberof DashboardCtrl
   * @func nbPersonnels
   * @param {string} metier - Corps de métier.
   * @returns {int} Nombre d'intervenants.
   */
  $scope.nbPersonnels = function (metier) {
    if (!$scope.operation || !$scope.operation.personnels) return 0;

    let compteur = 0;
    for (let p of $scope.operation.personnels)
      if (p.metier.libelle == metier && !p.endDate) compteur++;
    return compteur;
  };

  /**
   * Retourne le nombre de personnels encore présents sur le site.
   * @memberof DashboardCtrl
   * @func nbActivePersonnels
   * @returns {int} Nombre d'intervenants de l'opération courante, zéro s'il
   * n'y a pas d'opération en cours.
   */
  $scope.nbActivePersonnels = function () {
    if (!$scope.operation || !$scope.operation.personnels) return 0;

    let compteur = 0;
    for (let p of $scope.operation.personnels) {
      if (!p.endDate) compteur++;
    }
    return compteur;
  };

  /**
   * Termine une opération. Enregistre également dans le
   * journal toutes les évènements effectués.
   * @memberof DashboardCtrl
   * @func terminateOperation
   */
  $scope.terminateOperation = function () {
    /* TODO: Vérifier que tout le monde est sorti */
    let nbPersonnes = $scope.operation.victimes.filter(function (v) {
        return !v.endDate
      }).length
      + $scope.operation.personnels.filter(function (p) {
        return !p.endDate
      }).length;
    let msg = nbPersonnes > 0
      ? nbPersonnes + " personnes sont encore sur zone !\n" + $scope.translation.dashboard.confirmTerminateMsg
      : $scope.translation.dashboard.confirmTerminateMsg;

    navigator.notification.confirm(
      msg,
      function (buttonIndex) {
        if (buttonIndex == 2) {
          Operation.terminate();
          $location.url('/home');
          toast($scope.translation.operationTerminated);
          $scope.$apply();
        }
      },
      $scope.translation.terminate + ' ' + $scope.translation.theOperation,
      [$scope.translation.cancel, $scope.translation.terminate]
    );
  };

  /**
   * Redirige vers la page d'édition de victime.
   * @func editVictime
   * @memberof DashboardCtrl
   * @param {int} num - Numéro de la victime à éditer
   */
  $scope.editVictime = function (num) {
    $location.url('/victimes/' + num);
  };

  /**
   * Redirige vers la page listant les intervenant pour un métier donné.
   * @memberof DashboardCtrl
   * @funct detailsMetier
   * @param {string} lib - Libellé du métier recherché
   */
  $scope.detailsMetier = function (lib) {
    $location.url('/metiers/' + lib);
  };

  /**
   * Ouvre une modale avec un champs de saisie pour la sortie
   * d'intervenant par son numéro.
   * @memberof DashboardCtrl
   * @func evacuatePersonnel
   */
  $scope.evacuatePersonnel = function () {
    navigator.notification.prompt(
      $scope.translation.dashboard.rescuerOutMsg,
      checkPersonnel,
      $scope.translation.dashboard.rescuerOut,
      [$scope.translation.cancel, $scope.translation.validate]
    );
  };

  /**
   * Redirige vers la page de détails d'un métier.
   * @memberof DashboardCtrl
   * @func checkPersonnel
   * @param {string} results - Libellé du métier recherché
   */
  function checkPersonnel(results) {
    if (results.buttonIndex == 2) {
      console.log($scope.translation.dashboard.rescuerOut, results.input1);
      var personnel = Operation.getPersonnel(results.input1);
      if (!personnel) { // Personnel inexistant
        toast($scope.translation.intervenantNum + results.input1 + ' ' + $scope.translation.dashboard.notFound + '.');
      } else if (personnel.endDate) { // L'intervenant est déjà sorti
        console.log('Personnel déjà sorti');
        navigator.notification.confirm(
          $scope.translation.intervenantNum + personnel.numero + ' ' + $scope.translation.dashboard.isAlreadyOut + ' ' + personnel.endDate.toLocaleString(),
          null, $scope.translation.alreadyOut, [$scope.translation.ok]
        )
      } else { // On sort l'intervenant
        navigator.notification.confirm(
          $scope.translation.dashboard.exit + ' : ' + personnel.metier.libelle + ' ' + $scope.translation.dashboard.number + personnel.numero + '.',
          function (buttonIndex) {
            if (buttonIndex == 2) {
              console.log('buttonIndex', buttonIndex);
              Operation.evacuatePersonnel(personnel);
              toast($scope.translation.intervenants.number + personnel.numero + ' ' + $scope.translation.evacuated);
              $scope.$apply();
            }
          },
          $scope.translation.dashboard.confirmation, [$scope.translation.cancel, $scope.translation.validate]
        )
      }
    } else { // Annulation
      console.log($scope.translation.dashboard.exitCanceled);
      toast($scope.translation.dashboard.exitCanceled);
    }
  }

  /**
   * Va vers l'index d'onglet passé en paramètre.
   * @memberof DashboardCtrl
   * @func goTab
   * @param {int} index - Index de l'onglet recherché
   */
  $scope.goTab = function (index) {
    $scope.activeTab = index;
    Global.setDashboardTab(index);
  };

  /**
   * Affiche l'onglet suivant.
   * @memberof DashboardCtrl
   * @func nextTab
   */
  $scope.nextTab = function () {
    if ($scope.activeTab <= 2) $scope.goTab(2);
  };

  /**
   * Affiche l'onglet précédent.
   * @memberof DashboardCtrl
   * @func prevTab
   */
  $scope.prevTab = function () {
    if ($scope.activeTab > 1) $scope.goTab(1);
    else $rootScope.Ui.turnOn('uiSidebarLeft');
  };

  /**
   * Met à jour l'opération dans le scope lorsque le local storage est modifié.
   */
  $scope.$on('operationUpdated', function () {
    $scope.operation = Operation.getOperation();
  });

  /**
   * Ferme l'application après avoir demandé la confirmation.
   * @memberof DashboardCtrl
   * @func exitApp
   */
  $scope.exitApp = function () {
    Global.exitApp($scope);
  }

});