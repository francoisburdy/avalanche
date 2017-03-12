'use strict';

/**
 * @ngdoc filters
 * @memberof avalanche
 * @name plurielMetier
 * @desc
 *  Met un nom de métier au pluriel.
 *  Injecter le service $filter dans le controleur pour utiliser les filtres
 */
angular.module('myApp').filter('plurielMetier', function () {

  /**
   * @memberof plurielMetier
   * @func $filter('plurielMetier')(input)
   * @params {string} input Métier à mettre au pluriel
   */
  return function (input) {
    if (input == 'CRS') return input;
    else return input + 's';
  }
});