const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { getJson } = require("../../../utils/httpUtils");
const NekosLife = require("nekos.life");
const neko = new NekosLife();

const choices = [
    "hug",
    "kiss",
    "cuddle",
    "feed",
    "pat",
    "poke",
    "slap",
    "smug",
    "tickle",
    "wink",
    "lewd",
];

module.exports = {
    name: "react",
    description: "Get anime reaction images",
    kioRun: async (client, message, args) => {
        if (!args[0]) {
            message.channel.send(
                "Please provide a category of reaction image!"
            );

            const listCategory = new EmbedBuilder()
                .setAuthor({ name: "Reaction Categories" })
                .setColor(client.colors.PINK)
                .setDescription(choices.map((ch) => `\`${ch}\``).join(", "));

            return message.channel.send({ embeds: [listCategory] });
        }

        if (!choices.includes(args[0])) {
            message.channel.send(
                "That is not a valid category of reaction image!"
            );

            const listCategory = new EmbedBuilder()
                .setAuthor({ name: "Reaction Categories" })
                .setColor(client.colors.PINK)
                .setDescription(choices.map((ch) => `\`${ch}\``).join(", "));

            return message.channel.send({ embeds: [listCategory] });
        }

        const genReaction = async (category, user) => {
            try {
                let imageUrl;

                // some-random api
                if (category === "wink") {
                    const response = await getJson(
                        "https://some-random-api.ml/animu/wink"
                    );
                    if (!response.success) throw new Error("API error");
                    imageUrl = response.data.link;
                }

                // neko api
                else {
                    imageUrl = (await neko[category]()).url;
                }

                return new EmbedBuilder()
                    .setAuthor({ name: `${category}!` })
                    .setColor(client.colors.PINK)
                    .setImage(imageUrl)
                    .setFooter({ text: `Requested By ${user.tag}` });
            } catch (ex) {
                return new EmbedBuilder()
                    .setAuthor({ name: "Error!" })
                    .setColor(client.colors.PINK)
                    .setDescription("Failed to fetch meme. Try again!")
                    .setFooter({ text: `Requested By ${user.tag}` });
            }
        };

        const embed = await genReaction(args[0], message.author);
        message.channel.send({ embeds: [embed] });
    },
};
