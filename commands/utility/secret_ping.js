const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('secret_ping')
        .setDescription('Replies with Pong secretly!'),

    async execute(interaction)
    {
        await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
    },
};