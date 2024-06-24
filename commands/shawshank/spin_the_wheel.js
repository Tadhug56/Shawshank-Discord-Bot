const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

// List of participants (this can be dynamically set or passed as arguments)
const participants = ['Ryan', 'Tadhg', 'Ronan', 'Lughadh', 'Mark', 'James Mc', 'James B', 'Alex'];

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('spin_the_wheel')
        .setDescription('Spin the wheel to randomly select a person from the list'),

    async execute(interaction)
    {
        // Simulate the spinning wheel effect
        let messageContent = '**Spinning the wheel!**\n';
        const spinTime = 10_000; // Total time of spinning in secs_ms
        const spinInterval = 300; // Interval for changing the displayed participant

        await interaction.reply({ content: messageContent, fetchReply: true });

        const updateMessage = async (index) =>
        {
            if (index < spinTime / spinInterval)
            {
                
                const currentParticipant = participants[Math.floor(Math.random() * participants.length)];
                //messageContent += `\n${currentParticipant}`;
                await interaction.editReply({ content: `${messageContent}${currentParticipant}` });
                setTimeout(() => updateMessage(index + 1), spinInterval);
            }
            
            else
            {
                // After spinning, select a random winner
                const winner = participants[Math.floor(Math.random() * participants.length)];
                const finalMessageContent = `\n\n🎉 The wheel stopped! The winner is **${winner}**! 🎉`;
                await interaction.editReply({ content: `${messageContent}${finalMessageContent}` });
            }
        };

        updateMessage(0);
    },
};