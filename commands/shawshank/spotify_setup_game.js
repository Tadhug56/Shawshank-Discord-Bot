const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const axios = require ('axios');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('spotify_setup_game')
        .setDescription('Setup the game')
        .addStringOption(option =>
            option.setName('mode')
            .setDescription('Select the mode to play')
            .setRequired(true)
            .addChoices(
                { name: 'Top', value : 'top'},
                { name: 'Playlist', value : 'playlist'}
            )
        )
        .addUserOption(option => 
            option.setName('player2')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player3')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player4')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player5')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player6')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player7')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player8')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player9')
            .setDescription('Another player')
        )
        .addUserOption(option => 
            option.setName('player10')
            .setDescription('Another player')
        ),

    async execute(interaction)
    {
        const mode = interaction.options.getString('mode');
        const players = [];
        
        const host = interaction.user;
        const player2 = interaction.options.getUser('player2');

        console.log(host);
        console.log(player2);

        if (host) players.push(host.id);
        if (player2) players.push(player2.id);

        console.log("players : ", players);
        // Save game setup to the database
        await createGame(host.id, players);

        await interaction.reply(`Game created! Mode: ${mode}\nPlayers: ${players.map(id => `<@${id}>`).join(', ')}`);
    },
};

async function createGame(hostId, players)
{
    try
    {
        const response = await axios.post('https://shawshankdiscordbotspotifyintegration.glitch.me/setup', {
            host : hostId,
            players : players
        });
        
        console.log("Response from setup : ", response.data);

        return response;
    }

    catch(error)
    {
        console.error('Error sending to Glitch:', error);
        await interaction.reply('There was an error settin up the game (Server side)');
    }
}