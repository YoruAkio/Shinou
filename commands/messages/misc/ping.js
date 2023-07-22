const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns the web socket latency of the bot.",
    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    kioRun: async (client, message, args) => {
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Grace said : "Pong!!!!!!"`)
                    .setDescription(`${client.ws.ping} ws`)
                    .setFooter({
                        text: `Requested by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setColor(client.colors.PINK),
            ],
        });
    },

    /**
     *
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Interaction} interaction
     */
    kioSlashRun: async (client, interaction) => {
        await interaction.deferReply();

        interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Grace said : "Pong!!!!!!"`)
                    .setDescription(`${client.ws.ping} ws`)
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setColor(client.colors.PINK),
            ],
        });
    },
};
