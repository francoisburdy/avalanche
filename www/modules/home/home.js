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
        var html = historiqueAsHtml();
        console.log(html);
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);
    }

    function historiqueAsHtml() {
        var operations = Operation.getJournaux();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>Rapport des opérations</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
        for (let o of operations){
            html += operationAsHtml(o) + "<br /><hr />";
        }
        html += "</body></html>";

        return html.escape();
    }

    function currentOperationAsHtml() {
        var operation = Operation.getJournal();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>Rapport des opérations</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
        html += operationAsHtml(operation) + "<br /><hr />";
        html += "</body></html>";

        return html.escape();
    }

    function operationAsHtml(o) {
        var date = $filter('date')(o.beginDate, 'dd/MM/yyyy');
        var dateDebut = $filter('date')(o.beginDate, 'dd/MM/yyyy, HH:mm');
        var dateFin = $filter('date')(o.endDate, 'dd/MM/yyyy, HH:mm');
        var heureFin = $filter('date')(o.endDate, 'HH:mm');

        var html = "<div><div><h3>"+o.nom+" "+date+"</h3><div>"; //titre + debut details operation
        html += '<p>Opération débutée le '+dateDebut+ ' et terminée le '+dateFin+'.</p>';
        html += '<p>Cette opération a impliqué '+o.nbVictimes+' victimes et '+o.nbPersonnels+' personnels.</p>';

        var evts = o.evenements;
        evts.sort(function(a, b){ return new Date(a.date) - new Date(b.date); });

        for(let evt of evts) html += '<div>'+evt.texte+'</div>';
        html += "<p><em>L'opération à été marquée comme terminée à " + heureFin + "</em></p>";
        html += "</div>";
        return html;
    }


    String.prototype.escape = function(){
        return this.replace(/[éèàêôûùç€°]/g, function(a) {
            return '&#'+a.charCodeAt(0)+';';
        });
    }



    

});
