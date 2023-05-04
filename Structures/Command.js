/**
 * @typedef {"ADMIN"|"ANIME"|"AUTOMOD"|"ECONOMY"|"FUN"|"IMAGE"|"INFORMATION"|"INVITE"|"MODERATION"|"ERELA_JS"|"NONE"|"OWNER"|"SOCIAL"|"SUGGESTION"|"TICKET"|"UTILITY"} CommandCategory
 */

/**
 * @typedef {Object} CommandData
 * @property {string} name - The name of the command (must be lowercase)
 * @property {string} description - A short description of the command
 * @property {CommandCategory} category - The category this command belongs to
 * @property {import('discord.js').PermissionResolvable[]} [userPermissions] - Permissions required by the user to use the command
 * @property {import('discord.js').PermissionResolvable[]} [clientPermissios] - Permissions required by the client to use the command.
 * @property {CommandInfo} command - A short description of the command
 * @property {function(import('discord.js').Message, string[], object)} kioRun - The callback to be executed when the command is invoked
 * @property {function(import('discord.js').ChatInputCommandInteraction, object)} kioSlashRun - The callback to be executed when the interaction is invoked
 */

/**
 * Placeholder for command data
 * @type {CommandData}
 */
module.exports = {
    name: "",
    description: "",
    category: "NONE",
    userPermissions: [],
    clientPermissions: [],
    options: [],
    kioRun: (client, message, args) => {},
    kioSlashRun: (interaction, data) => {},
};
