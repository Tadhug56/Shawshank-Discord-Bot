// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Create a new client instance

client.commands = new Collection(); // Command storing
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Grab command folders files
for (const folder of commandFolders)
{
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Grab commands
    for (const file of commandFiles)
    {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Set a new item in the collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command)
        {
            client.commands.set(command.data.name, command);
        }

        else
        {
            console.log(`[Warning] The command at ${filePath} is missing a required "data" or "execute" propety.`);
        }
    }
}

// Grab events

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles)
{
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if(event.once)
    {
        client.once(event.name, (...args) => event.execute(...args));
    }

    else
    {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord with client token
client.login(token);