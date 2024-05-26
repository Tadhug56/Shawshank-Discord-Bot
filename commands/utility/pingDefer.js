const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('deferred_ping')
        .setDescription('Defers a pong reply for 5 seconds!'),

    async execute(interaction)
    {
        await interaction.deferReply(); // await interaction.deferReply({ ephemeral: true });
        await wait(5_000);
        await interaction.editReply('Deferred pong!');
    },
};