const { ContextMenuCommandBuilder, ApplicationCommandType, SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new ContextMenuCommandBuilder()
        .setName('user_information')
        .setType(ApplicationCommandType.User),

    async execute(interaction)
    {
       
    }
}