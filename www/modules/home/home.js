'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $location, $http, $filter, Operation) {
  	$scope.createOperation = function() {
  		Operation.createOperation();
  		$location.url('/dashboard');
  	}

  	$scope.historique = function() {
  		$location.url('historique');
  	}

  	$scope.exportPdf = function() {
      var html = parserHtml();
      console.log(html);
  		pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);
  	}

    function parserHtml(){
      var operation = Operation.getJournaux();
      var html = "";

      html += '<div><span>Historique des missions</span></div>';
      for (var i=0; i<operation.length; i++){
        html += "<div>"; //global journaux
        var j = operation[i];
        var date = $filter('date')(j.beginDate, 'dd/MM/yyyy');
        var dateDebut = $filter('date')(j.beginDate, 'dd/MM/yyyy, hh:mm');
        var dateFin = $filter('date')(j.endDate, 'dd/MM/yyyy, hh:mm');

        html += "<h3>"+j.nom+" "+date+"</h3><div>"; //titre + debut details operation
        html += '<p> Opération débutée le '+dateDebut+ ' et terminée le '+dateFin+'.</p>';
        html += '<p>Cette opération a impliqué '+j.nbVictimes+' victimes et '+j.nbPersonnels+' personnels.</p>';

        var data = j.evenements;
        data.sort(function(a, b){
          return new Date(b.date) - new Date(a.date);
        });

        for(var y=0; y<data.length; y++){
          html += '<div>'+data[y].texte+'</div>';
        }
        html += "</div></div>"; //global journaux + details operation
      }

      return html;
    }
});
