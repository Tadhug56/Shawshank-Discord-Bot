const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('cold')
        .setDescription('Sends a cold ah pic link'),

    async execute(interaction)
    {
        await interaction.reply({ content: "Check out this  [Cold ass pic](https://x.com/365OTG/status/1794062053810077896)"});
    },
};
