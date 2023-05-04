const figlet = require("figlet");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

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
    ],
    kioRun: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor(client.colors.PINK)
            .setTitle("Ascii Art")
            .setDescription(
                "```" +
                    figlet.textSync(args[0], {
                        font: "ANSI Shadow",
                    }) +
                    "```"
            )
            .setFooter({
                text: `For more font type please use slash commands.`,
                iconURL: client.user.displayAvatarURL(),
            });

        await message.reply({ embeds: [embed] });
    },
    kioSlashRun: async (client, interaction) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(client.colors.PINK)
            .setTitle("Ascii Art")
            .setDescription(
                "```" +
                    figlet.textSync(interaction.options.getString("value"), {
                        font: "ANSI Shadow",
                    }) +
                    "```"
            )
            .setFooter({ text: `Requested By ${interaction.user.tag}` });

        await interaction.followUp({ embeds: [embed] });
    },
};
