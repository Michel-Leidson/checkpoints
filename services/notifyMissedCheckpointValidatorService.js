const getValidatorName = require('../untils/getValidatorNamebyId');
const axios = require('axios');
const formatUserMentionDiscord = require('../untils/formatUserMentionDiscord');
require('dotenv').config();
const DISCORD_URL_WEBHOOK = process.env.DISCORD_URL_WEBHOOK;
const NOTIFY_COLOR_MESSAGE = process.env.NOTIFY_COLOR_MESSAGE;
const BOT_NAME = process.env.BOT_NAME;

const api = axios.create({
    baseURL: DISCORD_URL_WEBHOOK
})

async function run(id, missed_checkpoint, userMoniker) {
    let fields = [];
    let ICON = `🔴`;

    // -> Obter o nome do validador;
    const name = await getValidatorName.execute(id);

    try {
        if (typeof name !== 'undefined') {
            fields.push({
                "name": "Name",
                "value": `${name}`
            })
        }
        if (typeof missed_checkpoint !== 'undefined') {
            fields.push({
                "name": "Checkpoint",
                "value": `${missed_checkpoint}`
            })
        }

        // fields = removeInvalidCharacters(fields);
        let discordID = formatUserMentionDiscord.execute(userMoniker);
        const json = JSON.stringify({
            "username": BOT_NAME,
            "content": `Mention: ${discordID}`,
            "embeds": [
                {
                    "title": `${ICON} Missed Checkpoint`,
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