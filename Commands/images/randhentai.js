const { EmbedBuilder } = require("discord.js");
const { NekoBot } = require("nekobot-api");
const neko = new NekoBot();

module.exports = {
    name: "randhentai",
    description: "Generates a random hentai image",
    isNsfw: true,
    kioRun: async (client, message, args) => {
        const imageUrl = await neko.get("hentai");

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Random Hentai" })
            .setDescription("Here's a random hentai image for you!")
            .setColor(client.colors.PINK)
            .setImage(imageUrl)
            .setFooter({
                text: `Requested By ${message.author.tag}`,
                iconUrl: message.author.displayAvatarURL(),
            });

        await message.reply({ embeds: [embed] });
    },
    kioSlashRun: async (client, interaction) => {
        await interaction.deferReply();

        const imageUrl = await neko.get("hentai");

        const embed = new EmbedBuilder()
            .setColor(client.colors.PINK)
            .setImage(imageUrl)
            .setFooter({ text: `Requested By ${interaction.user.tag}` });

        await interaction.followUp({ embeds: [embed] });
    },
};
