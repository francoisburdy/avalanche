'use strict';

/**
 * @memberof avalanche
 * @ngdoc services
 * @name Operation
 * @param $localStorage {service} native localStorage service
 * @param $rootScope {service} native rootScope service
 * @param $location {service} native location service
 * @param $filter {service} native filter service
 * @description 
 *   Service Operation
 */
angular.module('myApp').service('Operation', function($localStorage, $rootScope, $location, $filter) {
    
    /**
      * Retourne l'opération courante en mémoire dans le localStorage de la WebWiew.
      * @memberof Operation
      * @func getOperation
      * @returns {Operation} Opération courante en JSON, null sinon
      */
    this.getOperation = function() {
        return $localStorage.operation;
    }

    /**
      * Crée une nouvelle opération et la persiste dans le localStorage. 
      * Il ne doit pas y avoir d'opération en cours.
      * @memberof Operation
      * @param {string} nomOperation Nom de l'opération à créer.
      * @func createOperation
      */
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

    /**
      * Termine l'opération courante et l'empile dans l'historique.
      * Après execution, $localStorage.operation est null. 
      * @memberof Operation
      * @func terminate
      */
    this.terminate = function() {
        $localStorage.operation.endDate = new Date();
        this.pushHistorique($localStorage.operation);
        $localStorage.operation = null;
        $rootScope.$broadcast('operationUpdated');
    }

    /**
      * Persiste un intervenant temporaire, celui-ci n'est pas persisté, et redirige sur /confirmIntervenant.
      * S'il existe déjà un intervenant portant ce numéro dans l'opération courante, une modale est déclanchée.
      * @memberof Operation
      * @see addPersonnel
      * @param {Personnel} personnel Le personnel temporaire.
      * @func addTmpPersonnel
      */
    this.addTmpPersonnel = function(personnel) {
        // TODO : vérifier que personnel.numero est bien un entier !
        if(!this.isPersonnelNumberAvailable(personnel.numero)) {
            navigator.notification.alert('Il y a déjà un personnel portant ce numéro', null, 'Numéro déjà utilisé', 'OK');
        } else {
            this.tmpPersonnel = personnel;
            $location.url('/confirmIntervenant');
        }
    }

    /**
      * Retourne l'intervenant temporaire s'il existe, null sinon.
      * @memberof Operation
      * @func getTmpPersonnel
      */
    this.getTmpPersonnel = function() {
        if(!this.tmpPersonnel) return null;
        return this.tmpPersonnel;
    }

    /**
      * Annule et détruit l'intervenant temporaire. 
      * @memberof Operation
      * @func cancelTmpPersonnel
      */
    this.cancelTmpPersonnel = function() {
        delete this.tmpPersonnel;
    }

    /**
      * Persiste l'intervenant temporaire s'il existe. Celui-ci sera empilé à la 
      * liste des personnels de l'opération courante.
      * @memberof Operation
      * @func addPersonnel
      */
    this.addPersonnel = function() {
        if($localStorage.operation.personnels.indexOf(this.tmpPersonnel) !== -1) {
            console.log("Error : operation already contains this personnel");
        } else {
            $localStorage.operation.personnels.push(this.tmpPersonnel);
            delete this.tmpPersonnel;
            $rootScope.$broadcast('operationUpdated');
        }
    }

    /**
      * Supprime un intervenant de l'opération courante s'il existe.  
      * @memberof Operation
      * @param {Personnel} personnel Personnel dans l'opération courante
      * @func removePersonnel
      */
    this.removePersonnel = function(personnel) {
        if(!$localStorage.operation) {
            console.log("Error: Not ongoing operation")
            return;
        }
        var index = $localStorage.operation.personnels.indexOf(personnel);
        if(index == -1) console.log("Error : Operation does not contain this personnel");
        else {
            $localStorage.operation.personnels.splice(index, 1);   
            $rootScope.$broadcast('operationUpdated');
        }
    }

    /**
      * Retourne un personnel de l'opération courante à partir de son numéro.
      * @memberof Operation
      * @func getPersonnel
      * @param {integer} numero Numéro de personnel
      * @returns {Personnel} Personnel de l'opération courante
      */
    this.getPersonnel = function(numero) {
        if($localStorage.operation){
            for(let p of $localStorage.operation.personnels) {
                if(!p.endDate && p.numero == numero) return p; 
            }
        }
    }

    /**
      * Retourne la liste des intervenants dans l'opération courante pour un métier donné. 
      * @memberof Operation
      * @func getPersonnelsByMetier
      * @param {string} libMetier Intitulé du métier
      * @returns {Array<Personnel>} Liste des intervenant pour un métier donné. 
      */
    this.getPersonnelsByMetier = function(libMetier) {
        let personnels = [];
        if(!$localStorage.operation) return personnels;
        let pers = $localStorage.operation.personnels;
        for(let i = 0; i < pers.length; i++) {
            if(pers[i].metier.libelle == libMetier) personnels.push(pers[i]);
        }
        return personnels;
    }

    /**
      * Provoque la sortie d'un personnel de la zone d'opération.
      * @memberof Operation
      * @func evacuatePersonnel
      * @param {integer} personnel Personne à sortie de la zone
      */
    this.evacuatePersonnel = function(personnel) {
        personnel.endDate = new Date();
        $rootScope.$broadcast('operationUpdated');
    }

    /**
      * Ajoutee une victime dans l'opération courante. Si le numéro est déjà utilisé,
      * ouvre une modale. Redirige sur /dashboard lorsque l'opération est validée. 
      * @memberof Operation
      * @func addVictime
      * @param {Victime} victime
      */
    this.addVictime = function(victime) {
        // TODO : Vérifier que victime.numero est bien un entier !
        // if(isNaN(victime.numero) || victime.numero != parseInt(victime.numero)  ) {
        //   navigator.notification.alert('Numéro invalide', null, 'Numéro invalide', 'OK');
        //   return;
        // }

        if($localStorage.operation.victimes.indexOf(victime) !== -1) console.log("Error : Operation already contains this victime")
        else if(!this.isVictimeNumberAvailable(victime.numero)) {
            navigator.notification.alert('Il y a déjà une victime portant ce numéro', null, 'Numéro déjà utilisé', 'OK');
        } else {
            $localStorage.operation.victimes.push(victime);
            $rootScope.$broadcast('operationUpdated');
            $location.url('/dashboard');
        }
    }

    /**
      * Provoque l'évacuation d'une victime de l'opétation courante. La victime ne sera pas supprimée.
      * @memberof Operation
      * @func evacuateVictime
      * @see removeVictime()
      * @param {Victime} victime
      */
    this.evacuateVictime = function(victime) {
        victime.situation = 'Évacuée';
        victime.endDate = new Date();
        $rootScope.$broadcast('operationUpdated');
    }

    /**
      * Supprime une victime de l'opération courante. Cette méthode aura pour effet 
      * de supprimer toute trace de l'existance de la victime. 
      * @memberof Operation
      * @func removeVictime
      * @see evacuateVictime()
      * @param {Victime} victime
      */
    this.removeVictime = function(victime) {
        if($localStorage.operation){
            var index = $localStorage.operation.victimes.indexOf(victime);
            if(index == -1) console.log("Cette victime n'a pas été trouvée : elle ne peut pas être supprimée.");
            else {
                $localStorage.operation.victimes.splice(index, 1);
                $rootScope.$broadcast('operationUpdated');
            }
        }
    }

    /**
      * Génère un numéro pour une nouvelle victime, il correspondra au nombre le plus
      * élevé de la liste des victimes actuellement dans l'opération, incrémenté de 1.
      * @memberof Operation
      * @func generateVictimeNumber
      * @returns {integer} Numéro pour une nouvelle victime
      */
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

    /**
      * Vérifie la disponibilité d'un numéro de victime pour dans l'opération courante. 
      * @memberof Operation
      * @func isVictimeNumberAvailable
      * @param {integer} num Numéro de victime à tester
      * @returns {bool} true si le numéro testé est disponible, false sinon.
      */
    this.isVictimeNumberAvailable = function(num) {
        for(let v of $localStorage.operation.victimes)
            if(v.numero == num) return false;
        return true;
    }

    /**
      * Vérifie la disponibilité d'un numéro d'intervenant pour l'opération courante. 
      * @memberof Operation
      * @func isPersonnelNumberAvailable
      * @param {integer} num Numéro d'intervenant à tester
      * @returns {bool} true si le numéro testé est disponible, false sinon.
      */
    this.isPersonnelNumberAvailable = function(num) {
        for(let p of $localStorage.operation.personnels)
            if(p.numero == num && !p.endDate) return false;
        return true;
    }

    /**
      * Retourne une victime de l'opération courante, à partir de son numéro.
      * @memberof Operation
      * @func getVictime
      * @param {integer} numero Numéro de victime à rechercher
      * @returns {Victime} Victime si trouvée, undefined sinon.
      */
    this.getVictime = function(numero) {
        for(let victime of $localStorage.operation.victimes) {
            if(victime.numero == numero) return victime; 
        }
    }


    /****************************
     * HISTORISATION DES DONNEES *
     ***************************/

    /**
      * Construit et retourne les journaux des opérations dans l'historique, [] s'il n'y a
      * aucune opération terminée dans l'historique.
      * @memberof Operation
      * @func getJournaux
      * @see getJournal() 
      * @param {Scope} scope Scope de controleur contenant les données de langues
      * @returns {Array<Journal>} liste des journaux construits pour chaque opération de l'historique.
      */
    this.getJournaux = function(scope) {
        var journaux = [];

        if($localStorage.historique) {
            for(let operation of $localStorage.historique) journaux.push(this.getJournal(operation, scope)); 
        }
        return journaux;
    }

    /**
      * Construit et retourne le journal de l'opération courante.
      * @memberof Operation
      * @func getCurrentJournal
      * @see getJournal()
      * @param {Scope} scope Scope de controleur contenant les données de langues
      * @returns {Journal} Journal de l'opération courante.
      */
    this.getCurrentJournal = function(scope) {
        return this.getJournal(this.getOperation(), scope);
    }

    /**
      * Construit et retourne le journal d'une opération en particulier.
      * Celle-ci peut être terminée ou non.
      * @memberof Operation
      * @func getJournal
      * @param {Scope} scope Scope de controleur contenant les données de langues
      * @param {Operation} operation Opération   
      * @returns {Journal} Journal de l'opération
      */
    this.getJournal = function(operation, scope) {
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
                texte: $filter('date')(v.beginDate, scope.translation.hourFormat) + ' : ' + scope.translation.historique.victim + v.numero + ' ' + scope.translation.historique.victimSaved + ' '+ v.status.libelle + ' ' + scope.translation.historique.situation + ' '+ v.situation +'.',
                type: 'entrée'
            };
            journal.evenements.push(evDebut);

            if(v.endDate != null) {
                var evFin = {
                    date: v.endDate,
                    texte: $filter('date')(v.endDate, scope.translation.hourFormat) + ' : ' + scope.translation.historique.victim + v.numero + ' ' + scope.translation.historique.evacuated + ' '+ v.status.libelle + '.',               
                    type: 'sortie'
                };
                journal.evenements.push(evFin);
            }
        }

        for(let p of operation.personnels) {
            var evDebut = {
                date: p.beginDate,
                texte: $filter('date')(p.beginDate, scope.translation.hourFormat) + ' : ' + scope.translation.historique.intervenant + p.numero + ' (' + $filter('lowerMetier')(p.metier.libelle) + ') ' + scope.translation.historique.enterZone + '.',
                type: 'entrée'  
            };
            journal.evenements.push(evDebut);

            if(p.endDate != null) {
                var evFin = {
                    date: p.endDate,
                    texte: $filter('date')(p.endDate, scope.translation.hourFormat) + ' : ' + scope.translation.historique.intervenant + p.numero + ' (' + $filter('lowerMetier')(p.metier.libelle) + ') ' + scope.translation.historique.leaveZone + '.',
                    type: 'sortie'
                }
                journal.evenements.push(evFin);
            }

            for(let m of p.missions) {
                var evMission = {
                    date: m.beginDate,
                    texte: $filter('date')(m.beginDate, scope.translation.hourFormat) + ' : ' + scope.translation.historique.intervenant + p.numero + ' (' + $filter('lowerMetier')(p.metier.libelle) + ') ' + scope.translation.historique.mission + ' ' + m.libelle +'.',
                    type: 'maj'
                };
                journal.evenements.push(evMission);
            }
        }
        
        journal.evenements = journal.evenements.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });

        return journal;
    }

    /**
      * Empile une opération à l'historique.
      * @memberof Operation
      * @func pushHistorique
      * @param {Operation} operation Opération à empiler dans l'historique
      */
    this.pushHistorique = function(operation) {
        if(!$localStorage.historique) {
            $localStorage.historique = [];
        }
        $localStorage.historique.push(operation);
        $rootScope.$broadcast('operationUpdated');
    }
});
