const { Logger } = require('../../utils');
const {
    EmbedBuilder,
    AttachmentBuilder,
    ChannelType,
    PermissionsBitField,
} = require("discord.js");

module.exports = {
    name: "guildCreate",

    kioEventRun: async (client, guild) => {
        const channels = guild.channels.cache.find(
            (channel) =>
                channel.type === ChannelType.GuildText &&
                channel
                    .permissionsFor(guild.members.me)
                    .has(PermissionsBitField.Flags.SendMessages)
        );
        const guildChannel = guild.channels.cache.get(
            channels ? channels.id : guild.systemChannelId
        );
        if (!channels) return;

        const embed = new EmbedBuilder()
            .setTitle("Thanks for inviting me!")
            .setDescription(
                "I am a multipurpose bot that can do many things, such as moderation, fun, and utility commands. You can view my commands by doing `kio help`."
            )
            .setFooter({ text: `Join on`, iconURL: client.user.avatarURL() })
            .setTimestamp()
            .setColor(client.colors.PINK);

        guildChannel
            .send({
                embeds: [embed],
            })
            .catch((error) => {
                Logger.error("guildCreate", "Failed to send message: " + error);
            });
    },
};
