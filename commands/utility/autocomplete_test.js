const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
    .setName('autocomplete_test')
    .setDescription('Search discordjs.guide!')
    .addStringOption(option =>
        option
            .setName('query')
            .setDescription('Phrase to search for')
            .setAutocomplete(true))
    .addStringOption(option =>
        option
        .setName('version')
        .setDescription('Version to search in')
        .setAutocomplete(true)),
        
    // Handle the autocompletion response
    async autocomplete(interaction)
    {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if(focusedOption.name === 'query')
        {
            choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
        }

        if(focusedOption.name === 'version')
        {
            choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
        }

        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice})),
        );
    },

    // Respond to the complete slash command
    async execute(interaction)
    {
        // Do something based on the filtered autocomplete
        interaction.reply('Working?');
    },
};