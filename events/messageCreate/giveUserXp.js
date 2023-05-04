require("module-alias/register");
const { Client, Message } = require("discord.js");
const calculateLevelXp = require("@root/Utils/calculateLevelXp");
const Level = require("@root/Models/Level");
const Guild = require("@root/Models/Guild");
const cooldowns = new Set();

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} message
 */
module.exports = {
    name: "messageCreate",
    kioEventRun: async (client, message) => {
        if (
            !message.inGuild() ||
            message.author.bot ||
            cooldowns.has(message.author.id)
        )
            return;

        const xpToGive = getRandomXp(5, 15);

        const query = {
            userId: message.author.id,
            guildId: message.guild.id,
        };

        const guildQuery = {
            guildId: message.guild.id,
        };

        try {
            const level = await Level.findOne(query);
            const guild = await Guild.findOne(guildQuery);

            if (level) {
                level.xp += xpToGive;

                if (level.xp > calculateLevelXp(level.level)) {
                    level.xp = 0;
                    level.level += 1;

                    if (guild.levelLogs) {
                        const channel = message.guild.channels.cache.get(
                            guild.levelLogs
                        );

                        if (channel) {
                            channel.send(
                                `${message.member} you have leveled up to **level ${level.level}**.`
                            );
                        }
                    } else {
                        message.channel
                            .send(
                                `${message.member} you have leveled up to **level ${level.level}**.`
                            )
                            .then((msg) => {
                                msg.delete({ timeout: 5000 });
                            });
                    }
                }

                await level.save().catch((e) => {
                    console.log(`Error saving updated level ${e}`);
                    return;
                });
                cooldowns.add(message.author.id);
                setTimeout(() => {
                    cooldowns.delete(message.author.id);
                }, 30000);
            } else {
                const newLevel = new Level({
                    userId: message.author.id,
                    guildId: message.guild.id,
                    xp: xpToGive,
                });

                await newLevel.save();
                cooldowns.add(message.author.id);
                setTimeout(() => {
                    cooldowns.delete(message.author.id);
                }, 30000);
            }
        } catch (error) {
            console.log(`Error giving xp: ${error}`);
        }
    },
};
