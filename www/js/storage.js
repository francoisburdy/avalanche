

var storage = window.localStorage;

function resetData(){
    storage.clear();
    window.currentOperation = null;
}

function createNewOperation(name){
    if(window.currentOperation !== undefined) {
        console.log("There is already a current operation, do archiveCurrentOperation()");
    } else {
        window.currentOperation = new Operation(name);
        saveCurrentOperation();
    }
}

function saveCurrentOperation(){
    if (window.currentOperation !== undefined)
        storage.setItem('current_operation', JSON.stringify(window.currentOperation));
}

function retreiveCurrentOperation(){
    console.time('retreiveCurrentOperation');
    if(window.currentOperation == undefined){
        var op = JSON.parse(storage.getItem('current_operation'));
        if(op === null){ console.log("No current operation"); } 
        else {
            window.currentOperation = new Operation(op.name);
            window.currentOperation.setBeginDate(op.beginDate);
            window.currentOperation.setEndDate(op.endDate);

            for (let m of op.missions) {
                var mission = new MissionPersonnel(m.name);
                mission.setBeginDate(m.beginDate);
                mission.setEndDate(m.endDate);
                window.currentOperation.addMission(mission);
            }

            for (let v of op.victimes) {
                var victime = new Victime();
                victime.setNumber(v.number)
                victime.setBeginDate(v.beginDate);
                victime.setEndDate(v.endDate);
                window.currentOperation.addVictime(victime);

            }

            for (let p of op.personnels) {
                var personnel = new Personnel(p.number);

                for(let mp of p.missions){
                    var mission = new MissionPersonnel(mp.name)
                    mission.setBeginDate(mp.beginDate);
                    mission.setEndDate(mp.endDate);
                    personnel.missions.push(mission);
                }
                window.currentOperation.addPersonnel(personnel);
            }
        }
    }
    console.timeEnd('retreiveCurrentOperation');
}

function archiveCurrentOperation(){
    if(window.currentOperation == undefined) {
        console.log("No current operation");
    } else if(window.currentOperation.endDate == undefined) {
        console.log("Current operation is not finished, do currentOperation.finish()");
    } else {
        var pastOperations = JSON.parse(storage.getItem("past_operations"));
        if (pastOperations == null) {
            storage.setItem("past_operations", JSON.stringify([window.currentOperation]));
        } else {
            pastOperations.push(window.currentOperation);
            storage.setItem("past_operations", JSON.parse(pastOperations));
        }
        storage.setItem("current_operation", null);
        window.currentOperation = null;
    }
    
}