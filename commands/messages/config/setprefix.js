const GuildModels = require('../../../models/Guild');

module.exports = {
    name: 'setprefix',
    description: 'Sets the prefix of the guild',
    aliases: ['prefix'],
    category: 'config',
    devOnly: false,

    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @returns {Promise<void>}
     */
    kioRun: async (client, message, args) => {
        const prefix = args[0];

        if (!prefix)
            return client.utils.errorBuilder(
                client,
                message,
                client.placeholder.commands.setprefix.noargs,
                client.placeholder.commands.setprefix.prefix,
            );

        const guild = await GuildModels.findOne({ guildId: message.guild.id });

        if (guild) {
            guild.prefix = prefix;
            guild.save();
        } else {
            await new GuildModels({
                guildId: message.guild.id,
                prefix: prefix,
            }).save();
        }

        return client.utils.successBuilder(
            client,
            message,
            client.placeholder.commands.setprefix.reply
                .replace('{authorid}', message.author.id)
                .replace('{prefix}', prefix),
        );
    },
};
