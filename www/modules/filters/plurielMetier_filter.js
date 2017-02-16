'use strict';

/**
 * Met un nom de métier au pluriel.
 * @ngdoc filters
 * @memberof avalanche
 * @name plurielMetier
 */
angular.module('myApp').filter('plurielMetier', function() {

     /**
     * @memberof plurielMetier
     * @func plurielMetierFilter
     */
    return function(input) {
        if(input == 'CRS') return input;
        else return input + 's';
    }
});