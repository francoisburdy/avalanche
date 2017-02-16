'use strict';

/**
 * @memberof avalanche
 * @ngdoc services
 * @name Parametres
 * @description 
 *   Service Parametres
 */
angular.module('myApp').service('Parametres', function($localStorage, $rootScope) {
    
    /************************
     * STATUTS DES VICTIMES *
     ***********************/
     /**
      * @memberof Parametres
      * @func getVictimeStatus
      */
    this.getVictimeStatus = function() {
        if(!$localStorage.victimeStatus) this.createDefaultVictimeStatus();
        return $localStorage.victimeStatus;
    }

     /**
      * @memberof Parametres
      * @func addVictimeStatus
      */
    this.addVictimeStatus = function(newStatus) {
        if($localStorage.victimeStatus) {
            $localStorage.victimeStatus.push(newStatus);
            $rootScope.$broadcast('victimesUpdated');
        } else {
            console.log("$localStorage.victimeStatus n'est pas iniatilisé.");
        }
    }

     /**
      * @memberof Parametres
      * @func removeVictimeStatus
      */
    this.removeVictimeStatus = function(status) {
        var index = $localStorage.victimeStatus.indexOf(status);
        if(index == -1) console.log("Ce statut n'existe pas dans la liste des statuts.");
        else {
            $localStorage.victimeStatus.splice(index, 1);
            $rootScope.$broadcast('victimesUpdated');
        }   
    }

     /**
      * @memberof Parametres
      * @func createDefaultVictimeStatus
      */
    this.createDefaultVictimeStatus = function() {
        $localStorage.victimeStatus = [
            {libelle: 'Inconnu', code: '?', bg: '#fff', text: '#333'},
            {libelle: 'Indemne', code: 'I', bg: '#DCDDDE', text: '#333'},
            {libelle: 'Urgence relative', code: 'UR', bg: '#fffd36', text: '#000'},
            {libelle: 'Urgence absolue', code: 'UA', bg: '#b30000', text: '#fff'},
            {libelle: 'Décédée', code: 'DCD', bg: '#000', text: '#fff'}
        ];
    }

     /**
      * @memberof Parametres
      * @func defaultStatus
      */
    this.defaultStatus = function() {
        if(!$localStorage.victimeStatus){
            this.createDefaultVictimeStatus();
        }
        return $localStorage.victimeStatus[0];
    }

    /***************************
     * SITUATIONS DES VICTIMES *
     **************************/ 
     /**
      * @memberof Parametres
      * @func getVictimeSituations
      */
    this.getVictimeSituations = function() {
        if(!$localStorage.victimeSituations) this.createDefaultVictimeSituations();
        return $localStorage.victimeSituations;
    }

     /**
      * @memberof Parametres
      * @func addVictimeSituation
      */
    this.addVictimeSituation = function(newSituation) {
        if($localStorage.victimeSituations) {
            $localStorage.victimeSituations.push(newSituation);
            $rootScope.$broadcast('victimesUpdated');
        } else {
            console.log("$localStorage.victimeSituation n'est pas iniatilisé.");
        }
    }

     /**
      * @memberof Parametres
      * @func removeVictimeSituation
      */
    this.removeVictimeSituation = function(situation) {
        var index = $localStorage.victimeSituations.indexOf(situation);
        if(index == -1) console.log("Cette situation n'existe pas dans la liste des situations.");
        else {
            $localStorage.victimeSituations.splice(index, 1);
            $rootScope.$broadcast('victimesUpdated');
        }   
    }

     /**
      * @memberof Parametres
      * @func createDefaultVictimeSituations
      */
    this.createDefaultVictimeSituations = function() {
        $localStorage.victimeSituations = [
            'Inconnue',
            'Impliquée',
            'Ensevelie',
            'Désensevelie',
            'Évacuée'
        ];
    }

     /**
      * @memberof Parametres
      * @func defaultSituation
      */
    this.defaultSituation = function() {
        return 'Inconnue';
    }

    /************************
     *    CORPS DE METIER   *
     ***********************/ 
     /**
      * @memberof Parametres
      * @func getMetiers
      */
    this.getMetiers = function() {
        if(!$localStorage.metiers) this.createDefaultMetiers();
        return $localStorage.metiers;
    }
     /**
      * @memberof Parametres
      * @func getMetier
      */
    this.getMetier = function(lib) {
        if(!$localStorage.metiers) this.createDefaultMetiers();
        for (var i = 0; i < $localStorage.metiers.length; i++) {
            if($localStorage.metiers[i].libelle == lib) return $localStorage.metiers[i];
        }
        return null;
    }

     /**
      * @memberof Parametres
      * @func addMetier
      */
    this.addMetier = function(metier) {
        if($localStorage.metiers) {
            $localStorage.metiers.push(metier);
            $rootScope.$broadcast('metiersUpdated');
        } else {
            console.log("$localStorage.metiers n'est pas iniatilisé.");
        }
    }

     /**
      * @memberof Parametres
      * @func modifyMetier
      */
    this.modifyMetier = function(metier) {
        var i = 0;
        var metiers = $localStorage.metiers;
        while(i < metiers.length && metiers[i].libelle != metier.libelle) {
            i++;
        }
        if(metiers[i].libelle == metier.libelle) {
            $localStorage.metiers[i].bg = metier.bg;
        }
    }

     /**
      * @memberof Parametres
      * @func removeMetier
      */
    this.removeMetier = function(metier) {
        var index = $localStorage.metiers.indexOf(metier);
        if(index == -1) console.log("Ce métier n'existe pas dans la liste des métiers.");
        else {
            $localStorage.metiers.splice(index, 1);
            $rootScope.$broadcast('metiersUpdated');
        }       
    }

     /**
      * @memberof Parametres
      * @func createDefaultMetiers
      */
    this.createDefaultMetiers = function() {
        $localStorage.metiers = [
            {libelle: 'CRS', bg: '#b3ccff', text: '#000'},
            {libelle: 'Pisteur', bg: '#8b4ca0', text: '#fff'},
            {libelle: 'Moniteur', bg: '#ffdb4d', text: '#000'},
            {libelle: 'Gendarme', bg: '#001a66', text: '#fff'},
            {libelle: 'Pompier', bg: '#b30000', text: '#fff'},
            {libelle: 'Secouriste', bg: '#54a754', text: '#fff'}
        ];
    }

    /*****************
    *    LANGUES   *
    ****************/ 
    this.createDefaultLanguages = function(){
        $localStorage.languages = [ {code:'fr', intitule:'Français'}, {code:'en', intitule: 'English' }];
    }

    this.getCurrentLanguage = function(){
        if(!$localStorage.language) {
            this.setLanguage(this.getLanguages()[0]);
        }
        return $localStorage.language;
    }

    this.getLanguages = function(){
        if (!$localStorage.languages) this.createDefaultLanguages();
        return $localStorage.languages;
    }

    this.setLanguage = function(language){
        $localStorage.language = language;
        $rootScope.$broadcast('langUpdated');
    }

    /*****************
     *    MISSIONS   *
     ****************/ 
    this.getMissions = function() {
        if(!$localStorage.missions) this.createDefaultMissions();
        return $localStorage.missions;
    }

    this.createDefaultMissions = function() {
        $localStorage.missions = [
            'Recherche Chien',
            'Recherche DVA',
            'Recherche RECCO',
            'DSM',
            'COS CRS',
            'COS pisteur',
            'COS PGHM',
            'COS pompier',
            'Constatation judiciaire',
            'Secrétaire',
            'Pelletage',
            'Sondage',
            'Evacuation victime',
            'Prise en charge victime',
            'Balisage avalanche',
            'Guetteur',
            'Médicalisation',
            '-- Autre --'
        ];
    }
});
