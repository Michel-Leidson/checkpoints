const Sequelize = require('sequelize');
const database = require('../db');

const NotificationMessage = database.define('notification_message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_moniker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    validator_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = NotificationMessage;