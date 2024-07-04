const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// List of participants (this can be dynamically set or passed as arguments)
const participants = ['Ryan', 'Tadhg', 'Ronan', 'Lughadh', 'Mark', 'James Mc', 'James B', 'Alex'];
let participantsList = [...participants];

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('spin_the_wheel')
        .setDescription('Spin the wheel to randomly select a person from the list'),

    async execute(interaction)
    {
        try
        {
            // Simulate the spinning wheel effect
            let messageContent = '**Spinning the wheel!**\n';
            const spinTime = 4_000; // Total time of spinning in ms
            const spinInterval = 300; // Interval for changing the displayed participant

            const reply = await interaction.reply({ content: messageContent, fetchReply: true });

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
                        try
                        {
                            if (i.customId === 'reroll')
                            {
                                await i.update({ content: 'Rerolling...', components: [] });
                                participantsList = participantsList.length > 0 ? participantsList : [...participants]; // Ensure participantsList is reset if empty
                                await module.exports.execute(i); // Rerun the command with the new interaction
                            }
                            
                            else if (i.customId === 'cancel')
                            {
                                participantsList = [...participants]; // Reset the participants array
                                await i.update({ content: 'The wheel has been reset for future use.', components: [] });
                                collector.stop('cancelled'); // Stop the collector with a reason
                            }
                        }
                        
                        catch (error)
                        {
                            console.error('Error handling button interaction:', error);
                            await i.followUp({ content: 'An error occurred while processing your request.', ephemeral: true });
                        }
                    });

                    collector.on('end', (collected, reason) =>
                    {
                        if (reason === 'cancelled')
                        {
                            reply.edit({ content: 'The wheel has been reset for future use.', components: [] });
                        }
                        
                        else if (collected.size === 0)
                        {
                            reply.edit({ content: 'No action taken. The wheel has been reset for future use.', components: [] });
                        }

                        participantsList = [...participants];
                    });
                }
            };

            updateMessage(0);
        }
        
        catch (error)
        {
            console.error('Error executing command:', error);
            if (interaction.replied || interaction.deferred)
            {
                await interaction.followUp({ content: 'An error occurred while executing the command.', ephemeral: true });
            }
            
            else
            {
                await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
            }
        }
    },
};