const { Collection } = require("discord.js");
const { Bot } = require("@root/conf");
const cooldown = new Collection();

module.exports = {
    name: "interactionCreate",

    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js")ChatInputCommandInteraction}
     */
    kioEventRun: async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const slashCommands = client.slashCommands.get(interaction.commandName);
        if (!slashCommands)
            return client.slashcommands.delete(interaction.commandName);

        try {
            /**
             * @param {devOnly} Boolean
             */
            if (slashCommands.devOnly) {
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
            if (slashCommands.testOnly) {
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
            if (slashCommands.userPermission?.length) {
                for (const permission of slashCommands.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({
                            content: "Not enough permissions.",
                            ephemeral: true,
                        });
                        return;
                    }
                }
            }

            /**
             * @type {Array<PermissionResolvable>}
             */
            if (slashCommands.botPermissions?.length) {
                for (const permission of slashCommands.botPermissions) {
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
            if (slashCommands.isNsfw) {
                if (!interaction.channel.nsfw) {
                    interaction.reply({
                        content:
                            "This command can only be ran in NSFW channels.",
                        ephemeral: true,
                    });
                    return;
                }
            }

            await slashCommands.kioRun(client, interaction);
        } catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    },
};
