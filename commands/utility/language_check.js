const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('language_check')
        .setDescription('Checks what language you have on'),

    async execute(interaction)
    {
        const locales = 
        {
            de: 'German',
            fr: 'French',
        };

        interaction.reply(locales[interaction.locale] ?? 'English');
    },
};