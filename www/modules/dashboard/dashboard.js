'use strict';

/**
 * @ngdoc controllers
 * @memberof avalanche
 * @name DashboardCtrl
 * @param $scope {service} native scope service
 * @param $location {service} native location service
 * @param $rootScope {service} native rootScope service
 * @param Operation {service} Avalanche Operation service
 * @param Parametres {service} Avalanche Parametres service
 * @param Global {service} Avalanche Global service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('DashboardCtrl', function ($scope, $location, $rootScope, Operation, Parametres, Global, Translation) {

  /**
   * Initialise le scope du controller
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
   * Retourne le nombre de personnels pour un métier donné.
   * @memberof DashboardCtrl
   * @function nbPersonnels
   * @param {string} metier Métier des personnels
   */
  $scope.nbPersonnels = function (metier) {
    if (!$scope.operation || !$scope.operation.personnels) return 0;

    let compteur = 0;
    for (let p of $scope.operation.personnels)
      if (p.metier.libelle == metier && !p.endDate) compteur++;
    return compteur;
  }

  /**
   * Retourne le nombre de personnels encore présents sur le site
   * @memberof DashboardCtrl
   * @function nbActivePersonnels
   */
  $scope.nbActivePersonnels = function () {
    if (!$scope.operation || !$scope.operation.personnels) return 0;

    let compteur = 0;
    for (let p of $scope.operation.personnels) {
      if (!p.endDate) compteur++;
    }
    return compteur;
  }

  /**
   * Termine une opération.
   * Enregistre également dans le journal toutes les évènements effectués.
   * @memberof DashboardCtrl
   * @function terminateOperation
   */
  $scope.terminateOperation = function () {
    /* TODO: Vérifier que tout le monde est sorti */
    var nbPersonnes = $scope.operation.victimes.filter(function (v) {
        return !v.endDate
      }).length
      + $scope.operation.personnels.filter(function (p) {
        return !p.endDate
      }).length;
    var msg = nbPersonnes > 0
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
   * Redirige vers la page d'édition de victime
   * @function editVictime
   * @memberof DashboardCtrl
   * @param {int} num Numéro de la victime à éditer
   */
  $scope.editVictime = function (num) {
    $location.url('/victimes/' + num);
  };

  /**
   * Redirige vers la page listant les intervenant pour un métier donné
   * @memberof DashboardCtrl
   * @function detailsMetier
   * @param {string} lib Libellé du métier recherché
   */
  $scope.detailsMetier = function (lib) {
    $location.url('/metiers/' + lib);
  };

  /**
   * Ouvre une modale avec un champs de saisie pour la sortie d'intervenant par son numéro
   * @memberof DashboardCtrl
   * @function evacuatePersonnel
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
   * Redirige vers la page de détails d'un métier
   * @memberof DashboardCtrl
   * @function checkPersonnel
   * @param {string} results Libellé du métier recherché
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
   * Va vers l'index d'onglet passé en paramètre
   * @memberof DashboardCtrl
   * @function goTab
   * @param {int} index de l'onglet recherché
   */
  $scope.goTab = function (index) {
    $scope.activeTab = index;
    Global.setDashboardTab(index);
  };

  /**
   * Affiche l'onglet suivant.
   * @memberof DashboardCtrl
   * @function nextTab
   */
  $scope.nextTab = function () {
    if ($scope.activeTab <= 2) $scope.goTab(2);
  };

  /**
   * Affiche l'onglet précédent
   * @memberof DashboardCtrl
   * @function prevTab
   */
  $scope.prevTab = function () {
    if ($scope.activeTab > 1) $scope.goTab(1);
    else $rootScope.Ui.turnOn('uiSidebarLeft');
  };

  /**
   * Met à jour l'opération dans le scope lorsque le local storage est modifié
   */
  $scope.$on('operationUpdated', function (event) {
    $scope.operation = Operation.getOperation();
  });

  /**
   * @memberof DashboardCtrl
   * @func exitApp
   * Ferme l'application après avoir demandé la confirmation
   */
  $scope.exitApp = function () {
    Global.exitApp();
  }

});