'use strict';

/**
 * Contrôleur associé à la vue Paramètres de l'application.
 *
 * @ngdoc controllers
 * @memberof avalanche
 * @name ParametresCtrl
 * @param {service} $rootScope - native rootScope service
 * @param {service} $scope - native scope service
 * @param {service} Parametres - Avalanche Parametres service
 * @param {service} Translation - Avalanche Translation service
 * @param {service} Operation - Avalanche Operation service
 */
angular.module('myApp').controller('ParametresCtrl', function ($rootScope, $scope, Parametres, Translation, Operation) {

  /**
   * Récupère les paramètres stockés localement
   * @memberof ParametresCtrl
   * @func init
   */
  function init() {
    Translation.getTranslation($scope);
    $scope.metiers = Parametres.getMetiers();
    $scope.victimeStatus = Parametres.getVictimeStatus();
    $scope.victimeSituation = Parametres.getVictimeSituations();
    $scope.languages = Parametres.getLanguages();
    $scope.language = Parametres.getCurrentLanguage();
  }

  init();

  /**
   * Met à jour le langage utilisé dans l'application
   * @memberof ParametresCtrl
   * @function changeLanguage
   * @param {string} lang Langue choisie
   */
  $scope.changeLanguage = function (lang) {
    Parametres.setLanguage(lang);
  };

  /**
   * Met à jour l'identifiant du dernier metier cliqué
   * @memberof ParametresCtrl
   * @function updateLastClicked
   * @param {string} index Index cliqué
   */
  $scope.updateLastClicked = function (index) {
    $scope.lastClickedIndex = index;
  };

  /**
   * Ajoute un metier dans les coprs de métiers disponibles pour les intervenants
   * @memberof ParametresCtrl
   * @function addMetier
   * @param {string} color Couleur représentative du métier choisie
   * @param {string} metier Nom du métier choisi
   */
  $scope.addMetier = function (color, metier) {
    if (!metier) {
      navigator.notification.alert("Saisissez un intitulé de métier.");
    } else {
      Parametres.addMetier({libelle: metier, bg: color, text: '#000'});
      $rootScope.Ui.turnOff('modalAddMetier')
    }
  };

  /**
   * Supprime un metier parmis les corps de métiers disponibles pour les intervenants
   * @memberof ParametresCtrl
   * @function removeMetier
   * @param {string} metier Nom du métier choisi
   */
  $scope.removeMetier = function (metier) {
    if (Operation.getPersonnelsByMetier(metier).length > 0) {
      navigator.notification.alert("Impossible de supprimer. \n Des intervenants de l'opération ont ce corps de métier", null, "Attention", "OK")
    } else {
      navigator.notification.confirm(
        "Etes-vous sûr de vouloir supprimer ce métier ?",
        function (buttonIndex) {
          if (buttonIndex == 2) {
            let i = 0;
            while ($scope.metiers[i].libelle != metier && i < $scope.metiers.length) i++;
            if (i < $scope.metiers.length) Parametres.removeMetier($scope.metiers[i]);
            else console.log("Ce métier n'existe pas dans la liste des métiers.");
            Parametres.removeMetier(metier);
            $rootScope.Ui.turnOff('modalModifyMetier');
            $scope.$apply();
          }
        },
        "Supprimer le métier",
        ["Annuler", "Confirmer"]);
    }
  };

  /**
   * Modifie un metier parmis les coprs de métiers disponibles pour les intervenants
   * @memberof ParametresCtrl
   * @function modifyMetier
   * @param {string} color Nouvelle couleur du métier modifié
   * @param {string} metier Nouveau nom du corps de métier modifié
   */
  $scope.modifyMetier = function (color, metier) {
    Parametres.modifyMetier({libelle: metier, bg: color, text: '#000'});
  };

  $scope.options = [
    '#FFF', '#FFA773', '#FFD180', '#FFFF8D', '#CFD8DC', '#80D8FF',
    '#A7FFEB', '#E969A8', '#6996D3', '#CCFF90', '#5FD2B5', '#FF8A80'
  ];

  $scope.$on('langUpdated', function () {
    $scope.language = Parametres.getCurrentLanguage();
    Translation.getTranslation($scope);
  });

  $scope.$on('metiersUpdated', function () {
    $scope.metiers = Parametres.getMetiers();
  });

});