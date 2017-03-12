'use strict';

/**
 * Contrôleur associé à la vue des intervenant par métier.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name DetailsMetierCtrl
 * @param $scope {service} native controller scope
 * @param $routeParams {service} native route parameters service
 * @param $location {service} native location service
 * @param Operation {service} Avalanche Operation service
 * @param Translation {service} Avalanche Translation service
 */
angular.module('myApp').controller('DetailsMetierCtrl', function ($scope, $routeParams, $location, Operation, Translation) {

  /**
   * Récupère les informations stockées localement sur le
   * métier et les intervenants associés.
   * @memberof DetailsMetierCtrl
   * @func init
   */
  function init() {
    Translation.getTranslation($scope);
    $scope.metier = $routeParams.lib;
    $scope.personnels = Operation.getPersonnelsByMetier($routeParams.lib);
  }

  init();

  /**
   * Affiche les détails sur un intervenant.
   * @memberof DetailsMetierCtrl
   * @func seeDetails
   */
  $scope.seeDetails = function (num) {
    $location.url('/intervenants/' + num);
  };

  /**
   * Charge la page pour aajouter un intervenant à un métier
   * @memberof DetailsMetierCtrl
   * @func addIntervenantMetier
   */
  $scope.addIntervenantMetier = function (lib) {
    $location.url('/addIntervenantMetier/' + lib);
  };

  /**
   * Met à jour l'opération dans le scope lorsque le local storage est modifié
   */
  $scope.$on('operationUpdated', function () {
    $scope.operation = Operation.getOperation();
  });

});
