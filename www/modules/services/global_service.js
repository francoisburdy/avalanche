'use strict';

/**
 * Service donnant accès à des méthodes concernant l'application
 * dans sa globalité.
 *
 * @memberof avalanche
 * @ngdoc services
 * @name Global
 * @param {service} $localStorage - native localStorage AngularJS service
 * @param {service} $rootScope - native rootScope AngularJS service
 * @param {service} $location - native location AngularJS service
 * @param {service} $http - native http AngularJS service
 */
angular.module('myApp').service('Global', function ($localStorage, $rootScope, $location, $http) {

  /**
   * Ferme l'application, après avoir demandé une confirmation.
   * @memberof Global
   * @param {scope} scope - scope du contrôleur
   * @func exitApp
   */
  this.exitApp = function (scope) {
    navigator.notification.confirm(
      scope.translation.home.closeConfirm,
      function (buttonIndex) {
        if (buttonIndex == 2) navigator.app.exitApp();
      },
      scope.translation.home.menuClose,
      [scope.translation.cancel, scope.translation.close]
    );
  };

  /**
   * Définit l'onglet sélectionné du dashboard.
   * @memberof Global
   * @func setDashboardTab
   * @param {int} index -  Index de l'onget (1 ou 2)
   */
  this.setDashboardTab = function (index) {
    $localStorage.dashboardTab = index;
  };

  /**
   * Retourne l'onglet courant du dashboard.
   * @memberof Global
   * @func getDashboardTab
   * @returns {int} - Onglet courant du dashboard (1 ou 2)
   */
  this.getDashboardTab = function () {
    if ($localStorage.dashboardTab == undefined) this.setDashboardTab(1);
    return $localStorage.dashboardTab;
  };

  /**
   * ATTENTION ! Remet à zéro l'ensemble du localStorage de la WebView, sans demander de confirmation.
   * @memberof Global
   * @func purgeData
   * @fires operationUpdated
   */
  this.purgeData = function () {
    $localStorage.$reset();
    $rootScope.$broadcast('operationUpdated');
  };

  /**
   * Charge les données de démonstrations.
   * ATTENTION ! Remet à zéro l'ensemble du localStorage de la WebView, sans demander de confirmation.
   * @memberof Global
   * @func loadDemoData
   */
  this.loadDemoData = function () {
    $http.get('demo/demo-historique.json').then(function (res) {
      if (res.status == 200 && res.data) {
        $localStorage.historique = res.data;
        $http.get('demo/demo-operation.json').then(function (res) {
          if (res.status == 200 && res.data) {
            $localStorage.operation = res.data;
            $rootScope.$broadcast('dataFlushed');
          }
        });
      }
    });
  };

  /**
   * Défini l'état du menu comme activé ou désactivé
   * @memberof Global
   * @func setMenuDisabled
   * @param {boolean} val - Valeur à affecter
   */
  this.setMenuDisabled = function (val) {
    this.menuDisabled = val;
    $rootScope.$broadcast('menuUpdated');
  };

  /**
   * Retourne si le menu est actif ou non
   * @memberof Global
   * @func isMenuDisabled
   * @returns {boolean} Etat d'activité du menu
   */
  this.isMenuDisabled = function () {
    if (this.menuDisabled === undefined) return false;
    else return this.menuDisabled;
  }

});
