'use strict';

angular.module('myApp').filter('lowerMetier', function() {
    return function(input) {
		/*if(input != 'CRS') */return input + 's';
		//else return input;
    }
});