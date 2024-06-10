const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('favourite_colour')
        .setDescription('Allows you to select a favourite colour'),

    async execute(interaction)
    {
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('My Modal');

        const favouriteColourInput = new TextInputBuilder()
            .setCustomId('favouriteColourInput')
            .setLabel("What's your favourite colour?")
            .setPlaceholder('Enter a colour innit')
            .setValue('Default')
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel('What are some of your favourite hobbies?')
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(favouriteColourInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);

        // Wait for modal to be submitted
        const filter = (interaction) => interaction.customId === 'myModal';

        interaction.awaitModalSubmit({ filter, time: 30_000 }).then((modalInteraction) =>
        {
            // Get data entered
            const favouriteColorResult = modalInteraction.fields.getTextInputValue('favouriteColourInput');
            const hobbiesResult = modalInteraction.fields.getTextInputValue('hobbiesInput');
            modalInteraction.reply(`Your favourite colour is ${favouriteColorResult} and your hobbies are ${hobbiesResult}`);
        });
    },
};