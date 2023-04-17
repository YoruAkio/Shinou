const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const { getJson } = require("@utils/httpUtils");
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
    options: [
        {
            name: "category",
            description: "The category of reaction image",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: choices.map((ch) => ({
                name: ch,
                value: ch,
            })),
        },
    ],
    callback: async (client, interaction) => {
        await interaction.deferReply();

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
                    console.log(imageUrl);
                }

                return new EmbedBuilder()
                    .setAuthor({ name: `${category}!` })
                    .setColor(EMBED_COLORS.BOT_EMBED)
                    .setImage(imageUrl)
                    .setFooter({ text: `Requested By ${user.tag}` });
            } catch (ex) {
                return new EmbedBuilder()
                    .setAuthor({ name: "Error!" })
                    .setColor(EMBED_COLORS.ERROR)
                    .setDescription("Failed to fetch meme. Try again!")
                    .setFooter({ text: `Requested By ${user.tag}` });
            }
        };

        const choice = interaction.options.getString("category");
        const embed = await genReaction(choice, interaction.user);
        await interaction.followUp({ embeds: [embed] });
    },
};
