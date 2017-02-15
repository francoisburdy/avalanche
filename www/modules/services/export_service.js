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
        var now = $filter('date')(new Date(), $scope.translation.dateFormat + ' ' + $scope.translation.journal.at + ' ' + $scope.translation.hourFormat);

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>' + $scope.translation.export.historyReportTitle + '</h1>';
        html += '<div style="text-align:right"><em>' + $scope.translation.export.generated + ' ' + now +'</em></div>';
        for (let o of operations){
            html += this.operationAsHtml(o, $scope) + "<br /><hr />";
        }
        html += "</body></html>";

        return html.escape();
    }

    this.currentOperationAsHtml = function($scope) {
        let o = Operation.getCurrentJournal();
        var now = $filter('date')(new Date(), $scope.translation.dateFormat + ' ' + $scope.translation.journal.at + ' ' + $scope.translation.hourFormat);

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>' + $scope.translation.export.temporaryReport + '</h1>';
        html += '<div style="text-align:right"><em>' + $scope.translation.export.generated + ' ' + now + '</em></div>';
		html += this.operationAsHtml(o, $scope) + "<br /><hr />";
        html += "</body></html>";

        return html.escape();
    }

    this.operationAsHtml = function(o, $scope) {
        var date = $filter('date')(o.beginDate, $scope.translation.dateFormat);
        var dateDebut = $filter('date')(o.beginDate, $scope.translation.dateFormat + ', ' + $scope.translation.hourFormat);
        var dateFin = $filter('date')(o.endDate, $scope.translation.dateFormat + ', ' + $scope.translation.hourFormat);
        var heureFin = $filter('date')(o.endDate, $scope.translation.hourFormat);
        var heureNow = $filter('date')(new Date(), $scope.translation.hourFormat);

        var html = "<div><div><h3>" + o.nom + " " + date + "</h3><div>"; //titre + debut details operation
        html += '<p>' + $scope.translation.journal.operationStarted + ' ' + dateDebut + '.</p>';
        html += '<p>' + $scope.translation.journal.implicated + ' ' + o.nbVictimes + ' ' + $scope.translation.export.victimesAnd + ' ' + o.nbPersonnels + ' ' + $scope.translation.export.personnels + '.</p>';

        for(let evt of o.evenements) html += '<div>' + evt.texte + '</div>';
        
        if(heureFin)
        	html += "<p><em>" + $scope.translation.export.marquedFinished + " " + heureFin + "</em></p>";
        else 
        	html += "<p><em>" + $scope.translation.export.at + " " + heureNow + ", " + $scope.translation.export.notMarquedFinished + ".</em></p>";

        html += "</div>";
        return html;
    }

    String.prototype.escape = function(){
        return this.replace(/[éèàêôûùç€°]/g, function(a) {
            return '&#'+a.charCodeAt(0)+';';
        });
    }

});