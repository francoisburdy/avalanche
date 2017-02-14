
/**
 * @function Operation
 * @memberOf angular_module.myApp
 * @description Service gérant toutes les informations relatives à l'opération courante et à l'historisation des données.
 */
angular.module('myApp').service('Operation', function($localStorage, $rootScope, $location, $filter) {
    
    this.getOperation = function() {
        return $localStorage.operation;
    }

    this.createOperation = function(nomOperation) {
        if($localStorage.operation == null) {
            $localStorage.operation = {
                nom: nomOperation,
                beginDate: new Date(),
                endDate: null,
                personnels: [],
                victimes: []
            };
            $rootScope.$broadcast('operationUpdated');
        } else {
            console.log('Création impossible : this.operation existe déjà.');
        }
    }

    this.terminate = function() {
        $localStorage.operation.endDate = new Date();
        this.pushHistorique($localStorage.operation);
        $localStorage.operation = null;
        $rootScope.$broadcast('operationUpdated');
    }

    this.addTmpPersonnel = function(personnel) {
        if(!this.isPersonnelNumberAvailable(personnel.numero)) {
            navigator.notification.alert('Il y a déjà un personnel portant ce numéro', null, 'Numéro déjà utilisé', 'OK');
        } else {
            this.tmpPersonnel = personnel;
            $location.url('/confirmIntervenant');
        }
    }

    this.getTmpPersonnel = function() {
        if(!this.tmpPersonnel) return null;
        return this.tmpPersonnel;
    }

    this.cancelTmpPersonnel = function() {
        delete this.tmpPersonnel;
    }

    this.addPersonnel = function() {
        if($localStorage.operation.personnels.indexOf(this.tmpPersonnel) !== -1) {
            console.log("Error : operation already contains this personnel");
        } else {
            $localStorage.operation.personnels.push(this.tmpPersonnel);
            delete this.tmpPersonnel;
            $rootScope.$broadcast('operationUpdated');
        }
    }

    this.removePersonnel = function(personnel) {
        var index = $localStorage.operation.personnels.indexOf(personnel);
        if(index == -1) console.log("Error : Operation does not contain this personnel");
        else {
            $localStorage.operation.personnels.splice(index, 1);   
            $rootScope.$broadcast('operationUpdated');
        }
    }

    /* Retourne un personnel à partir de son numéro */
    this.getPersonnel = function(numero) {
        for(let personnel of $localStorage.operation.personnels) {
            if(personnel.numero == numero) return personnel; 
        }
    }

    /* Retourne la liste des personnels du métier passé en paramètre */
    this.getPersonnelsByMetier = function(libMetier) {
        let personnels = [];
        let pers = $localStorage.operation.personnels;
        for(let i = 0; i < pers.length; i++) {
            if(pers[i].metier.libelle == libMetier) personnels.push(pers[i]);
        }
        return personnels;
    }

    this.evacuatePersonnel = function(personnel) {
        personnel.endDate = new Date();
        $rootScope.$broadcast('operationUpdated');
    }

    this.addVictime = function(victime) {
        if($localStorage.operation.victimes.indexOf(victime) !== -1) console.log("Error : Operation already contains this victime")
        else if(!this.isVictimeNumberAvailable(victime.numero)) {
            navigator.notification.alert('Il y a déjà une victime portant ce numéro', null, 'Numéro déjà utilisé', 'OK');
        } else {
            $localStorage.operation.victimes.push(victime);
            $rootScope.$broadcast('operationUpdated');
            $location.url('/dashboard');
        }
    }

    this.evacuateVictime = function(victime) {
        victime.situation = 'Évacuée';
        victime.endDate = new Date();
        $rootScope.$broadcast('operationUpdated');
    }

    this.removeVictime = function(victime) {
        var index = $localStorage.operation.victimes.indexOf(victime);
        if(index == -1) console.log("Cette victime n'a pas été trouvée : elle ne peut pas être supprimée.");
        else {
            $localStorage.operation.victimes.splice(index, 1);
            $rootScope.$broadcast('operationUpdated');
        }
    }

    /* Génère un numéro inexistant pour une victime */
    this.generateVictimeNumber = function() {
        if($localStorage.operation.victimes.length == 0) {
            return 1;
        } else {
            var max = 1;
            for(let v of $localStorage.operation.victimes){
                if (v.numero > max) max = v.numero;
            }
            return max + 1;
        }
    }

    this.isVictimeNumberAvailable = function(num) {
        for(let v of $localStorage.operation.victimes)
            if(v.numero == num) return false;
        return true;
    }

    this.isPersonnelNumberAvailable = function(num) {
        for(let p of $localStorage.operation.personnels)
            if(p.numero == num && !p.endDate) return false;
        return true;
    }

    /* Retourne une victime à partir de son numéro */
    this.getVictime = function(numero) {
        for(let victime of $localStorage.operation.victimes) {
            if(victime.numero == numero) return victime; 
        }
    }


    /****************************
     * HISTORISATION DES DONNEES *
     ***************************/

    this.getJournaux = function() {
        var journaux = [];

        if($localStorage.historique) {
            for(let operation of $localStorage.historique) journaux.push(this.getJournal(operation)); 
        }
        return journaux;
    }

    this.getCurrentJournal = function() {
        return this.getJournal(this.getOperation());
    }

    this.getJournal = function(operation) {
        var journal = {
            nom: operation.nom,
            beginDate: operation.beginDate,
            endDate: operation.endDate,
            nbVictimes: operation.victimes.length,
            nbPersonnels: operation.personnels.length,
            evenements: []
        };

        for(let v of operation.victimes) {           
            var evDebut = {
                date: v.beginDate,
                texte: $filter('date')(v.beginDate, 'HH:mm') + ' : La victime n°' + v.numero + ' a été enregistrée.',
                type: 'entrée'
            };
            journal.evenements.push(evDebut);

            if(v.endDate != null) {
                var evFin = {
                    date: v.endDate,
                    texte: $filter('date')(v.endDate, 'HH:mm') + ' : La victime n°' + v.numero + ' a été évacuée.',               
                    type: 'sortie'
                };
                journal.evenements.push(evFin);
            }
        }

        for(let p of operation.personnels) {
            // TODO : journaliser les changement de mission
            var evDebut = {
                date : p.beginDate,
                texte :  $filter('date')(p.beginDate, 'HH:mm') +' : L\'intervenant ' + p.numero + ' (' + $filter('lowerMetier')(p.metier.libelle) + ') est entré sur zone.',
                type: 'entrée'  
            };
            journal.evenements.push(evDebut);

            if(p.endDate != null) {
                var evFin = {
                    date : p.endDate,
                    texte : $filter('date')(p.endDate, 'HH:mm') + ' : L\'intervenant ' + p.numero + ' (' + $filter('lowerMetier')(p.metier.libelle) + ') est sorti de la zone.',
                    type: 'sortie'
                }
                journal.evenements.push(evFin);
            }
        }
        
        journal.evenements = journal.evenements.sort(function(a, b){ return new Date(a.date) - new Date(b.date); });

        return journal;
    }

    this.pushHistorique = function(operation) {
        if(!$localStorage.historique) {
            $localStorage.historique = [];
        }
        $localStorage.historique.push(operation);
        $rootScope.$broadcast('operationUpdated');
    }
});
