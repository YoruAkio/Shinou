const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const { getNeko, getWaifu } = require("@utils/apiUtils");

module.exports = {
    name: "randwaifu",
    description: "Generates a random waifu image",
    callback: async (client, interaction) => {
        await interaction.deferReply();

        let imageUrl;
        (async () => {
            imageUrl = await getWaifu("waifu");
            const embed = new EmbedBuilder()
                .setAuthor({ name: "Random Waifu" })
                .setDescription("Here's a random waifu image for you!")
                .setColor(EMBED_COLORS.BOT_EMBED)
                .setImage(imageUrl)
                .setFooter({ text: `Requested By ${interaction.user.tag}` });
            await interaction.followUp({ embeds: [embed] });

            console.log(imageUrl);
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
