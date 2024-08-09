const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns the web socket latency of the bot.',
    category: 'info',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    kioRun: async (client, message, args) => {
        const apiPing = client.ws.ping;
        const emojiPing = {
            bad: '<:kio_badping:1192686058048077884>',
            idle: '<:kio_idleping:1192686248242978928> ',
            doog: '<:kio_goodping:1192715613735497738>',
        };

        const apiPingEmoji =
            apiPing <= 100
                ? emojiPing.doog
                : apiPing <= 200
                ? emojiPing.idle
                : emojiPing.bad;

        message
            .reply({ content: client.translate.commands.waiting })
            .then(msg => {
                const clientPing =
                    msg.createdTimestamp - message.createdTimestamp;
                const clientPingEmoji =
                    clientPing <= 100
                        ? emojiPing.doog
                        : clientPing <= 200
                        ? emojiPing.idle
                        : emojiPing.bad;

                msg.edit({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                client.translate.commands.ping.reply
                                    .replace('{client}', client.user.username)
                                    .replace('{apiPingEmoji}', apiPingEmoji)
                                    .replace('{apiPing}', apiPing)
                                    .replace(
                                        '{clientPingEmoji}',
                                        clientPingEmoji,
                                    )
                                    .replace('{clientPing}', clientPing),
                            )
                            .setColor(client.colors.PINK)
                            .setFooter({
                                text: client.translate.commands.embed.footer,
                                iconURL: message.author.displayAvatarURL({
                                    dynamic: true,
                                }),
                            })
                            .setTimestamp(),
                    ],
                    content: null,
                });
            });
    },
};
