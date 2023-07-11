const sequelize = require('sequelize');
const { Op } = require('sequelize');
const NotificationMessage = require('../models/NotificationMessage');

async function createNotificationMessage(notificationMessage){
    try{
        const resultQuery = await NotificationMessage.create(notificationMessage);
    }catch(error){
        console.log("Error during create Notification Message!");
        console.log("log: " + error);
        throw error;
    };
}
async function deleteNotificationMessage(id){
    const resultQuery = await NotificationMessage.findOne({
        where: {
            id
        }
    });
    if(resultQuery){
        resultQuery.destroy();
        return resultQuery;
    }else{
        return null
    }
   
}

async function getNotificationMessageByUserMoniker(userMoniker){
    const resultQuery = await NotificationMessage.findOne({
        where: {
            user_moniker: userMoniker
        }
    });

    if(resultQuery){
        return resultQuery;
    }else{
        return null;
    }
}

async function getNotificationMessageByValidatorId(validatorId){
    const resultQuery = await NotificationMessage.findOne({
        where: {
            validator_id: validatorId
        }
    });

    if(resultQuery){
        return resultQuery;
    }else{
        return null;
    }
}

async function verifyIfAlreadyExists(userMoniker, validatorId){
    const resultQuery = await NotificationMessage.findOne({
        where: {
            user_moniker: userMoniker,
            validator_id: validatorId
        }
    });

    if(resultQuery){
        return resultQuery;
    }else{
        return null;
    }
}

async function getAllNotificationsByValidatorId(validatorId){
    const resultQuery = await NotificationMessage.findAll({
        where: {
            validator_id: validatorId
        }
    });
    if(resultQuery){
        return resultQuery;
    }else{
        return null;
    }
}
module.exports = {
    createNotificationMessage,
    getNotificationMessageByUserMoniker,
    getNotificationMessageByValidatorId,
    verifyIfAlreadyExists,
    getAllNotificationsByValidatorId,
    deleteNotificationMessage
}