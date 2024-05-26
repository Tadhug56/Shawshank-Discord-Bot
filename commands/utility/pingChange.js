const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('change_ping')
        .setDescription('Replies with pong and then changes!'),

    async execute(interaction)
    {
        await interaction.reply('Pong!');
        await wait(5_000);
        await interaction.editReply('Pong again!');
    },
};