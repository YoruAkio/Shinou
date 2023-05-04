/**
 * @typedef {Object} ContextData
 * @property {string} name - The name of the command (must be lowercase)
 * @property {string} description - A short description of the command
 * @property {boolean} devOnly - Whether the command is only for developers or not
 * @property {import('discord.js').PermissionResolvable[]} [userPermissions] - Permissions required by the user to use the command.
 * @property {import('discord.js').PermissionResolvable[]} [clientPermissions] - Permissions required by the client to use the command.
 * @property {function(import('discord.js').Message, string[], object)} kioRun - The callback to be executed when the command is invoked
 * @property {function(import('discord.js').ChatInputCommandInteraction, object)} kioSlashRun - The callback to be executed when the interaction is invoked
 */

/**
 * @type {ContextData} data - The context information
 */
module.exports = {
    name: "",
    description: "",
    devOnly: true,
    userPermissions: [],
    clientPermissions: [],

    kioRun: async (client, message, args) => {},

    kioSlashRun: async (client, interaction) => {},
};
