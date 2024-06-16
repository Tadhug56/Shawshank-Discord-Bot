const { ContextMenuCommandBuilder, ApplicationCommandType, SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new ContextMenuCommandBuilder()
        .setName('translate_message')
        .setType(ApplicationCommandType.Message),

    async execute(interaction)
    {
       const targetMessage = interaction.targetMessage;

       await interaction.reply(`Original message : ${targetMessage}\nTranslated messsage : `);

    }
}