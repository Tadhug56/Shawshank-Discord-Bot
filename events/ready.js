const { Events, PresenceUpdateStatus } = require('discord.js');

module.exports = 
{
    name: Events.ClientReady,
    once: true,
    execute(client)
    {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: 'Crawling through 500 feet of shit to come out clean the other side' }],
            status: PresenceUpdateStatus.Online,
        });
    },
};