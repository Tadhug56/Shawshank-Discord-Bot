const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('string_select_menu')
        .setDescription('Test for string select menus'),
    
    async execute(interaction)
    {
        const select = new StringSelectMenuBuilder()
            .setCustomId('select')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option')
                    .setValue('option')
                    .setDescription('A selectable option')
                    .setEmoji('1248012273964941403')
                    .setDefault(true),
	            );

                const row = new ActionRowBuilder()
                .addComponents(select);
        
        await interaction.reply(
        {  
            content: 'Uh Test',
            components: [row],
        });
    },
};