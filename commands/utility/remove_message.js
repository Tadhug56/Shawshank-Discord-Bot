const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('remove_message')
        .setDescription('Deletes a message after 3 seconds'),

    async execute(interaction)
    {
        await interaction.reply('This message will be deleted in 3 seconds!');
        await wait(3_000);
        await interaction.deleteReply();
    },
};