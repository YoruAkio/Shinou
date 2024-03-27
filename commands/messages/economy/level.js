const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
} = require("discord.js");
const canvacord = require("canvacord");
const calculateLevelXp = require("../../../utils/calculateLevelXp");
const Level = require("../../../models/Level");
const ClientUtils = require("../../../utils/clientUtils");

module.exports = {
    name: "level",
    description: "Shows your/someone's level.",

    kioRun: async (client, message, args) => {
        if (!message.inGuild()) {
            message.reply("You can only run this command inside a server.");
            return;
        }

        const user = message.mentions.users.first() || message.author;

        const fetchedLevel = await Level.findOne({
            userId: user.id,
            guildId: message.guild.id,
        });

        if (!fetchedLevel) {
            message.reply(
                user.id
                    ? `${user.tag} doesn't have any levels yet. Try again when they chat a little more.`
                    : "You don't have any levels yet. Chat a little more and try again."
            );
            return;
        }

        let allLevels = await Level.find({
            guildId: message.guild.id,
        }).select("-_id userId level xp");

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank =
            allLevels.findIndex((lvl) => lvl.userId === user.id) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            .setProgressBar("#FFC300", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator);

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        message.reply({ files: [attachment] });
    },
};
