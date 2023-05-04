const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "setnsfw",
    description: "Sets the nsfw status of a channel",
    permissionRequired: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "value",
            description: "The value to set the nsfw status to",
            type: ApplicationCommandOptionType.Boolean,
            required: true,
        },
    ],
    kioRun: async (client, interaction) => {
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
