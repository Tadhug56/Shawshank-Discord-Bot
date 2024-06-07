const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('ban_user')
        .setDescription('Select a member and ban them.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
            .addStringOption(option =>
                option
                    .setName('reason')
                    .setDescription('The reason for banning'))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setDMPermission(false), // Not available for use in DMs
    
    async execute(interaction)
    {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        // Buttons
        const confirm = new ButtonBuilder() // Confirm
            .setCustomId('confirm')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder() // Cancel
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(cancel, confirm);
            
        
        const response = await interaction.reply(
        {
            content: `Are you sure you want to ban ${target} for reason ${reason}?`,
            components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try
        {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000});

            if(confirmation.customId === 'confirm')
            {
                await interaction.guild.members.ban(target);
                await confirmation.update({content: `Banning ${target.username} for reason : ${reason}`, components: [] });
            }

            else if(confirmation.customId === 'cancel')
            {
                await confirmation.update({ content: 'Ban cancelled', components: [] })
            }
        }

        catch(e)
        {
            await interaction.editReply({ content: 'Confirmation not recieved within 1 minute, cancelling', components: [] });
        }
    },
};