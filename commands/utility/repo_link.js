const{ SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('repo_link')
        .setDescription('Sends a link to the bots repo'),

    async execute(interaction)
    {
        const repo = new ButtonBuilder()
            .setLabel('Github Repository')
            .setURL('https://github.com/Tadhug56/Shawshank-Discord-Bot')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(repo);

        await interaction.reply(
        {
            components: [row],
        });
    },
};