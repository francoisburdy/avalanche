angular.module('myApp').service('Operation', function($localStorage, $rootScope) {
    
    this.getOperation = function() {
        return $localStorage.operation;
    }

    this.createOperation = function() {
        if($localStorage.operation == null) {
            $localStorage.operation = {
                nom: 'Avalanche du ' + new Date(),
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

    this.pushHistorique = function(operation) {
        if(!$localStorage.historique) {
            $localStorage.historique = [];
        }
        $localStorage.historique.push(operation);
        $rootScope.$broadcast('operationUpdated');
    }

    this.addPersonnel = function(personnel) {
        if($localStorage.operation.personnels.indexOf(personnel) !== -1) {
            console.log("Error : operation already contains this personnel");
        } else $localStorage.operation.personnels.push(personnel);
    }

    this.removePersonnel = function(personnel) {
        var index = $localStorage.operation.personnels.indexOf(personnel);
        if(index == -1) console.log("Error : Operation does not contain this personnel");
        else $localStorage.operation.personnels.splice(index, 1);
    }

    this.addVictime = function(victime) {
        if($localStorage.operation.victimes.indexOf(victime) !== -1) console.log("Error : Operation already contains this victime");
        else $localStorage.operation.victimes.push(victime);
    }

    this.removeVictime = function(victime) {
        var index = $localStorage.operation.victimes.indexOf(victime);
        if(index == -1) console.log("Error : Operation does not contain this victime");
        else $localStorage.operation.victimes.splice(index, 1);
    }

    this.generateVictimeNumber = function() {
        if ($localStorage.operation.victimes.length == 0) {
            return 1;
        } else {
            var nextNumber = $localStorage.operation.victimes[0].numero + 1;
            for(let v of $localStorage.operation.victimes)
                nextNumber = v.numero > nextNumber ? v.numero + 1 : nextNumber;
            return nextNumber;
        }
    }

});
