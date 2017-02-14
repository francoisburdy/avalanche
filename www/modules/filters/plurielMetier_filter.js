'use strict';

angular.module('myApp').filter('plurielMetier', function() {
    return function(input) {
		if(input == 'CRS') return input;
		else return input + 's';
    }
});