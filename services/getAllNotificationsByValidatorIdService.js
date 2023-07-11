const notificationMessageRepository = require('../repositories/notificationMessageRepository');


async function run(id){
    try{
        return await notificationMessageRepository.getAllNotificationsByValidatorId(id);
    }catch(error){
        console.log('error getting all notifications by validator Id Service');
    };
}

module.exports = { run };