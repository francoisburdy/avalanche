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
            {libelle: 'Impliquée', code: 'I', bg: '#fff', text: '#333'},
            {libelle: 'Urgence relative', code: 'UR', bg: 'yellow', text: '#000'},
            {libelle: 'Urgence absolue', code: 'UA', bg: 'red', text: '#fff'},
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

    this.addMetier = function(metier) {
        if($localStorage.metiers) {
            $localStorage.metiers.push(metier);
            $rootScope.$broadcast('metiersUpdated');
        } else {
            console.log("$localStorage.metiers n'est pas iniatilisé.");
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
            {libelle: 'Pompiers', bg: 'red', text: '#fff'},
            {libelle: 'Pisteurs', bg: 'purple', text: '#fff'},
            {libelle: 'Moniteurs', bg: 'yellow', text: '#000'},
            {libelle: 'Gendarmes', bg: 'darkblue', text: '#fff'},
            {libelle: 'CRS', bg: 'lightblue', text: '#fff'},
            {libelle: 'Secouristes', bg: 'green', text: '#fff'}
        ];
    }
});
