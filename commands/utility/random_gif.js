const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./remove_message');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('random_gif')
        .setDescription('Posts a random gif from a selection')
        .addStringOption(option =>
                option.setName('category')
                    .setDescription('Gif category')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Funny', value: 'gif_funny' },
                        { name: 'Meme', value: 'gif_meme' },
                        { name: 'Movie', value: 'gif_movie' },
                    )),
    
    async execute(interaction)
    {
        const category = interaction.options.getString('category');
    }
}