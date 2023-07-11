const axios = require('axios');
require('dotenv').config();
const DISCORD_URL_WEBHOOK = process.env.DISCORD_URL_WEBHOOK;
const NOTIFY_COLOR_MESSAGE = process.env.NOTIFY_COLOR_MESSAGE;
const BOT_NAME = process.env.BOT_NAME;

const api = axios.create({
    baseURL: DISCORD_URL_WEBHOOK
})

async function run(missed_checkpoint, duration) {
    let fields = [];
    let ICON = `🕓️`;

    

    try {
        if (typeof duration !== 'undefined') {
            fields.push({
                "name": "Duration",
                "value": `${duration}ms`
            })
        }
        if (typeof missed_checkpoint !== 'undefined') {
            fields.push({
                "name": "Checkpoint",
                "value": `${missed_checkpoint}`
            })
        }

        
        const json = JSON.stringify({
            "username": BOT_NAME,
            "content": ``,
            "embeds": [
                {
                    "title": `${ICON} Checkpoint Time Duration`,
                    "color": NOTIFY_COLOR_MESSAGE,
                    "fields": fields
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
        // console.log("[ "+new Date().toISOString()+" ]:","Fail in send notification",`${name}`)
    }   
}

module.exports = { run }