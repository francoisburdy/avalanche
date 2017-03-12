'use strict';

/**
 * Service dédié à l'export PDF des opérations. Il contient les méthodes
 * permettant de construire les templates HTML des journaux construits dans
 * le service Operation.
 *
 * @memberof avalanche
 * @ngdoc services
 * @name Export
 * @param {service} $filter - native filter service
 * @param {service} Operation - Avalanche Operation service
 */
angular.module('myApp').service('Export', function ($filter, Operation) {

  /**
   * Exporte toutes les opérations stockées dans l'application sous forme d'un journal PDF.
   * @memberof Export
   * @func exportAllOperation
   * @param {scope} scope - Scope du controleur, contenant les données de langues.
   */
  this.exportAllOperation = function (scope) {
    let html = this.historiqueAsHtml(scope);
    pdf.htmlToPDF({
      data: html,
      documentSize: "A4",
      landscape: "portrait",
      type: "share"
    }, null, null);
  };

  /**
   * Exporte un rapport temporaire de l'opération courante (non encore terminée) sous forme
   * d'un journal PDF.
   * @memberof Export
   * @param {scope} scope - Scope du controleur, contenant les données de langues.
   * @func exportCurrentOperation
   */
  this.exportCurrentOperation = function (scope) {
    let html = this.currentOperationAsHtml(scope);
    pdf.htmlToPDF({
      data: html,
      documentSize: "A4",
      landscape: "portrait",
      type: "share"
    }, null, null);
  };

  /**
   * Créer un DOM HTML de toutes les opérations de l'historique, sous forme de chaine.
   * Ce DOM est destiné à être injecté dans le convertisseur PDF.
   * @memberof Export
   * @func historiqueAsHtml
   * @param {scope} scope - Scope du controleur, contenant les données de langues.
   * @returns {string} - Un DOM HTML contenant tous les évènements de chaque
   * opérations de l'historique, sous forme de chaine.
   */
  this.historiqueAsHtml = function (scope) {
    let operations = Operation.getJournaux(scope);
    let nowDate = $filter('date')(new Date(), scope.translation.dateFormat);
    let nowTime = $filter('date')(new Date(), scope.translation.hourFormat);

    let html = '<!doctype html><html lang="fr"><head>';
    html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
    html += '</head>';
    html += '<body><h1>' + scope.translation.export.historyReportTitle + '</h1>';
    html += '<div style="text-align:right"><em>' + scope.translation.export.generated + ' ' + nowDate + ' ' + scope.translation.journal.at + ' ' + nowTime + '</em></div>';
    for (let o of operations) {
      html += this.operationAsHtml(o, scope) + "<br /><hr />";
    }
    html += "</body></html>";

    return html.escape();
  };

  /**
   * Crée un DOM HTML de l'opération courante (non-encore terminée).
   * Ce DOM est destiné à être injecté dans le convertisseur PDF.
   * @memberof Export
   * @param {scope} scope - Scope du controleur, contenant les données de langues.
   * @func currentOperationAsHtml
   * @returns {string} - Un DOM HTML des évènements de l'opération courante.
   */
  this.currentOperationAsHtml = function (scope) {
    let o = Operation.getCurrentJournal(scope);
    let nowDate = $filter('date')(new Date(), scope.translation.dateFormat);
    let nowTime = $filter('date')(new Date(), scope.translation.hourFormat);

    let html = '<!doctype html><html lang="fr"><head>';
    html += '<style type="text/css">body{margin:1.8cm 2.3cm}</style>';
    html += '</head>';
    html += '<body><h1>' + scope.translation.export.temporaryReport + '</h1>';
    html += '<div style="text-align:right"><em>' + scope.translation.export.generated + ' ' + nowDate + ' ' + scope.translation.journal.at + ' ' + nowTime + '</em></div>';
    html += this.operationAsHtml(o, scope) + "<br /><hr />";
    html += "</body></html>";

    return html.escape();
  };

  /**
   * Construit le rapport d'une opération, formaté en HTML.
   * @memberof Export
   * @func operationAsHtml
   * @param {Operation} o - L'opération à convertir
   * @param {scope} scope - Scope du contrôleur, contenant les données de langues.
   * @returns {string} - Journal des évènenements d'une opération, formaté en HTML.
   */
  this.operationAsHtml = function (o, scope) {
    let date = $filter('date')(o.beginDate, scope.translation.dateFormat);
    let dateDebut = $filter('date')(o.beginDate, scope.translation.dateFormat + ', ' + scope.translation.hourFormat);
    let heureFin = $filter('date')(o.endDate, scope.translation.hourFormat);
    let heureNow = $filter('date')(new Date(), scope.translation.hourFormat);

    let html = "<div><div><h3>" + o.nom + "</h3><div>"; //titre + debut details operation
    html += '<p>' + scope.translation.journal.operationStarted + ' ' + dateDebut + '.</p>';
    html += '<p>' + scope.translation.journal.implicated + ' ' + o.nbVictimes + ' ' + scope.translation.export.victimesAnd + ' ' + o.nbPersonnels + ' ' + scope.translation.export.personnels + '.</p>';

    for (let evt of o.evenements) html += '<div>' + evt.texte + '</div>';

    if (heureFin)
      html += "<p><em>" + scope.translation.export.marquedFinished + " " + heureFin + "</em></p>";
    else
      html += "<p><em>" + scope.translation.export.atMaj + " " + heureNow + ", " + scope.translation.export.notMarquedFinished + ".</em></p>";

    html += "</div>";
    return html;
  };

  /**
   * Echappe les lettres accentuées d'une chaine de caractères.
   * @memberof JS helpers
   * @func String.escape
   * @returns {string} - Chaine échappée des caractères accentués
   */
  String.prototype.escape = function () {
    return this.replace(/[ÀÉéèàêôûùç€°]/g, function (a) {
      return '&#' + a.charCodeAt(0) + ';';
    });
  };

});