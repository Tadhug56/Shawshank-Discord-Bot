const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const loginLink = 'https://shawshankdiscordbotspotifyintegration.glitch.me/login';

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('spotify_login')
        .setDescription("Login to the bot with your spotify"),

        async execute(interaction) {
            const user = interaction.user;
            try {
                // Send data to Glitch server
                const response = await axios.post('https://shawshankdiscordbotspotifyintegration.glitch.me/discord-login', {
                    data: user
                });

                await interaction.reply({ content : `Give the bot spotify permissions : ${loginLink}`, ephemeral : true });
    
                console.log('Response from Glitch:', response.data);
            }
            
            catch (error)
            {
                console.error('Error sending to Glitch:', error);
                await interaction.reply('There was an error while sending the message to Glitch.');
            }
        },
};