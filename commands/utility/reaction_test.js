const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('reaction_test')
        .setDescription('Tests for message reactions'),

    async execute(interaction)
    {
        interaction.channel.send('My message to react to.').then(sentMessage => {
            // Unicode emoji
            sentMessage.react('👍');
        
            /* Custom emoji
            sentMessage.react('123456789012345678');
            sentMessage.react('<emoji:123456789012345678>');
            sentMessage.react('<a:emoji:123456789012345678>');
            sentMessage.react('emoji:123456789012345678');
            sentMessage.react('a:emoji:123456789012345678');
            */
        });
    }
}