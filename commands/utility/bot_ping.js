const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('bot_ping')
        .setDescription("Checks the bot's ping"),

    async execute(interaction, client)
    {
        interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
    },
};