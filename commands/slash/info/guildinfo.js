const { EmbedBuilder } = require("discord.js");
const Guild = require("@root/models/Guild");

module.exports = {
    name: "guildinfo",
    description: "Get information about the guild",

    kioRun: async (client, interaction) => {
        const prefix = await Guild.findOne({
            guildId: interaction.guild.id,
        }).then((res) => res.prefix);

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
