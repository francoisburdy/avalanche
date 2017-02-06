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

    this.removeStatus = function(status) {
        var index = $localStorage.victimeStatus.indexOf(status);
        if(index == -1) console.log("Ce statut n'existe pas dans la liste des statuts.");
        else {
            $localStorage.victimeStatus.splice(index, 1);
            $rootScope.$broadcast('victimesUpdated');
        }   
    }

    this.createDefaultVictimeStatus = function() {
        $localStorage.victimeStatus = [
            {libelle: 'Impliquée', code: 'I', bg: '#fff', text: '#333'},
            {libelle: 'Urgence relative', code: 'UR', bg: 'yellow', text: '#000'},
            {libelle: 'Urgence absolue', code: 'UA', bg: 'red', text: '#fff'},
            {libelle: 'Décédée', code: 'DCD', bg: '#000', text: '#fff'}
        ];
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
            {libelle: 'Pompiers', bg: '#fff', text: '#333'},
            {libelle: 'Pisteurs', bg: '#fff', text: '#333'},
            {libelle: 'Moniteurs de ski', bg: '#fff', text: '#333'},
            {libelle: 'Gendarmes', bg: 'yellow', text: '#000'},
            {libelle: 'CRS', bg: 'red', text: '#fff'},
            {libelle: 'Secouristes', bg: '#000', text: '#fff'}
        ];
    }
});
