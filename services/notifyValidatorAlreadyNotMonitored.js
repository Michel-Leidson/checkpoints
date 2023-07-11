const getValidatorName = require('../untils/getValidatorNamebyId');
const axios = require('axios');
require('dotenv').config();
const DISCORD_URL_WEBHOOK = process.env.DISCORD_URL_WEBHOOK;
const NOTIFY_COLOR_MESSAGE = process.env.NOTIFY_COLOR_MESSAGE;
const BOT_NAME = process.env.BOT_NAME;

const api = axios.create({
    baseURL: DISCORD_URL_WEBHOOK
})

async function run(validatorId) {
    let fields = [];
    let ICON = `⚠️`;

    // -> Obter o nome do validador;
    const name = await getValidatorName.execute(validatorId);
    
    try {
        const json = JSON.stringify({
            "username": BOT_NAME,
            "content": ``,
            "embeds": [
                {
                    "title": `${ICON} The validator ${name} is not being monitored!!`,
                    "color": NOTIFY_COLOR_MESSAGE
                }
            ]
        });
        console.log(`[ ${new Date().toISOString()} ]`,json)
        await api.post("", json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(err) {
        console.log(err.message);
        
    }   
}

module.exports = { run }