'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $location, Operation,$templateCache) {
  	$scope.createOperation = function() {
  		Operation.createOperation();
  		$location.url('/dashboard');
  	}

  	$scope.historique = function() {
  		$location.url('historique');
  	}

  	$scope.exportPdf = function() {
  		var template = $templateCache.get('exportPDF.html');
  		console.log(template);
  		pdf.htmlToPDF({
            //url: "www/modules/export/exportPDF.html",
            data: template,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);
  	}
});
