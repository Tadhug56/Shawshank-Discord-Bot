const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('ping_followup')
        .setDescription('Replies with ping and then sends a secret message!'),

    async execute(interaction)
    {
        await interaction.reply('Pong!');
        await wait(5_000);
        await interaction.followUp({ content: 'Not really! :face_with_hand_over_mouth:', ephemeral: true });
    },
};