const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('fetch_reply')
        .setDescription('Fetches details about the message!'),

    async execute(interaction)
    {
        await interaction.reply('Getting message data');
        const message = await interaction.fetchReply();
        console.log(message);
    },
};