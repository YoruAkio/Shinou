const { Client, Interaction, EmbedBuilder } = require("discord.js");
const User = require("../../../models/User");
const { Bot } = require("../../../conf");

const dailyAmount = Math.floor(Math.random() * 25000) + 1;

module.exports = {
    name: "daily",
    description: "Collect your dailies!",

    /**
     * @types {import("discord.js").Client} client
     * @types {import("discord.js").Message} message
     * @types {string[]} args
     */
    kioRun: async (client, message, args) => {
        if (!message.guild)
            return message.reply(
                "You can only run this command inside a server."
            );

        try {
            const query = {
                userId: message.author.id,
                guildId: message.guild.id,
            };

            let user = await User.findOne(query);

            if (user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("Daily")
                                .setDescription(
                                    "You have already collected your daily."
                                )
                                .setColor(client.colors.PINK)
                                .setFooter({
                                    text: `Requested by ${message.author.tag}`,
                                    iconURL: message.author.displayAvatarURL({
                                        dynamic: true,
                                    }),
                                })
                                .setTimestamp(),
                        ],
                    });
                }

                user.lastDaily = new Date();
            } else {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            await user.save();

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Daily")
                        .setDescription(
                            `${dailyAmount} was added to your balance. Your new balance is ${user.balance}`
                        )
                        .setColor(client.colors.PINK)
                        .setTimestamp()
                        .setFooter({
                            text: `Requested by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        }),
                ],
            });
        } catch (error) {
            console.log(`Error with /daily: ${error}`);
        }
    },
};
