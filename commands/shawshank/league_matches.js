const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('league_matches')
        .setDescription('Displays stats from your recent matches')
        .addStringOption(option =>
            option
                .setName('username')
                .setDescription('Enter your username')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('tagline')
                .setDescription('Enter your tagline (No #)')
                .setRequired(true)),

    async execute(interaction)
    {

        let count = 0;
        const username = interaction.options.getString('username');
        const tagline = interaction.options.getString('tagline');

        const handleInteraction = async () =>
        {
            let stats = await getStats(username, tagline, count, interaction);

            const userId = interaction.user.id;

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('League Stats')
                .setURL(`https://www.op.gg/summoners/euw/${username}-${tagline}`)
                .setDescription('Your League stats from recent matches')
                .setThumbnail(stats.imageUrl)
                .addFields(
                    { name: 'Name', value: `${stats.name}`, inline: true }
                )
                .addFields(
                    { name: 'Kills', value: `${stats.kills}`, inline: true },
                    { name: 'Deaths', value: `${stats.deaths}`, inline: true },
                    { name: 'Assists', value: `${stats.assists}`, inline: true },
                );

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
            );

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.user.id === userId && (i.customId === 'previous' || i.customId === 'next');
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i =>
            {
                // Immediately acknowledge the interaction with a loading message
                await i.deferUpdate();

                if (i.customId === 'next')
                {
                    count += 1;
                    stats = await getStats(username, tagline, count, interaction);
                }
                
                else if (i.customId === 'previous')
                {
                    if (count > 0)
                    {
                        count -= 1
                        stats = await getStats(username, tagline, count, interaction);
                    }
                }

                

                if (!stats)
                {
                    await i.editReply({ content: 'Failed to fetch match data. Please try again later.', components: [] });
                    return;
                }

                const newEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('League Stats')
                    .setThumbnail(stats.imageUrl)
                    .addFields(
                        { name: 'Name', value: `${stats.name}`, inline: true },
                        { name: 'Kills', value: `${stats.kills}`, inline: true },
                        { name: 'Deaths', value: `${stats.deaths}`, inline: true },
                        { name: 'Assists', value: `${stats.assists}`, inline: true },
                    );

                await i.editReply({ embeds: [newEmbed], components: [row] });
            });

            collector.on('end', collected =>
            {
                count = 0;
            });
        };

        // Call the function to handle this specific interaction
        await handleInteraction();
    }
};

async function getStats(uName, tLine, count, interaction)
{
    const { fetchMatchData } = await import('./league.mjs');
    const matchStats = await fetchMatchData(count, uName, tLine);
    
    
    if(!matchStats)
    {
        await interaction.reply({ content: 'Failed to fetch match data. Please try again later.', ephemeral: true });
        return;
    }

    else
    {
        return matchStats;
    }
}