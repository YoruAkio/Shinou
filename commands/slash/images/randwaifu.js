const { EmbedBuilder } = require("discord.js");
const { getNeko, getWaifu } = require("@root/utils/apiUtils");

module.exports = {
    name: "randwaifu",
    description: "Generates a random waifu image",
    kioRun: async (client, interaction) => {
        await interaction.deferReply();

        let imageUrl;
        (async () => {
            imageUrl = await getWaifu("waifu");
            const embed = new EmbedBuilder()
                .setAuthor({ name: "Random Waifu" })
                .setDescription("Here's a random waifu image for you!")
                .setColor(client.colors.PINK)
                .setImage(imageUrl)
                .setFooter({ text: `Requested By ${interaction.user.tag}` });
            await interaction.followUp({ embeds: [embed] });
        })();
    },
};

// Nekos.life Category List
// tickle
// slap
// smug
// baka
// poke
// pat
// neko
// nekoGif
// meow
// lizard
// kiss
// hug
// foxGirl
// feed
// cuddle
// woof
// why
// catText
// OwOify
// eightBall
// fact
// kemonomimi
// holo
// spoiler
// avatar
// waifu
// gecg
// goose
// wallpaper
