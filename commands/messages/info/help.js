const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get command list',
    aliases: ['menu'],
    category: 'info',
    devOnly: false,
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     */
    kioRun: async (client, message, args) => {
        if (args[0]) {
            const command =
                client.commands.get(args[0]) ||
                client.commands.find(
                    cmd => cmd.aliases && cmd.aliases.includes(args[0]),
                );
            const aliases = command.aliases
                ? command.aliases.join(', ')
                : 'None';
            const devOnly = command.devOnly ? 'Yes' : 'No';
            if (command) {
                const embed = new EmbedBuilder()
                    .setTitle(`Command: ${command.name}`)
                    .setFields(
                        {
                            name: 'Description',
                            value: `\`${command.description}\``,
                            inline: true,
                        },
                        {
                            name: 'Usage',
                            value: `\`${
                                command.usage || 'No usage provided'
                            }\``,
                            inline: true,
                        },
                        {
                            name: 'Category',
                            value: `\`${command.category}\``,
                            inline: true,
                        },
                        {
                            name: 'Aliases',
                            value: `\`${aliases}\``,
                            inline: true,
                        },
                        {
                            name: 'Dev Only',
                            value: `\`${devOnly}\``,
                            inline: true,
                        },
                    )
                    .setThumbnail(
                        client.user.displayAvatarURL({ dynamic: true }),
                    )
                    .setFooter({
                        text: client.placeholder.commands.embed.footer,
                        iconURL: client.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setTimestamp()
                    .setColor('#0099ff');
                return message.reply({ embeds: [embed] });
            }
        }
        const emoji = {
            info: '🔍',
            config: '⚙️',
            moderation: '🔨',
            fun: '🎮',
            images: '🖼️',
            guild: '🔧',
            developer: '👑',
            gtps: '🔫',
            economy: '💰',
            misc: '🔮',
            unknown: '❓',
        };

        const categories = [
            ...new Set(client.commands.map(cmd => cmd.category || 'unknown')),
        ];

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Select a category')
                .addOptions(
                    categories.map(category => {
                        const capitalizedCategory =
                            category.charAt(0).toUpperCase() +
                            category.slice(1);
                        return {
                            label: `${emoji[category]} ${capitalizedCategory}`,
                            description: `Show ${capitalizedCategory} commands`,
                            value: category,
                        };
                    }),
                ),
        );

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.username} Command List`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(
                `
            Hello, ${message.author.tag}
            Welcome to the command list! Please select a category to view the commands.

            **Categories:**
            ${categories
                .map(
                    category =>
                        `> •  ${emoji[category]} ${
                            category.charAt(0).toUpperCase() + category.slice(1)
                        }`,
                )
                .join('\n')}

            **Note:**
            This message will be inactive after 30 seconds.

            [**Support Server**](${client.config.server_support})`,
            )
            .setFooter({
                text: client.placeholder.commands.embed.footer,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp()
            .setColor('#0099ff');

        const botMessage = await message.reply({
            embeds: [embed],
            components: [row],
        });

        const filter = i =>
            i.customId === 'select' && i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 90000,
        });

        collector.on('collect', async i => {
            const selectedCategory = i.values[0];
            const commands = client.commands.filter(
                cmd => (cmd.category || 'unknown') === selectedCategory,
            );

            const capitalizedCategory =
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1);

            const embed = new EmbedBuilder()
                .setTitle(
                    `${emoji[selectedCategory]} ${capitalizedCategory} Commands`,
                )
                .setDescription(
                    commands
                        .map(cmd => `\`${cmd.name}\`: ${cmd.description}`)
                        .join('\n'),
                )
                .setFooter({
                    text: client.placeholder.commands.embed.footer,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp()
                .setColor('#0099ff');

            await i.update({ embeds: [embed] });
        });

        collector.on('end', async i => {
            console.log(`Collected ${i.size} interactions.`);
            await botMessage.edit({
                content:
                    '<:kio_warning:1192369941920366614> • This message is now inactive.',
                components: [],
            });
        });
    },
};
