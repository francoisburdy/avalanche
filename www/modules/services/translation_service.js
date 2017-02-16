'use strict';

/**
 * Service Translation
 *
 * @memberof avalanche
 * @ngdoc services
 * @name Translation
 */
 angular.module('myApp').service('Translation', function($resource, $rootScope, Parametres) {
    
    /**
     * Charge un fichier de langue de façon asynchrone et l'inject dans le scope passé en paramètres.
     * Après le chargement, les données de langues sont accessible dans $scope.translation.
     * @memberof Translation
     * @function getTranslation
     * @eventType broadcast translationLoaded lorsque le chargement est terminé
     * @param {Scope} scope
     */
    this.getTranslation = function(scope) {
        $resource('translations/translation_' + Parametres.getCurrentLanguage().code + '.json').get(function(data) {
            scope.translation = data;
            $rootScope.$broadcast('translationLoaded');
        });
    };

});