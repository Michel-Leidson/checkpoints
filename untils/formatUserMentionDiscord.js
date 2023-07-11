function execute(discord_user_id) {
    if (discord_user_id === null || discord_user_id === '') {
        return "-";
    } else {
        return `<@!${discord_user_id}>`;
    }
}

module.exports = { execute }