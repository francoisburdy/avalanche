'use strict';

/**
 * Service dédié à l'internationalisation de l'application.
 * @memberof avalanche
 * @ngdoc services
 * @name Translation
 */
angular.module('myApp').service('Translation', function ($resource, $rootScope, Parametres) {

  /**
   * Charge un fichier de langue de façon asynchrone et l'inject dans le scope passé en paramètres.
   * Après le chargement, les données de langues sont accessible dans $scope.translation.
   * @memberof Translation
   * @function getTranslation
   * @eventType broadcast translationLoaded lorsque le chargement est terminé
   * @param {scope} scope - Scope du contrôleur
   */
  this.getTranslation = function (scope) {
    $resource('translations/translation_' + Parametres.getCurrentLanguage().code + '.json').get(function (data) {
      scope.translation = data;
      $rootScope.$broadcast('translationLoaded');
    });
  };

});