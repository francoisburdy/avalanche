'use strict';

angular.module('myApp').controller('ExportPDFCtrl', function($scope, $location, Operation) {
  	
	$scope.journaux = Operation.getJournaux();

});
 