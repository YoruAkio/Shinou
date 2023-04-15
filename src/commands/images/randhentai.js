const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const { NekoBot } = require("nekobot-api");
const neko = new NekoBot();

module.exports = {
    name: "randhentai",
    description: "Generates a random hentai image",
    isNsfw: true,
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const imageUrl = await neko.get("hentai");

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.BOT_EMBED)
            .setImage(imageUrl)
            .setFooter({ text: `Requested By ${interaction.user.tag}` });

        await interaction.followUp({ embeds: [embed] });
    },
};
