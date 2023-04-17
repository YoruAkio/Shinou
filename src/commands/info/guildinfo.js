const { EmbedBuilder } = require("discord.js")
const { EMBED_COLORS } = require("@root/config")
const Guild = require("@models/Guild")

module.exports ={
  name: "guildinfo",
  description: "Get information about the guild",

  callback: async(client, interaction) => {

    const prefix = await Guild.findOne({ guildId: interaction.guild.id }).then((res) => res.prefix)

    await interaction.deferReply()

    const embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name} Info`)
    .setThumbnail(interaction.guild.iconURL())
    .addField("Guild Name", interaction.guild.name, true)
    .addField("Guild ID", interaction.guild.id, true)
    .addField("Guild Owner", interaction.guild.owner, true)
    .addField("Guild Member Count", interaction.guild.memberCount, true)
    .addField("Guild Created At", interaction.guild.createdAt, true)
    .addField("Guild Prefix", prefix, true)
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setFooter({ text: `Requested By ${interaction.user.tag}` })

    await interaction.followUp({ embeds: [embed] })
    
  }
}