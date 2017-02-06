angular.module('myApp').service('Parametres', function($localStorage, $rootScope) {
    
    this.getVictimeStatus = function() {
        if(!$localStorage.victimeStatus) this.createDefaultVictimeStatus();
        return $localStorage.victimeStatus;
    }

    this.addVictimeStatus = function(newStatus) {
        if($localStorage.victimeStatus) {
            $localStorage.victimeStatus.push(newStatus);
        } else {
            console.log("$localStorage.victimeStatus n'est pas iniatilisé.");
        }
    }

    this.removeStatus = function(status) {
        var index = $localStorage.victimeStatus.indexOf(status);
        if(index == -1) console.log("Error : Parametres does not contain this status");
        else $localStorage.victimeStatus.splice(index, 1);        
    }

    this.createDefaultVictimeStatus = function() {
        $localStorage.victimeStatus = [
            {libelle: 'Impliquée', code: 'I', bg: '#fff', text: '#333'},
            {libelle: 'Urgence relative', code: 'UR', bg: 'yellow', text: '#000'},
            {libelle: 'Urgence absolue', code: 'UA', bg: 'red', text: '#fff'},
            {libelle: 'Décédée', code: 'DCD', bg: '#000', text: '#fff'}
        ];
    }
});
