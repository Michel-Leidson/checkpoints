const sequelize = require('sequelize');
const { Op } = require('sequelize');
const Validator = require('../models/Validator');

async function createValidator(validator) {
    try {
        const resultQuery = await Validator.create(validator);
    }catch(error){
        console.log("Errors in fields: " + error);
        throw error;
    }
}

async function getValidatorById(id){
    const resultQuery = await Validator.findOne({
        where: {
            id
        }
    });
    return resultQuery;
}

module.exports = {
    createValidator,
    getValidatorById
}