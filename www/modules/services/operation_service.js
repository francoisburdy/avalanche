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
        } else {
            console.log('Création impossible : this.operation existe déjà.');
        }
    }

    this.terminate = function() {
        $localStorage.operation.endDate = new Date();
        this.pushHistorique($localStorage.operation);
        $localStorage.operation = null;
        $rootScope.$broadcast('operationTerminated');
        console.log($localStorage.historique, $localStorage.operation);
    }

    this.pushHistorique = function(operation) {
        if(!$localStorage.historique) {
            $localStorage.historique = [];
        }
        $localStorage.historique.push(operation);
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
/*
    this.getMissions = function(){
        return this.missions;
    }

    this.getPersonnels = function(){
        return this.personnels;
    }

    this.setBeginDate = function(beginDate){
        return this.beginDate = beginDate;
    }

    this.setEndDate = function(endDate){
        return this.endDate = endDate;
    }

    this.getVictimes = function(){
        return this.victimes;
    }

    this.addMission = function(mission){
        if(mission.type != "mission") console.log("Error : it is not a valid mission"); 
        else if(this.missions.indexOf(mission) !== -1) console.log("Error : Operation already contains this mission");
        else this.missions.push(mission);
    }

    this.removeMission = function(mission){
        var index = this.missions.indexOf(mission);
        if(index > -1) this.missions.splice(index, 1);
    }

    this.generateVictimeNumber = function(){
        if (this.victimes.length == 0) {
            return 1;
        } else {
            var nextNumber = this.victimes[0].getNumber() + 1;
            for(let v of this.victimes)
                nextNumber = v.getNumber() > nextNumber ? v.getNumber() + 1 : nextNumber;
            return nextNumber;
        }
    }

    this.finish = function(){
        if(this.endDate == undefined)
            this.endDate = new Date();
    }*/
});
