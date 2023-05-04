const {
    ApplicationCommandOptionType,
    PermissionsBitField,
    EmbedBuilder,
} = require("discord.js");

/**
 * @type {import("@structures/Command")[]}
 */
module.exports = {
    name: "setnsfw",
    description: "Sets the nsfw status of a channel",
    userPermissions: [PermissionsBitField.Flags.ManageChannels],
    options: [
        {
            name: "value",
            description: "The value to set the nsfw status to",
            type: ApplicationCommandOptionType.Boolean,
            required: true,
        },
    ],
    kioRun: async (client, message, args) => {
        if (!args[0]) return message.reply("Please provide a value!");

        if (args[0] !== "true" && args[0] !== "false")
            return message.reply({
                embed: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription(
                            "Value must be either `true` or `false`"
                        )
                        .setColor(client.colors.PINK),
                ],
            });

        const value = args[0];

        const channel = message.channel;

        if (channel.nsfw === value) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(`Channel is already ${value ? "nsfw" : "sfw"}`)
                .setColor(client.colors.WARNING)
                .setTimestamp();

            return message.reply({ embeds: [embed] });
        }

        channel.setNSFW(value);

        const successEmbed = new EmbedBuilder()
            .setTitle("Success")
            .setDescription(`Channel is now ${value ? "nsfw" : "sfw"}`)
            .setColor(client.colors.PINK)
            .setTimestamp();

        message.reply({ embeds: [successEmbed] });
    },
    kioSlashRun: async (client, interaction) => {
        await interaction.deferReply();

        const value = interaction.options.getBoolean("value");

        const channel = interaction.channel;

        if (channel.nsfw === value) {
            return interaction.followUp({
                content: `Channel is already ${value ? "nsfw" : "sfw"}`,
            });
        }

        channel.setNSFW(value);

        interaction.followUp({
            content: `Channel is now ${value ? "nsfw" : "sfw"}`,
        });
    },
};
