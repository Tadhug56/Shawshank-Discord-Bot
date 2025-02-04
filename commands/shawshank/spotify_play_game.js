const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const axios = require ('axios');
const supabase = require('../../database/connection');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('spotify_play_game')
        .setDescription('Play the game with the user that were included in the setup'),

    async execute(interaction)
    {
        const response = await axios.post('https://shawshankdiscordbotspotifyintegration.glitch.me/play-game');
    }
};