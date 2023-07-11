/*
const { Client, Intents, MessageEmbed } = require("discord.js"); //baixar a lib
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
*/

require('dotenv').config();

const { Client, GatewayIntentBits, MessageEmbed } = require("discord.js"); //baixar a lib
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers]
});

const getValidatorById = require('./services/getValidatorByIdService');
const createNotificationMessage = require('./services/createNotificationMessageService');
const removeNotificationMessage = require('./services/removeNotificationMessageService');
// const ProposalService = require('../service/ProposalService');
// const ConsensusService = require('./ConsensusService');
// const { format, formatDistance } = require('date-fns');


const NOTIFY_COLOR_MESSAGE = process.env.NOTIFY_COLOR_MESSAGE
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_BOT_PREFIX = process.env.DISCORD_BOT_PREFIX

client.login(DISCORD_BOT_TOKEN);

client.on("ready", () => {
    console.log(`Bot foi iniciado com sucesso!`);
    client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo' } });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(DISCORD_BOT_PREFIX)) return;

    const args = message.content.slice(DISCORD_BOT_PREFIX.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    // console.log("aqui")
    // coamdno ping
    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }

    
    if (comando === "monitor") {

        if (args.length > 0) {
            const validatorId = args.join(" ").split(" ")[0];
            console.log("Parameter:", validatorId)

            const validator = await getValidatorById.run(validatorId);
            if (validator !== null) {
                // console.log("Validator id:", validator.id);
                const mentions = message.mentions.users.map(mention => {
                    return mention
                })
                console.log(mentions[0].id);
                const firstMentionID = mentions[0].id
                createNotificationMessage.run(firstMentionID, validator.id);
            } else {
                message.channel.send({
                    content: `Validator ${validatorId} not found!`
                })
            }
        } else {
            message.channel.send({
                content: `You need typing validator ID in $monitor command!`
            })
        }
    }

    if (comando === "remove_monitor") {

        if (args.length > 0) {
            const validatorId = args.join(" ").split(" ")[0];
            console.log("Parameter:", validatorId)

            const validator = await getValidatorById.run(validatorId);
            if (validator !== null) {
                // console.log("Validator id:", validator.id);
                const mentions = message.mentions.users.map(mention => {
                    return mention
                })
                console.log(mentions[0].id);
                const firstMentionID = mentions[0].id
                removeNotificationMessage.run(firstMentionID, validator.id);
            } else {
                message.channel.send({
                    content: `Validator ${validatorId} not found!`
                })
            }
        } else {
            message.channel.send({
                content: `You need typing validator ID in $monitor command!`
            })
        }
    }

    if (comando === "help") {
        const exampleEmbed = {
            title: `Help Commands`,
            description: "Type this comands for get Validators info",
            color: NOTIFY_COLOR_MESSAGE,
            fields: [
                {
                    name: "!!! INFO !!!",
                    value: "This bot sends notifications when a validator being monitored does not sign the current checkpoint, or when it retrieves the checkpoint."
                },
                {
                    name: "/monitor <Validator ID> @discord-user-mention",
                    value: "adds the validator to the group of monitored validators, so that checkpoint notifications arrive, along with your discord user"
                },
                {
                    name: "/remove_monitor <Validator ID> @discord-user-mention",
                    value: "remove the validator to the group of monitored validators."
                },
            ]
        }
        console.log(exampleEmbed)
        try {
            message.channel.send({ embeds: [exampleEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 60000)
            })
        } catch {
            console.log("Error in send message Discord Bot")
        }
    }
});
