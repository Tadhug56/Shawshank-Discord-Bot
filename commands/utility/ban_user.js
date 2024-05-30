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
            
        
        await interaction.reply(
        {
            content: `Are you sure you want to ban ${target} for reason ${reason}?`,
            components: [row],
        });

        await interaction.followUp(`Banning ${target.username} for reason : ${reason}`);
        await interaction.guild.members.ban(target);
    },
};