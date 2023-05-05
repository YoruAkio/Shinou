const { Bot } = require("@root/conf");
const getLocalCommands = require("@root/utils/getLocalCommands");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js")ChatInputCommandInteraction}
     */
    kioEventRun: async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const localCommands = getLocalCommands();

        try {
            const commandObject = localCommands.find(
                (cmd) => cmd.name === interaction.commandName
            );

            if (!commandObject) return;

            /**
             * @param {devOnly} Boolean
             */
            if (commandObject.devOnly) {
                if (!Bot.devs.includes(interaction.member.id)) {
                    interaction.reply({
                        content:
                            "Only developers are allowed to run this command.",
                        ephemeral: true,
                    });
                    return;
                }
            }

            /**
             * @param {testOnly} Boolean
             */
            if (commandObject.testOnly) {
                if (!(interaction.guild.id === Bot.test_server)) {
                    interaction.reply({
                        content: "This command cannot be ran here.",
                        ephemeral: true,
                    });
                    return;
                }
            }

            /**
             * @type {Array<PermissionResolvable>}
             */
            if (commandObject.userPermission?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({
                            content: "Not enough permissions.",
                            ephemeral: true,
                        });
                        return;
                    } else {
                        interaction.reply({
                            content: "All permissions are ok.",
                            ephemeral: true,
                        });
                    }
                }
            }

            /**
             * @type {Array<PermissionResolvable>}
             */
            if (commandObject.botPermissions?.length) {
                for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me;

                    if (!bot.permissions.has(permission)) {
                        interaction.reply({
                            content: "I don't have enough permissions.",
                            ephemeral: true,
                        });
                        return;
                    }
                }
            }

            /**
             * @param {isNsfw} Boolean
             */
            if (commandObject.isNsfw) {
                if (!interaction.channel.nsfw) {
                    interaction.reply({
                        content:
                            "This command can only be ran in NSFW channels.",
                        ephemeral: true,
                    });
                    return;
                }
            }

            await commandObject.kioSlashRun(client, interaction);
        } catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    },
};
