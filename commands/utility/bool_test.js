const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('bool_test')
        .setDescription('Asks if a response should be hidden or not')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('The input to echo back')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')),

    async execute(interaction)
    {
        const hidden = interaction.options.getBoolean('ephemeral');
        const input = interaction.options.getString('input');

        if(hidden == true)
        {
            await interaction.reply({ content: `${input} + Secret Gangster`, ephemeral: true});
        }

        else
        {
            await interaction.reply('Gangster');
        }
    },
};
