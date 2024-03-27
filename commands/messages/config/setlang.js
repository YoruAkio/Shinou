const GuildModels = require('../../../models/Guild');

module.exports = {
    name: 'setlang',
    description: 'Sets the language of guild...',
    aliases: ['setlanguage'],
    category: 'config',
    devOnly: false,

    kioRun: async (client, message, args) => {
        const lang = args[0];

        if (!lang)
            return client.utils.errorBuilder(
                client,
                message,
                client.translate.commands.setlang.noargs,
                client.translate.commands.setlang.lang,
            );

        if (lang !== 'en' && lang !== 'jp')
            return client.utils.errorBuilder(
                client,
                message,
                client.translate.commands.setlang.invalid,
                client.translate.commands.setlang.lang,
            );

        const guild = await GuildModels.findOne({ guildId: message.guild.id });

        if (guild) {
            guild.language = lang;
            guild.save();
        } else {
            await new GuildModels({
                guildId: message.guild.id,
                language: lang,
            }).save();
        }

        return client.utils.successBuilder(
            client,
            message,
            client.translate.commands.setlang.reply.replace('{lang}', lang),
        );
    },
};
