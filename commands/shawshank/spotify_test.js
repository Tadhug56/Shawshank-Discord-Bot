const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('spotify_test')
        .setDescription("testing"),

        async execute(interaction) {
            const user = interaction.user;
            try {
                // Send data to Glitch server
                const response = await axios.post('https://shawshankdiscordbotspotifyintegration.glitch.me/api-endpoint', {
                    data: 'jamesmccarthy654'
                });
    
                console.log('Response from Glitch:', response.data);
                
                // Respond back to the user
                await interaction.reply('Message sent to Glitch console!');
            } catch (error) {
                console.error('Error sending to Glitch:', error);
                await interaction.reply('There was an error while sending the message to Glitch.');
            }
        },
};