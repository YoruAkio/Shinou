const { EmbedBuilder } = require("discord.js");
const GuildModel = require("@root/Models/Guild");

/**
 * @type {import("@structures/Command").CommandObject}
 */
module.exports = {
    name: "guildinfo",
    description: "Get information about the guild",
    category: "info",

    /**
     * @type {import("discord.js").Client} client
     * @type {import("discord.js").Message} message
     * @type {string[]} args
     */
    kioRun: async (client, message, args) => {
        client.prefix = async function (message) {
            let custom;

            const data = await GuildModel.findOne({
                Guild: message.guild.id,
            }).catch((err) => console.log(err));

            if (data) {
                custom = data.prefix;
            } else {
                custom = "-";
            }

            return custom;
        };

        const prefix = await client.prefix(message);

        const embed = new EmbedBuilder()
            .setTitle(`${message.guild.name} Info`)
            .setThumbnail(message.guild.iconURL())
            .addFields({
                name: "Guild Name",
                value: message.guild.name,
                inline: true,
            })
            .addFields({
                name: "Guild ID",
                value: message.guild.id,
                inline: true,
            })
            .addFields({
                name: "Guild Owner",
                value: `${message.guild.owner.user.tag} (${message.guild.owner.user.id})`,
                inline: true,
            })
            .addFields({
                name: "Guild Prefix",
                value: prefix,
                inline: true,
            })
            .setColor(client.colors.PINK)
            .setFooter({ text: `Requested By ${message.author.tag}` });

        message.reply({ embeds: [embed] });
    },
    kioSlashRun: async (client, interaction) => {
        client.prefix = async function (interaction) {
            let custom;

            const data = await GuildModel.findOne({
                Guild: message.guild.id,
            }).catch((err) => console.log(err));

            if (data) {
                custom = data.prefix;
            } else {
                custom = "-";
            }

            return custom;
        };

        const prefix = await client.prefix(interaction);

        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Info`)
            .setThumbnail(interaction.guild.iconURL())
            .addField("Guild Name", interaction.guild.name, true)
            .addField("Guild ID", interaction.guild.id, true)
            .addField("Guild Owner", interaction.guild.owner, true)
            .addField("Guild Member Count", interaction.guild.memberCount, true)
            .addField("Guild Created At", interaction.guild.createdAt, true)
            .addField("Guild Prefix", prefix, true)
            .setColor(client.colors.PINK)
            .setFooter({ text: `Requested By ${interaction.user.tag}` });

        await interaction.followUp({ embeds: [embed] });
    },
};
