const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

let count = 0;

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('league_matches')
        .setDescription('Displays stats from your recent matches'),

    async execute(interaction)
    {
        let stats = await getStats();

        const userId = interaction.user.id;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('League Stats')
            .setThumbnail(stats.imageUrl)
            .addFields(
                { name: 'Name', value: `${stats.name}`, inline: true },
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
            if (i.customId === 'next')
            {
                count += 1;
                stats = await getStats();
            }
            
            else if (i.customId === 'previous')
            {
                if (count > 0)
                {
                    count -= 1
                    stats = await getStats();
                }
            }

            

            if (!stats)
            {
                await i.update({ content: 'Failed to fetch match data. Please try again later.', components: [] });
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

            await i.update({ embeds: [newEmbed], components: [row] });
        });

        collector.on('end', collected =>
        {
            count = 0;
        });


    }
};

async function getStats()
{
    const { fetchMatchData } = await import('./league.mjs');
    const matchStats = await fetchMatchData(count);
    
    
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