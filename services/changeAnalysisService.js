const notifyRecoveryCheckpoint = require('./notifyRecoveryCheckpointService');
const notifyMissedCheckpoint = require('./notifyMissedCheckpointValidatorService');
const checkIfValidatorIsMonitored = require('./checkIfValidatorIsMonitoredService');
const getAllNotificationsByValidatorId = require('./getAllNotificationsByValidatorIdService');

async function run(newValidator, validatorInDB, currentCheckpoint){

    const oldSignedStatus = validatorInDB.hasSigned;
    const validatorIsMonitored = await checkIfValidatorIsMonitored.run(validatorInDB.id);
    
    // Verifica se o validador recuperou o checkpoint
    if(oldSignedStatus == false && newValidator.hasSigned == true){
    
        // --> Se o validador for monitorado
        if(validatorIsMonitored){
            const notifications = await getAllNotificationsByValidatorId.run(validatorInDB.id);
            notifications.map(async notifyItem => {
                await notifyRecoveryCheckpoint.run(notifyItem.validator_id, currentCheckpoint, notifyItem.user_moniker);
            })
        }
        validatorInDB.hasSigned = true;
        validatorInDB.save();
    }
    // --> verificar se o validador perdeu o checkpoint;
    if(newValidator.hasSigned == false){
        if(validatorIsMonitored){
            const notifications = await getAllNotificationsByValidatorId.run(validatorInDB.id);

            notifications.map(async notifyItem => {
                
                await notifyMissedCheckpoint.run(notifyItem.validator_id, currentCheckpoint, notifyItem.user_moniker);
            })
        }
        validatorInDB.hasSigned = false;
        validatorInDB.save();
    }
}

module.exports = { run };