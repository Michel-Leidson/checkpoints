const notificationMessageRepository = require('../repositories/notificationMessageRepository');


async function run(validator_id){
    try{
        return await notificationMessageRepository.getNotificationMessageByValidatorId(validator_id);
    }catch(error){
        console.log(error);
    };
}

module.exports = { run };