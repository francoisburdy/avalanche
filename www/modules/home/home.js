'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $location, $route, $filter, Operation, Global, Translation, Parametres) {
    
    var language = Parametres.getCurrentLanguage();
    Translation.getTranslation($scope, language);

    $scope.createOperation = function() {
        navigator.notification.prompt(
            'Saisissez le nom de la nouvelle opération',
            function(results) {
                if(results.buttonIndex == 1 && results.input1){
                    console.log('Création d\'une nouvelle opération');
                    Operation.createOperation(results.input1);
                    $route.reload();
                }
            }, 
            'Nouvelle opération',
            ['Créer', 'Annuler'],
            'Avalanche du ' + $filter('date')(new Date(), 'dd/MM/yyyy')
        );
    }

    $scope.historique = function() {
        $location.url('historique');
    }

    /**
     * Vide le contenu du local storage
     */
    $scope.purgeStorage = function() {
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir SUPPRIMER pour confirmer', 
            function(results) {
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "supprimer") {
                    console.log('Purge all data !');
                    Global.purgeData();
                    //$location.url('/home');
                } else {
                    console.log('Purge annulée')
                }
            }, 
            'Supprimer les données',
            ['Annuler', 'Supprimer']
        );
    }

    /**
     * Vide le contenu du localStorage et charge les données de démonstration de l'application
     */
    $scope.loadDemoData = function() {
        console.log('Chargement des données de test ...');
        navigator.notification.prompt(
            'Cette action est irréversible !\nSaisir DEMO pour confirmer', 
            function(results) {
                if(results.buttonIndex == 2 && results.input1.toLowerCase() == "demo") {
                    console.log('Charger les données de démo !');
                    Global.purgeData();
                    Global.loadDemoData();
                } else {
                    console.log('Chargement données démo annulé !');
                }
            }, 
            'Données de démo',
            ['OK', 'Annuler']
        );
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

        for(let evt of o.evenements) html += '<div>'+evt.texte+'</div>';
        html += "<p><em>L'opération à été marquée comme terminée à " + heureFin + "</em></p>";
        html += "</div>";
        return html;
    }


    String.prototype.escape = function(){
        return this.replace(/[éèàêôûùç€°]/g, function(a) {
            return '&#'+a.charCodeAt(0)+';';
        });
    }

    /**
     * Ferme l'application après avoir demandé la confirmation
     */
    $scope.exitApp = function(){
        Global.exitApp();
    }    

});
