'use strict';

/**
 * @ngdoc filters
 * @memberof avalanche
 * @name lowerMetier
 * @desc
 * Met un nom de métier en minuscule.
 *  Injecter le service $filter dans le controleur pour utiliser les filtres
 */
angular.module('myApp').filter('lowerMetier', function () {

  /**
   * @memberof lowerMetier
   * @func $filter('lowerMetier')(input)
   * @params {string} input Métier à mettre en minuscule
   */
  return function (input) {
    if (input != 'CRS') return input.toLowerCase();
    else return input;
  }
});