'use strict';

/**
 * @memberof avalanche
 * @ngdoc services
 * @name Export
 * @description 
 *  Service dédié à l'export PDF des opérations. Il contient les méthodes
 *  permettant de construire les templates HTML des journaux construits dans
 *  le service Operation   
 */
angular.module('myApp').service('Export', function($filter, Operation) {
    
    /**
     * Exporte toutes les opérations stockées dans l'application sous forme d'un journal PDF.
     * @memberof Export
     * @func exportAllOperation
     * @param {Scope} scope Scope du controleur contenant les données de langues
     */
    this.exportAllOperation = function(scope) {
        var html = this.historiqueAsHtml(scope);
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "share"
        }, null, null);
    }

    /**
     * Exporte un rapport temporaire de l'opération courante (non encore terminée) sous forme
     * d'un journal PDF.
     * @memberof Export
     * @func exportCurrentOperation
     * @param {Scope} scope Scope du controleur contenant les données de langues
     */
    this.exportCurrentOperation = function(scope) {
        var html = this.currentOperationAsHtml(scope);
        pdf.htmlToPDF({
            data: html,
            documentSize: "A4",
            landscape: "portrait",
            type: "share"
        }, null, null);
    }

    /**
     * Créer un DOM HTML de toutes les opérations de l'historique, sous forme de chaine.
     * Ce DOM est destiné à être injecté dans le convertisseur PDF.
     * @memberof Export
     * @func historiqueAsHtml
     * @returns {string} Un DOM HTML contenant tous les évènements de chaque opérations de l'historique,
     * sous forme de chaine.
     */
    this.historiqueAsHtml = function(scope) {
        var operations = Operation.getJournaux(scope);
        var nowDate = $filter('date')(new Date(), scope.translation.dateFormat);
        var nowTime = $filter('date')(new Date(), scope.translation.hourFormat);

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>' + scope.translation.export.historyReportTitle + '</h1>';
        html += '<div style="text-align:right"><em>' + scope.translation.export.generated + ' ' + nowDate + ' ' + scope.translation.journal.at + ' ' + nowTime + '</em></div>';
        for (let o of operations){
            html += this.operationAsHtml(o, scope) + "<br /><hr />";
        }
        html += "</body></html>";

        return html.escape();
    }

    /**
     * Créer un DOM HTML de l'opération courante (non-encore terminée).
     * Ce DOM est destiné à être injecté dans le convertisseur PDF.
     * @memberof Export
     * @func currentOperationAsHtml
     * @returns {string} Un DOM HTML des évènements de l'opération courante.
     */
    this.currentOperationAsHtml = function(scope) {
        let o = Operation.getCurrentJournal(scope);
        var nowDate = $filter('date')(new Date(), scope.translation.dateFormat);
        var nowTime = $filter('date')(new Date(), scope.translation.hourFormat);

        var html = '<!doctype html><html lang="fr"><head>';
        html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
        html += '</head>';
        html += '<body><h1>' + scope.translation.export.temporaryReport + '</h1>';
        html += '<div style="text-align:right"><em>' + scope.translation.export.generated + ' ' + nowDate + ' ' + scope.translation.journal.at + ' ' + nowTime + '</em></div>';
		html += this.operationAsHtml(o, scope) + "<br /><hr />";
        html += "</body></html>";

        return html.escape();
    }

    /**
     * Construit le rapport d'une opération, formaté en HTML
     * @memberof Export
     * @func operationAsHtml
     * @param {Operation} o L'opération à construire
     * @param {Scope} scope Scope du controleur, contenant les données de langues.
     * @returns {string} Journal des évènenement d'une opération, formaté en HTML.
     */
    this.operationAsHtml = function(o, scope) {
        var date = $filter('date')(o.beginDate, scope.translation.dateFormat);
        var dateDebut = $filter('date')(o.beginDate, scope.translation.dateFormat + ', ' + scope.translation.hourFormat);
        var dateFin = $filter('date')(o.endDate, scope.translation.dateFormat + ', ' + scope.translation.hourFormat);
        var heureFin = $filter('date')(o.endDate, scope.translation.hourFormat);
        var heureNow = $filter('date')(new Date(), scope.translation.hourFormat);

        var html = "<div><div><h3>" + o.nom + "</h3><div>"; //titre + debut details operation
        html += '<p>' + scope.translation.journal.operationStarted + ' ' + dateDebut + '.</p>';
        html += '<p>' + scope.translation.journal.implicated + ' ' + o.nbVictimes + ' ' + scope.translation.export.victimesAnd + ' ' + o.nbPersonnels + ' ' + scope.translation.export.personnels + '.</p>';

        for(let evt of o.evenements) html += '<div>' + evt.texte + '</div>';
        
        if(heureFin)
        	html += "<p><em>" + scope.translation.export.marquedFinished + " " + heureFin + "</em></p>";
        else 
        	html += "<p><em>" + scope.translation.export.atMaj + " " + heureNow + ", " + scope.translation.export.notMarquedFinished + ".</em></p>";

        html += "</div>";
        return html;
    }

    String.prototype.escape = function(){
        return this.replace(/[ÀÉéèàêôûùç€°]/g, function(a) {
            return '&#'+a.charCodeAt(0)+';';
        });
    }

});