const { EmbedBuilder } = require('discord.js');
const { getWaifu } = require('../../../utils/apiUtils');

module.exports = {
    name: 'randwaifu',
    description: 'Getting a random waifu image',
    category: 'images',
    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Message} message
     */
    kioRun: async (client, message, args) => {
        let imageUrl;
        (async () => {
            imageUrl = await getWaifu('waifu');
            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Random Waifu' })
                .setDescription("Here's a random waifu image for you!")
                .setColor(client.colors.PINK)
                .setImage(imageUrl)
                .setFooter({
                    text: `Requested By ${message.author.tag}`,
                    iconUrl: message.author.displayAvatarURL(),
                });
            await message.reply({ embeds: [embed] });
        })();
    },
};
