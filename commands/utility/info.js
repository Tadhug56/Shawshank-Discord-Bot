const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gets info about a user or server')
        .addSubcommand(subCommand =>
            subCommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('The user')))
        .addSubcommand(subCommand =>
            subCommand
                .setName('server')
                .setDescription('Info about the server')),

    async execute(interaction)
    {
        if(interaction.options.getSubcommand() === 'user')
        {
            const user = interaction.options.getUser('target');

            if(user)
            {
                await interaction.reply(`Username ${user.username}\nID : ${user.id}`);
            }

            else
            {
                await interaction.reply(`Your username : ${interaction.user.username}\nYour ID : ${interaction.user.user.id}`);
            }
        }

        else if(interaction.options.getSubcommand() === 'server')
        {
            await interaction.reply(`Server name : ${interaction.guild.name}\nTotal members : ${interaction.guild.memberCount}`);
        }
    },
};