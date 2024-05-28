const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

// Deleting guild based commands

rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
.then(() => console.log('Successfully deleted guild command'))
.catch(console.error);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, { body: [] }))
.then(() => console.log('Successfully deleted all guild command'))
.catch(console.error);

// Deleting global commands

rest.delete(Routes.applicationCommand(clientId, 'commandId'))
.then(() => console.log('Sucessfully deleted application commands'))
.catch(console.error);

rest.delete(Routes.applicationCommand(clientId, { body: [] }))
.then(() => console.log('Successfully deleted all application commands'))
.catch(console.error);

/* NOTES
'commandID' refers to the command we want to delete
*/