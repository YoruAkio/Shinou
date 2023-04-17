const fontType = [
    "ANSI Shadow",
    "Big Money-ne",
    "Big Money-nw",
    "Big Money-se",
    "Big Money-sw",
    "Big",
    "Bloody",
    "Bolger",
    "Braced",
    "Bright",
    "Ghost",
];
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config")

module.exports = {
    name: "ascii",
    description: "Generates ascii art from text",
    options: [
        {
            name: "value",
            description: "Text to convert to ascii art",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "font",
            description: "Font type to use",
            type: ApplicationCommandOptionType.String,
            required: false,
            choises: fontType.map((ft) => ({
                name: ft,
                value: ft,
            })),
        },
    ],
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.BOT_EMBED)
            .setTitle("Ascii Art")
            .setDescription(
                "```" +
                    figlet.textSync(interaction.options.getString("fontType"), {
                        font: fontType
                            ? interaction.options.getString("fontType")
                            : "ANSI Shadow",
                    }) +
                    "```"
            )
            .setFooter({ text: `Requested By ${interaction.user.tag}` });

        await interaction.followUp({ embeds: [embed] });
    },
};
