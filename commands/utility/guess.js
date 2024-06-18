
const { SlashCommandBuilder } = require('discord.js');

// Words array of options to guess from
const words = ['banana', 'elephant', 'mountain', 'sunset', 'starlight'];

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('guess')
        .setDescription('Guess the word from a list'),

    async execute(interaction)
    {
        const answer = words[Math.floor(Math.random() * words.length)]
        let answered = false;
        console.log(`${answer}`);

        await interaction.reply('Guess a word from the list: \n\n' + words.join('\n'));
        
        const collector = interaction.channel.createMessageCollector(
        {
            filter: (message) => message.content === answer && message.author.id !== interaction.client.user.id,
            time: 10_000,
        });

        
        collector.on('collect', (message) =>
        {
            message.reply("You've correctly guessed the word!");
            console.log(`Triggered`);

            answered = true;
            collector.stop();
        });

        collector.on('end', () =>
        {
            if(!answered)
            {
                interaction.channel.send(`No one guessed the word correctly\n The answer was ${answer}`);
            }
        });
    },
};
