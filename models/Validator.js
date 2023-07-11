const Sequelize = require('sequelize');
const database = require('../db');

const Validator = database.define('validator', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    hasSigned: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    hasNotified: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Validator;