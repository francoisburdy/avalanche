angular.module('myApp').service('Export', function($filter, Operation) {
    
    this.exportAllOperation = function($scope) {
        var html = this.historiqueAsHtml($scope);
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "share"
        }, null, null);
    }

    this.exportCurrentOperation = function($scope) {
        var html = this.currentOperationAsHtml($scope);
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "share"
        }, null, null);
    }

    this.historiqueAsHtml = function($scope) {
        var operations = Operation.getJournaux();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>' + $scope.translation.export.historyReportTitle + '</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
        for (let o of operations){
            html += this.operationAsHtml(o, $scope) + "<br /><hr />";
        }
        html += "</body></html>";

        return html.escape();
    }

    this.currentOperationAsHtml = function($scope) {
        let o = Operation.getCurrentJournal();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>Rapport temporaire d\'opération</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
		html += this.operationAsHtml(o, $scope) + "<br /><hr />";
        html += "</body></html>";

        return html.escape();
    }

    this.operationAsHtml = function(o, $scope) {
        var date = $filter('date')(o.beginDate, 'dd/MM/yyyy');
        var dateDebut = $filter('date')(o.beginDate, 'dd/MM/yyyy, HH:mm');
        var dateFin = $filter('date')(o.endDate, 'dd/MM/yyyy, HH:mm');
        var heureFin = $filter('date')(o.endDate, 'HH:mm');
        var heureNow = $filter('date')(new Date(), 'HH:mm');

        var html = "<div><div><h3>"+o.nom+" "+date+"</h3><div>"; //titre + debut details operation
        html += '<p>Opération débutée le '+dateDebut+ '.</p>';
        html += '<p>Cette opération a impliqué '+o.nbVictimes+' victimes et '+o.nbPersonnels+' personnels.</p>';

        for(let evt of o.evenements) html += '<div>'+evt.texte+'</div>';
        
        if(heureFin)
        	html += "<p><em>L'opération à été marquée comme terminée à " + heureFin + "</em></p>";
        else 
        	html += "<p><em>&Agrave; " + heureNow + ", l'opération n'est pas marquée comme terminée.</em></p>";

        html += "</div>";
        return html;
    }

    String.prototype.escape = function(){
        return this.replace(/[éèàêôûùç€°]/g, function(a) {
            return '&#'+a.charCodeAt(0)+';';
        });
    }

});