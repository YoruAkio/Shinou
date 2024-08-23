const { EmbedBuilder } = require('discord.js');
const GuildModel = require('../../../models/Guild');

module.exports = {
    name: 'guildinfo',
    description: 'Get information about the guild',
    category: 'info',

    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @returns {Promise<void>}
     */
    kioRun: async (client, message, args) => {
        client.prefix = async function (message) {
            let custom;

            const data = await GuildModel.findOne({
                guildId: message.guild.id,
            }).catch(err => console.log(err));

            if (data) {
                custom = data.prefix;
            } else {
                custom = '-';
            }

            return custom;
        };

        const prefix = await client.prefix(message);

        const embed = new EmbedBuilder()
            .setTitle(`${message.guild.name} Info`)
            .setThumbnail(message.guild.iconURL())
            .setFields([
                {
                    name: 'Guild Name',
                    value: message.guild.name,
                    inline: true,
                },
                {
                    name: 'Guild ID',
                    value: message.guild.id,
                    inline: true,
                },
                {
                    name: 'Guild Owner',
                    value: `<@${message.guild.ownerId}> (${message.guild.ownerId})`,
                    inline: true,
                },
                {
                    name: 'Guild Prefix',
                    value: prefix,
                    inline: true,
                },
            ])
            .setColor(client.colors.PINK)
            .setFooter({ text: client.placeholder.commands.embed.footer });

        message.reply({ embeds: [embed] });
    },
};
