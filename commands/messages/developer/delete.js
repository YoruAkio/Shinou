const userModel = require('../../../models/User');
const { Client, Message, Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'delete',
    description: 'Delete a user from the database',
    category: 'developer',
    devOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     */
    kioRun: async (client, message, args) => {
        if (!message.inGuild()) {
            message.reply({
                content: 'You can only run this command inside a server.',
                ephemeral: true,
            });
            return;
        }

        const targetUserId =
            message.mentions.users.first()?.id || message.author.id;

        const user = await userModel.findOne({
            userId: targetUserId,
        });

        if (!user) {
            message.reply(`<@${targetUserId}> doesn't have a profile yet.`);

            return;
        }

        await userModel.deleteOne({
            userId: targetUserId,
        });

        const newUser = new userModel({
            userId: targetUserId,
            economy: [
                {
                    wallet: 0,
                    bank: 0,
                    lastDaily: null,
                    lastWeekly: null,
                    lastMonthly: null,
                    lastWork: null,
                },
            ],
        });

        await newUser.save();

        message.reply(
            `Deleted <@${targetUserId}>'s profile from the database. and automatically created a new one.`,
        );
    },
};
