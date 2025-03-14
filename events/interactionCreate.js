const { Events, Collection, ModalBuilder } = require('discord.js');

module.exports = 
{
    name : Events.InteractionCreate,
    async execute(interaction)
    {
        if (interaction.isChatInputCommand()) 
        {
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command)
            {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            // Cooldowns

            const { cooldowns } = interaction.client;

            if(!cooldowns.has(command.data.name))
            {
                cooldowns.set(command.data.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

            if(timestamps.has(interaction.user.id))
            {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if(now < expirationTime)
                {
                    const expiredTimestamp = Math.round(expirationTime / 1_000);
                    return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\'. You can use it again <t:${expiredTimestamp}:R>`, ephemeral: true});
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try
            {
                await command.execute(interaction);
            }

            catch(error)
            {
                console.error(error);

                if(interaction.replied || interaction.deferred)
                {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
                }

                else
                {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
                }
            }
        }

        else if(interaction.isAutocomplete())
        {
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command)
            {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try
            {
                await command.autocomplete(interaction);
            }

            catch(error)
            {
                console.error(error);
            }
        }

        else if(interaction.isModalSubmit())
        {
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command)
            {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try
            {
                await command.execute(interaction);
                await interaction.reply({ content: 'Your submission was reveived successfully!', ephemeral: true });
                console.log(interaction);
            }

            catch(error)
            {
                console.error(error);
            }
        }

        else if(interaction.isUserContextMenuCommand())
        {
            const command = interaction.client.commands.get(interaction.commandName);
           
            try
            {
                await command.execute(interaction);
            }

            catch(error)
            {
                console.error(error);
            }
        }

        else if(interaction.isMessageContextMenuCommand())
        {
            const command = interaction.client.commands.get(interaction.commandName);

            try
            {
                await command.execute(interaction);
            }

            catch(error)
            {
                console.error(error);
            }
        }
    },
};
