const prefixModel = require('../../models/Guild');
const userModel = require('../../models/User');
const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',

    /**
     * @type {import("discord.js").Client} client
     * @type {import("discord.js").Message} message
     */
    kioEventRun: async (client, message) => {
        client.prefix = async function (message) {
            let custom;

            const data = await prefixModel
                .findOne({ guildId: message.guild.id })
                .catch(err => console.log(err));

            if (data) {
                custom = data.prefix;
            } else {
                custom = '-';
            }

            return custom;
        };

        const guildLanguage = await prefixModel.findOne({
            guildId: message.guild.id,
        });

        const userData = await userModel.findOne({
            userId: message.author.id,
        });

        if (!userData) {
            const newUser = new userModel({
                userId: message.author.id,
                economy: {
                    wallet: 0,
                    bank: 0,
                    lastDaily: null,
                    lastWeekly: null,
                    lastMonthly: null,
                    lastWork: null,
                },
            });

            await newUser.save();

            console.log('New user saved to the database.');
        }

        const prefixData = await client.prefix(message);

        if (message.content.includes(`${client.user.id}`)) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Prefix')
                        .setDescription(
                            `My prefix for this server is \`${prefixData}\``,
                        )
                        .setColor(client.colors.PINK)
                        .setFooter({
                            text: `Triggered by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setTimestamp(),
                ],
            });
        }

        if (
            message.author.bot ||
            !message.guild ||
            !message.content.toLowerCase().startsWith(prefixData)
        )
            return;

        const [cmd, ...args] = message.content
            .slice(prefixData.length)
            .trim()
            .split(/ +/g);

        const command =
            client.commands.get(cmd.toLowerCase()) ||
            client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;

        if (command.devOnly || command.onlyDev || command.isDev) {
            if (!client.config.devs.includes(message.author.id)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Developer Only')
                            .setDescription(
                                'Only developers are allowed to run this command.',
                            )
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        if (command.isNsfw) {
            if (!message.channel.nsfw) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('NSFW Channel Only')
                            .setDescription(
                                'This command can only be ran in an NSFW channel.',
                            )
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        if (command.userPermissions?.length) {
            if (!message.member.permissions.has(command.userPermissions)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Error')
                            .setDescription(
                                'You do not have enough permissions to run this command.',
                            )
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        if (command.clientPermissions?.length) {
            if (!message.guild.me.permissions.has(command.clientPermissions)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Error')
                            .setDescription(
                                'I do not have enough permissions to run this command.',
                            )
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        await command.kioRun(client, message, args);
    },
};
