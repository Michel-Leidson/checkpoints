const notificationMessageRepository = require('../repositories/notificationMessageRepository');
const notifyMonitoredValidator = require('./notifyMonitoredValidator');
const notifyValidatorAlreadyMonitored = require('./notifyValidatorAlreadyMonitored');
// const changeAnalysis = require('./changeAnalysisService');
async function run(userMoniker, validatorId){
    try {
        
        const newNotificationMessage ={};
        newNotificationMessage.user_moniker = userMoniker;
        newNotificationMessage.validator_id = validatorId;
        

        notificationMessageRepository.verifyIfAlreadyExists(userMoniker, validatorId).then(async result => {
            // Se o validador já está sendo monitorado
            if (result) {
                notifyValidatorAlreadyMonitored.run(validatorId);
            } else {
                await notificationMessageRepository.createNotificationMessage(newNotificationMessage);
                notifyMonitoredValidator.run(validatorId);
            }
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = { run };