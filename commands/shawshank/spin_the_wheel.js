const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// List of participants (this can be dynamically set or passed as arguments)
const participants = ['Ryan', 'Tadhg', 'Chris', 'Lughadh', 'Mark', 'James B', 'Alex'];
let participantsList = [...participants];
let firstRun = true;

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('spin_the_wheel')
        .setDescription('Spin the wheel to randomly select a person from the list'),

    async execute(interaction)
    {
        // Simulate the spinning wheel effect
        let messageContent = '**Spinning the wheel!**\n';
        let reply;
        const spinTime = 4_000; // Total time of spinning in ms
        const spinInterval = 300; // Interval for changing the displayed participant

        if(firstRun === true)
        {
            reply = await interaction.reply({ content: messageContent, fetchReply: true });
            console.log('IF block');
        }

        else
        {
            reply = await interaction.followUp({ content: messageContent, fetchReply: true });
            console.log('Else block');
        }

        // Update message command that candles the spinning of the wheel
        const updateMessage = async (index) =>
        {
            if (index < spinTime / spinInterval)
            {
                const currentParticipant = participantsList[Math.floor(Math.random() * participantsList.length)];
                await reply.edit({ content: `${messageContent}${currentParticipant}` });
                setTimeout(() => updateMessage(index + 1), spinInterval);
            }
            
            else
            {
                // After spinning, select a random winner
                const winnerIndex = Math.floor(Math.random() * participantsList.length);
                const winner = participantsList[winnerIndex];
                const finalMessageContent = `${messageContent}\n\n🎉 The wheel stopped! The winner is **${winner}**! 🎉`;
                await reply.edit({ content: finalMessageContent });

                // Remove the winner from the participants array
                participantsList.splice(winnerIndex, 1);
                firstRun = false;

                // Create buttons for reroll or cancel
                const row = new ActionRowBuilder().addComponents
                (
                    new ButtonBuilder()
                        .setCustomId('reroll')
                        .setLabel('Reroll')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('cancel')
                        .setLabel('Cancel')
                        .setStyle(ButtonStyle.Secondary)
                );

                await reply.edit({ content: finalMessageContent, components: [row] });

                const filter = i => i.customId === 'reroll' || i.customId === 'cancel';
                const collector = reply.createMessageComponentCollector({ filter, time: 15000 });

                collector.on('collect', async i =>
                {
                    if (i.customId === 'reroll')
                    {
                        await i.update({ content: 'Rerolling...', components: [] });
                        participantsList = participantsList.length > 0 ? participantsList : [...participants]; // Ensure participantsList is reset if empty
                        await module.exports.execute(interaction); // Rerun the command
                    }
                    
                    else if (i.customId === 'cancel')
                    {
                        participantsList = [...participants]; // Reset the participants array
                        await i.update({ content: 'The wheel has been reset for future use.', components: [] });
                    }
                });

                collector.on('end', collected =>
                {
                    if (collected.size === 0)
                    {
                        reply.edit({ content: 'No action taken. The wheel has been reset for future use.', components: [] });
                        participantsList = [...participants];
                        firstRun = true;
                    }
                });
            }
        };

        updateMessage(0);
    },
};
