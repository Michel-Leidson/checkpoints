const notificationMessageRepository = require('../repositories/notificationMessageRepository');
const notifyNotMonitoredValidator = require('./notifyValidatorIsNotMonitored');
const notifyValidatorAlreadyNotMonitored = require('./notifyValidatorAlreadyNotMonitored');
// const changeAnalysis = require('./changeAnalysisService');
async function run(userMoniker, validatorId){
    try {
        
        const newNotificationMessage ={};
        newNotificationMessage.user_moniker = userMoniker;
        newNotificationMessage.validator_id = validatorId;
        

        await notificationMessageRepository.verifyIfAlreadyExists(userMoniker, validatorId).then(async result => {
            // Se o validador está sendo monitorado
            if (result) {
                await notificationMessageRepository.deleteNotificationMessage(result.id);
                notifyNotMonitoredValidator.run(validatorId); 
            } else {
                notifyValidatorAlreadyNotMonitored.run(validatorId);
            }
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = { run };