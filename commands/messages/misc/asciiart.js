const figlet = require('figlet');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ascii',
    description: 'Generates ascii art from text',
    category: 'misc',
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     */
    kioRun: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor(client.colors.PINK)
            .setTitle('Ascii Art')
            .setDescription(
                '```' +
                    figlet.textSync(args[0], {
                        font: 'ANSI Shadow',
                    }) +
                    '```',
            )
            .setFooter({
                text: `For more font type please use slash commands.`,
                iconURL: client.user.displayAvatarURL(),
            });

        await message.reply({ embeds: [embed] });
    },
};
