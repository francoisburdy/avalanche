'use strict';

angular.module('myApp').controller('ParametresCtrl', function($scope, Parametres, Translation) {
    Translation.getTranslation($scope);

    $scope.metiers = Parametres.getMetiers();
    $scope.victimeStatus = Parametres.getVictimeStatus();
    $scope.victimeSituation = Parametres.getVictimeSituations();
    $scope.languages = Parametres.getLanguages();
    $scope.language = Parametres.getCurrentLanguage();
    
    $scope.changeLanguage = function(lang) {
        Parametres.setLanguage(lang);
    }

    $scope.updateLastClicked = function(index) {
        $scope.lastClickedIndex = index;
    }

    $scope.addMetier = function(color, metier) {
        Parametres.addMetier({libelle: metier, bg: color, text: '#000'});
    } 

    $scope.removeMetier = function(metier) {
        // TODO : vérifier qu'il n'y a aucun intervenant pour ce métier dans l'opération courante
        var i = 0;
        while ($scope.metiers[i].libelle != metier && i<$scope.metiers.length) i++;
        
        if (i<$scope.metiers.length)
            Parametres.removeMetier($scope.metiers[i]);
        else 
            console.log("Ce métier n'existe pas dans la liste des métiers.");
        
        Parametres.removeMetier(metier);
    }

    $scope.modifyMetier = function(color, metier) {
        Parametres.modifyMetier({libelle: metier, bg: color, text: '#000' });
    }
    
    $scope.options = [
        '#FFF', '#FFA773', '#FFD180', '#FFFF8D', '#CFD8DC', '#80D8FF', 
        '#A7FFEB', '#E969A8', '#6996D3', '#CCFF90', '#5FD2B5', '#FF8A80'
    ];

    $scope.$on('langUpdated', function(event) {
        $scope.language = Parametres.getCurrentLanguage();
    });

    $scope.$on('metiersUpdated', function(event) {
        $scope.metiers = Parametres.getMetiers();
    });


});