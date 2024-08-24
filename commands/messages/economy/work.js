const { Client, Interaction, EmbedBuilder } = require('discord.js');
const User = require('../../../models/User');
const { Bot } = require('../../../conf');

const dailyAmount = Math.floor(Math.random() * 25000) + 1;

module.exports = {
    name: 'work',
    description: 'Collect your work!',
    category: 'economy',
    /**
     * @types {import("discord.js").Client} client
     * @types {import("discord.js").Message} message
     * @types {string[]} args
     */
    kioRun: async (client, message, args) => {
        if (!message.guild)
            return message.reply(
                'You can only run this command inside a server.',
            );

        try {
            let user = await User.findOne({
                userId: message.author.id,
            });

            if (user) {
                var lastWork = user.economy.lastWork;
                if (lastWork === null) {
                    lastWork = new Date(Date.now() - 86400000);
                }
                const lastWorkDate = new Date(lastWork).toDateString();
                const currentDate = new Date().toDateString();

                if (lastWorkDate === currentDate) {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Work')
                                .setDescription(
                                    'You have already collected your work.',
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

                user.economy.lastWork = new Date();
            } else {
                user = new User({
                    ...query,
                    economy: {
                        lastWork: new Date(),
                        balance: 0,
                    },
                });
            }

            user.economy.balance += dailyAmount;
            await user.save();

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Work')
                        .setDescription(`You have collected your work of **${dailyAmount}**`)
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
        } catch (err) {
            console.error(err);
            return message.reply('An error occurred while processing the command.');
        }
    },
};