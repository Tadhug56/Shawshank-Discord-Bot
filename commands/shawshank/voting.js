const { SlashCommandBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType} = require('discord.js');

// Vote Handlers
let voteCounts = {};
let voters = new Set();

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('voting')
        .setDescription('A voting system for Shawshank'),

    async execute(interaction)
    {
        const select = new StringSelectMenuBuilder()
            .setCustomId('members')
            .setPlaceholder('Vote for who you think the answer is!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Ryan')
                    .setDescription('Ryan Scally')
                    .setValue('Ryan'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Tadhg')
                    .setDescription('Tadhg Mulvey')
                    .setValue('Tadhg'),

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Ronan')
                    .setDescription('Ronan Greene')
                    .setValue('Ronan'),*/

                new StringSelectMenuOptionBuilder()
                    .setLabel('Lughadh')
                    .setDescription('Lughadh Sisk')
                    .setValue('Lughadh'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Mark')
                    .setDescription('Mark Daly')
                    .setValue('Mark'),

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('James Mc')
                    .setDescription('James McCarthy')
                    .setValue('JamesMc'),
                    */

                new StringSelectMenuOptionBuilder()
                    .setLabel('James B')
                    .setDescription('James Berney')
                    .setValue('JamesB'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Alex')
                    .setDescription('Alex Forsyth')
                    .setValue('Alex'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Chris')
                    .setDescription('Christopher Lacy')
                    .setValue('Chris'),

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Fionn')
                    .setDescription('Fionn Stack')
                    .setValue('Fionn'),*/

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('JOD')
                    .setDescription('James O'Donoghue')
                    .setValue('JOD'),*/

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Kai')
                    .setDescription('Kai Liu')
                    .setValue('Kai'),*/

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Oscar')
                    .setDescription('Oscar Allen')
                    .setValue('Oscar'),*/

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Ben')
                    .setDescription('Ben McCarron')
                    .setValue('Ben'),*/

                /*new StringSelectMenuOptionBuilder()
                    .setLabel('Jack')
                    .setDescription('Jack Mulhall')
                    .setValue('Jack'),*/
            );

        const row = new ActionRowBuilder()
                .addComponents(select);
        
        const response = await interaction.reply(
        {  
            content: 'Vote for who you think the answer is',
            components: [row],
        });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 20_000 });

        // Voting options
        let voteCounts =
        {
            ['Ryan']: 0,
            ['Tadhg']: 0,
            //['Ronan']: 0,
            ['Lughadh']: 0,
            ['Mark']: 0,
            ['JamesMc']: 0,
            ['JamesB']: 0,
            ['Alex']: 0,
            ['Chris']: 0,
            //['Fionn']: 0,
            //['JOD']: 0,
            ['Kai']: 0,
            ['Oscar']: 0,
            ['Ben']: 0,
            ['Jack']: 0

        };

        voters.clear(); // Clear voters

        // Collect votes
        collector.on('collect', async i =>
        {
            const userId = i.user.id;

            if(voters.has(userId))
            {
                await i.reply({ content: 'You have already voted!', ephemeral: true });
            }

            else
            {
                const selection = i.values[0]; // Set selection to the value voted for
                voteCounts[selection]++; // Increment the vote count of the voted option
                voters.add(userId); // Add the user to the voted pool
                await i.reply({ content: `${i.user} has selected ${selection}!`, ephemeral: true });
            }
        });

        // When the timer ends
        collector.on('end', () =>
        {
            let maxVotes = 0;
            let winners = [];

            for (const option in voteCounts)
            {
                if(voteCounts[option] === maxVotes)
                {
                    winners.push(option);
                }

                else if(voteCounts[option] > maxVotes)
                {
                    maxVotes = voteCounts[option];
                    winners = [];
                    winners.push(option);
                }
            }

            let results = `**Voting has ended**\n\n**Results**:\n`;
            for(const option in voteCounts)
            {
                results += `${option} : ${voteCounts[option]} votes\n`;
            }
            
            // When counting is over
            if(winners.length === 1)
            {
                results += `\n**Most voted :**\n${winners[0]} : ${voteCounts[winners[0]]} votes`;
            }

            else
            {
                results += `\n**Most voted :**\n`;

                for(const winner in winners)
                {
                    results += `${winners[winner]} : ${voteCounts[winners[winner]]} votes\n`;
                }
            }

            interaction.followUp(results);
        });
    },
};