'use strict';

/**
 * Met un nom de métier en minuscule.
 * @ngdoc filters
 * @memberof avalanche
 * @name lowerMetier
 */
angular.module('myApp').filter('lowerMetier', function() {
    /**
     * @memberof lowerMetier
     * @func lowerMetierFilter
     */
    return function(input) {
        if(input != 'CRS') return input.toLowerCase();
        else return input;
    }
});