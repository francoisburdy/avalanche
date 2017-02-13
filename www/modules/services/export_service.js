angular.module('myApp').service('Export', function($filter, Operation) {
    
    this.exportAllOperation = function() {
        var html = this.historiqueAsHtml();
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, null, null);
    }

    this.exportCurrentOperation = function() {
        var html = this.currentOperationAsHtml();
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, null, null);
    }

    this.historiqueAsHtml = function() {
        var operations = Operation.getJournaux();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>Rapport des opérations</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
        for (let o of operations){
            html += this.operationAsHtml(o) + "<br /><hr />";
        }
        html += "</body></html>";

        return html.escape();
    }

    this.currentOperationAsHtml = function() {
        var operation = Operation.getCurrentJournal();
        var now = $filter('date')(new Date(), 'dd/MM/yyyy à HH:mm');

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>Rapport des opérations</h1>';
        html += '<div style="text-align:right"><em>Généré le '+ now +'</em></div>';
        html += this.operationAsHtml(operation) + "<br /><hr />";
        html += "</body></html>";

        return html.escape();
    }

    this.operationAsHtml = function(o) {
        var date = $filter('date')(o.beginDate, 'dd/MM/yyyy');
        var dateDebut = $filter('date')(o.beginDate, 'dd/MM/yyyy, HH:mm');
        var dateFin = $filter('date')(o.endDate, 'dd/MM/yyyy, HH:mm');
        var heureFin = $filter('date')(o.endDate, 'HH:mm');
        var heureNow = $filter('date')(new Date(), 'HH:mm');

        var html = "<div><div><h3>"+o.nom+" "+date+"</h3><div>"; //titre + debut details operation
        html += '<p>Opération débutée le '+dateDebut+ ' et terminée le '+dateFin+'.</p>';
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