

var storage = window.localStorage;

/** 
 * Supprime toutes les données du LocalStorage
 */
function resetData(){
    storage.clear();
    delete window.currentOperation;
}

/** 
 * Démarre une nouvelle opération. Si une opération est déjà en cours, utiliser archiveCurrentOperation() d'abord.
 * L'opération crée est accessible via la variable globale window.currentOperation
 * @param name Nom de l'opération
 */
function createNewOperation(name){
    if(window.currentOperation == undefined || window.currentOperation == null) {
        window.currentOperation = new Operation(name);
        saveCurrentOperation();
    } else {
        console.log("There is already a current operation, do archiveCurrentOperation()");
    }
}

/** 
 * Persiste l'opération courante dans le LocalStorage.
 */
function saveCurrentOperation(){
    if (window.currentOperation !== undefined)
        storage.setItem('current_operation', JSON.stringify(window.currentOperation));
}

/**
 * Récupère l'opération courante persistée dans le LocalStorage, et réinstancie les objets JS.
 * L'opération est accessible par la variable globale window.currentOperation.
 */
function retreiveCurrentOperation(){
    console.time('retreiveCurrentOperation');
    if(window.currentOperation == undefined){
        var currentOpJSON = storage.getItem('current_operation'); 
        window.currentOperation = intanciateOperationFromJSON(currentOpJSON);
    }
    console.timeEnd('retreiveCurrentOperation');
}


function intanciateOperationFromJSON(operationJSON){
    var op = JSON.parse(operationJSON);
    if(op === null){ 
        console.log("Invalid operation syntax");
        return null;
    } else {
        var operation = new Operation(op.name);
        operation.setBeginDate(op.beginDate);
        operation.setEndDate(op.endDate);

        for (let m of op.missions) {
            var mission = new MissionPersonnel(m.name);
            mission.setBeginDate(m.beginDate);
            mission.setEndDate(m.endDate);
            operation.addMission(mission);
        }

        for (let v of op.victimes) {
            var victime = new Victime();
            victime.setNumber(v.number)
            victime.setBeginDate(v.beginDate);
            victime.setEndDate(v.endDate);
            operation.addVictime(victime);
        }

        for (let p of op.personnels) {
            var personnel = new Personnel(p.number);

            for(let mp of p.missions){
                var mission = new MissionPersonnel(mp.name)
                mission.setBeginDate(mp.beginDate);
                mission.setEndDate(mp.endDate);
                personnel.missions.push(mission);
            }
            operation.addPersonnel(personnel);
        }

        return operation;
    }
}


/**
 * Archive l'opération courante (préalablement terminée) dans le LocalStorage.
 * L'opération courante est empilée dans le tableau des opérations passées 
 * Le tableaux des opérations passées est accessible par la fonction retreivePastOperations()
 */
function archiveCurrentOperation(){
    if(window.currentOperation == undefined || window.currentOperation == null) {
        console.log("No current operation");
    } else if(window.currentOperation.endDate == undefined) {
        console.log("Current operation is not finished, do currentOperation.finish()");
    } else {
        var pastOperations = JSON.parse(storage.getItem("past_operations"));
        if (pastOperations == null) {
            storage.setItem("past_operations", JSON.stringify([window.currentOperation]));
        } else {
            pastOperations.push(window.currentOperation);
            storage.setItem("past_operations", JSON.stringify(pastOperations));
        }
        storage.setItem("current_operation", null);
        delete window.currentOperation;
    }
}

/** 
 * Récupère les données brutes des opérations passées. Les données sont accessible 
 * via la variable globale window.pastOperations .
 * Ces données ne doivent être utilisées qu'en consultation (pas modifiées).
 */
function retreivePastOperations(){
    window.pastOperations = JSON.parse(storage.getItem("past_operations"));
    if(window.pastOperations == null) console.log("No past operations");
}

/* *********** Config ************ */

/**
 * Récupère la configuration de l'utilisateur dans le LocalStorage. 
 * S'il n'y a pas de configuration, la configuration par défaut est chargée.
 * La configuration est accessible dans la variable globale window.config.
 */
function retreiveConfig(){
    var conf = JSON.parse(storage.getItem("config"));
    if (conf != null) {
        window.config = conf;
    } else {
        var organismes = [
            {name:'Pompier', color:'red'},
            {name:'Gendarmes', color:'indigo'},
            {name:'CRS', color:'blue'},
            {name:'Secouristes', color:'green'},
            {name:'Pisteurs', color:'purple'},
            {name:'Médecins', color:'pink'}
        ];
        window.config = {organismes: organismes};
    }
}

/**
 * Persiste la configuration actuelle dans le LocalStorage.
 */
function saveConfig(){
    if(window.config != undefined){
        storage.setItem("config", JSON.stringify(config));
    }
}