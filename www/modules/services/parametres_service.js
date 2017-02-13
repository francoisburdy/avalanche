angular.module('myApp').service('Parametres', function($localStorage, $rootScope) {
    
    /************************
     * STATUTS DES VICTIMES *
     ***********************/ 
    this.getVictimeStatus = function() {
        if(!$localStorage.victimeStatus) this.createDefaultVictimeStatus();
        return $localStorage.victimeStatus;
    }

    this.addVictimeStatus = function(newStatus) {
        if($localStorage.victimeStatus) {
            $localStorage.victimeStatus.push(newStatus);
            $rootScope.$broadcast('victimesUpdated');
        } else {
            console.log("$localStorage.victimeStatus n'est pas iniatilisé.");
        }
    }

    this.removeVictimeStatus = function(status) {
        var index = $localStorage.victimeStatus.indexOf(status);
        if(index == -1) console.log("Ce statut n'existe pas dans la liste des statuts.");
        else {
            $localStorage.victimeStatus.splice(index, 1);
            $rootScope.$broadcast('victimesUpdated');
        }   
    }

    this.createDefaultVictimeStatus = function() {
        $localStorage.victimeStatus = [
            {libelle: 'Inconnu', code: '?', bg: '#fff', text: '#333'},
            {libelle: 'Indemne', code: 'I', bg: '#DCDDDE', text: '#333'},
            {libelle: 'Urgence relative', code: 'UR', bg: '#fffd36', text: '#000'},
            {libelle: 'Urgence absolue', code: 'UA', bg: '#b30000', text: '#fff'},
            {libelle: 'Décédée', code: 'DCD', bg: '#000', text: '#fff'}
        ];
    }

    this.defaultStatus = function() {
        if(!$localStorage.victimeStatus){
            this.createDefaultVictimeStatus();
        }
        return $localStorage.victimeStatus[0];
    }

    /***************************
     * SITUATIONS DES VICTIMES *
     **************************/ 
    this.getVictimeSituations = function() {
        if(!$localStorage.victimeSituations) this.createDefaultVictimeSituations();
        return $localStorage.victimeSituations;
    }

    this.addVictimeSituation = function(newSituation) {
        if($localStorage.victimeSituations) {
            $localStorage.victimeSituations.push(newSituation);
            $rootScope.$broadcast('victimesUpdated');
        } else {
            console.log("$localStorage.victimeSituation n'est pas iniatilisé.");
        }
    }

    this.removeVictimeSituation = function(situation) {
        var index = $localStorage.victimeSituations.indexOf(situation);
        if(index == -1) console.log("Cette situation n'existe pas dans la liste des situations.");
        else {
            $localStorage.victimeSituations.splice(index, 1);
            $rootScope.$broadcast('victimesUpdated');
        }   
    }

    this.createDefaultVictimeSituations = function() {
        $localStorage.victimeSituations = [
            'Inconnue',
            'Impliquée',
            'Désensevelie',
            'Ensevelie',
            'Évacuée'
        ];
    }

    this.defaultSituation = function() {
        return 'Inconnue';
    }

    /************************
     *    CORPS DE METIER   *
     ***********************/ 
    this.getMetiers = function() {
        if(!$localStorage.metiers) this.createDefaultMetiers();
        return $localStorage.metiers;
    }

    this.getMetier = function(lib) {
        if(!$localStorage.metiers) this.createDefaultMetiers();
        for (var i = 0; i < $localStorage.metiers.length; i++) {
            if($localStorage.metiers[i].libelle == lib) return $localStorage.metiers[i];
        }
        return null;
    }

    this.addMetier = function(metier) {
        if($localStorage.metiers) {
            $localStorage.metiers.push(metier);
            $rootScope.$broadcast('metiersUpdated');
        } else {
            console.log("$localStorage.metiers n'est pas iniatilisé.");
        }
    }

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

    this.removeMetier = function(metier) {
        var index = $localStorage.metiers.indexOf(metier);
        if(index == -1) console.log("Ce métier n'existe pas dans la liste des métiers.");
        else {
            $localStorage.metiers.splice(index, 1);
            $rootScope.$broadcast('metiersUpdated');
        }       
    }

    this.createDefaultMetiers = function() {
        $localStorage.metiers = [
            {libelle: 'Pompier', bg: '#b30000', text: '#fff'},
            {libelle: 'Pisteur', bg: '#8b4ca0', text: '#fff'},
            {libelle: 'Moniteur', bg: '#ffdb4d', text: '#000'},
            {libelle: 'Gendarme', bg: '#001a66', text: '#fff'},
            {libelle: 'CRS', bg: '#b3ccff', text: '#000'},
            {libelle: 'Secouriste', bg: '#54a754', text: '#fff'}
        ];
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
