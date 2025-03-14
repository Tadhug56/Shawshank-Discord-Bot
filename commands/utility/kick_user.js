const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
    .setName('kick_user')
    .setDescription('Select a member and kick them.')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('The member to kick')
            .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for kicking'))
        .setDMPermission(false) // Not available for use in DMs
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction)
    {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`Kicking ${target.username} for reason : ${reason}`);
        await interaction.guild.members.kick(target);
    }
};