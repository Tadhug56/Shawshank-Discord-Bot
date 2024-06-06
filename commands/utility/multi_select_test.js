const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, UserSelectMenuBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('multi_select_test')
        .setDescription('Test for multi select'),
    
    async execute(interaction)
    {
        const userSelect = new UserSelectMenuBuilder()
            .setCustomId('users')
            .setPlaceholder('Select Multiple users')
            .setMinValues(1)
            .setMaxValues(10)
                
	            

        const row1 = new ActionRowBuilder()
        .addComponents(userSelect);
        
        await interaction.reply(
        {  
            content: 'Select Users',
            components: [row1],
        });
    },
};