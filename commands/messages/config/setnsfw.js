const {
    ApplicationCommandOptionType,
    PermissionsBitField,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    name: 'setnsfw',
    description: 'Sets the nsfw status of a channel',
    aliases: ['setnsfwstatus'],
    category: 'config',
    devOnly: false,
    kioRun: async (client, message, args) => {
        if (!args[0]) return message.reply('Please provide a value!');

        if (args[0] !== 'true' && args[0] !== 'false') {
            client.utils.errorBuilder(client, message, 'Invalid value');
        }

        const value = args[0] === 'true';
        const channelValue = message.channel.nsfw;

        if (channelValue === value) {
            return client.utils.errorBuilder(
                client,
                message,
                'Channel is already set to that value',
            );
        }

        message.channel.setNSFW(value);

        const successEmbed = new EmbedBuilder()
            .setTitle('Success')
            .setDescription(`Channel is now ${value ? 'nsfw' : 'sfw'}`)
            .setColor(client.colors.PINK)
            .setTimestamp();

        message.reply({ embeds: [successEmbed] });
    },
};
