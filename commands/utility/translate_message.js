const { ContextMenuCommandBuilder, ApplicationCommandType, SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new ContextMenuCommandBuilder()
        .setName('translate_message')
        .setType(ApplicationCommandType.Message),

    async execute(interaction)
    {
       const targetMessage = interaction.targetMessage;

       // API KEY : 21b04d738b5e7306e486

       const apiUrl = `https://api.mymemory.translated.net/get?q=${targetMessage}&langpair=en|fr&de=tadhgmulvey56@gmail.com`

       try
       {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const translatedText = data.responseData.translatedText;

            await interaction.reply(`Original message: ${targetMessage}\nTranslated message: ${translatedText}`);
        }

        catch (error)
        {
            console.error('Error translating message:', error);
            await interaction.reply('There was an error translating the message.');
        }
    },
};