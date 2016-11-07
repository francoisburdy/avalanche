
/* ------------- OPERATION ------------- */
function Operation(name){
    this.name = name;
    this.type = "operation";
    this.beginDate = new Date();
    this.endDate = undefined;

    this.personnels = [];
    this.victimes = [];
    this.missions = [];

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

    this.addPersonnel = function(personnel){
        if(personnel.type != "personnel") console.log("Error : it is not a valid personnel"); 
        else if(this.personnels.indexOf(personnel) !== -1) console.log("Error : Operation already contains this personnel");
        else this.personnels.push(personnel);
    }

    this.removePersonnel = function(personnel){
        var index = this.personnels.indexOf(personnel);
        if(index == -1) console.log("Error : Operation does not contain this personnel");
        else this.personnels.splice(index, 1);
    }

    this.addVictime = function(victime){
        if(victime.type != "victime") console.log("Error : it is not a valid victime"); 
        else if(this.victimes.indexOf(victime) !== -1) console.log("Error : Operation already contains this victime");
        else this.victimes.push(victime);
    }

    this.removeVictime = function(victime){
        var index = this.victimes.indexOf(victime);
        if(index == -1) console.log("Error : Operation does not contain this victime");
        else this.victimes.splice(index, 1);
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
    }

}

/* ------------- MISSION ------------- */
function MissionPersonnel(name){
    this.name = name;
    this.type = "mission";
    this.beginDate = new Date();
    this.endDate = undefined;

    this.setBeginDate = function(beginDate){
        this.beginDate = beginDate;
    }
    this.setEndDate = function(endDate){
        this.endDate = endDate;
    }
}


/* ------------- VICTIME ------------- */
function Victime(){
    this.number = window.currentOperation.generateVictimeNumber();
    this.type = "victime";
    this.beginDate = new Date();
    this.endDate = undefined;
    window.currentOperation.addVictime(this);
    this.getNumber = function(){
        return this.number;
    }
    this.setNumber = function(number){
        this.number = number;
    }

    this.setEndDate = function(endDate){
        this.endDate = endDate;
    }

    this.setBeginDate = function(beginDate){
        this.beginDate = beginDate;
    }
}

/* ------------- PERSONNEL ------------- */
function Personnel(number) {
    this.number = number;
    this.type = "personnel";
    this.missions = [];
    this.photo = undefined;

    this.getNumber = function(){
        return this.number;
    }

    this.setNumber = function(number){
        this.number = number;
    }

    this.getMissions = function(){
        return this.missions;
    }

    this.getCurrentMissions = function(){
        return this.missions.filter(function(m){
            return m.beginDate < new Date() && m.endDate === undefined;
        });
    }

    this.beginMission = function(missionName, finishOthers){
        var finishOthers = finishOthers || false;
        if (finishOthers) {
            for(let m of this.missions){
                if (m.endDate == undefined) m.endDate = new Date();         
            }
        }
        var mission = new MissionPersonnel(missionName);
        this.missions.push(mission);
    }

    this.endMission = function(missionName){
        for(let m of this.missions){
            if (m.name == missionName){
                if(m.endDate !== undefined){
                    console.log("Mission déjà terminée");
                } else {
                    m.endDate = new Date();
                }
                return;           
            }
        }
        console.log("Le personnel #"+this.number+" n'est pas affecté à la mission " + missionName);
    }
}


