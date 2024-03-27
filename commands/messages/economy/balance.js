const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    Message,
} = require("discord.js");
const User = require("../../../models/User");

module.exports = {
    name: "balance",
    aliases: ["bal", "money"],
    description: "See yours/someone else's balance",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     */
    kioRun: async (client, message, args) => {
        if (!message.inGuild()) {
            message.reply({
                content: "You can only run this command inside a server.",
                ephemeral: true,
            });
            return;
        }

        const targetUserId =
            message.mentions.users.first()?.id || message.author.id;

        const user = await User.findOne({
            userId: targetUserId,
            guildId: message.guild.id,
        });

        if (!user) {
            message.reply(`<@${targetUserId}> doesn't have a profile yet.`);
            return;
        }

        message.reply(
            targetUserId === message.member.id
                ? `Your balance is **${user.balance}**`
                : `<@${targetUserId}>'s balance is **${user.balance}**`
        );
    },
};
