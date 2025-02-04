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
        const player3 = interaction.options.getUser('player3');
        const player4 = interaction.options.getUser('player4');
        const player5 = interaction.options.getUser('player5');
        const player6 = interaction.options.getUser('player6');
        const player7 = interaction.options.getUser('player7');
        const player8 = interaction.options.getUser('player8');
        const player9 = interaction.options.getUser('player9');
        const player10 = interaction.options.getUser('player10');

        console.log(host);
        
        if (host) players.push(host.id);
        if (player2) players.push(player2.id);
        if (player3) players.push(player3.id);
        if (player4) players.push(player4.id);
        if (player5) players.push(player5.id);
        if (player6) players.push(player6.id);
        if (player7) players.push(player7.id);
        if (player8) players.push(player8.id);
        if (player9) players.push(player9.id);
        if (player10) players.push(player10.id);

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
    }
}
/*
async function sendGuessingPrompt(channel, track, serverUrl)
{
    const response = await axios.get(`${serverUrl}/get-answer?songId=${track.id}`);
    const correctUser = response.data.correctUser;

    channel.send(`🎵 Now Playing: **${track.name}** by ${track.artists}\nWho added this song? Reply with @username!`);
    
    // Listen for replies
    const filter = (m) => !m.author.bot;
    const collector = channel.createMessageCollector({ filter, time: 30000 }); // 30s to answer

    collector.on('collect', (message) => {
        if (message.mentions.users.size > 0) {
            const guessedUser = message.mentions.users.first().id;
            if (guessedUser === correctUser)
            {
                channel.send(`✅ Correct! ${message.author} guessed it!`);
            }
            
            else
            {
                channel.send(`❌ Wrong guess, ${message.author}! Try again.`);
            }
        }
    });

    collector.on('end', () => channel.send('⏳ Time’s up! Moving to the next song.'));
}

async function gameLoop(channel, accessToken, serverUrl)
{
    let lastSongId = null;

    setInterval(async () => {
        const track = await getCurrentTrack(accessToken);
        if (!track) return;

        if (track.id !== lastSongId) { // New song detected
            lastSongId = track.id;
            await sendGuessingPrompt(channel, track, serverUrl);
        }
    }, 10000); // Check every 10 seconds
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'spotify_setup_game') {
        const channel = interaction.channel;
        const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN';
        const serverUrl = 'https://your-server-url.com';

        interaction.reply('🎶 Starting the Spotify guessing game!');
        gameLoop(channel, accessToken, serverUrl);
    }
});*/
