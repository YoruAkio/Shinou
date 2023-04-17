const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "uptime",
    description: "Check the bot's uptime!",

    callback: async (client, interaction) => {
        await interaction.deferReply();

        // const reply = await interaction.fetchReply();

        // const ping = reply.createdTimestamp - interaction.createdTimestamp;

        // interaction.editReply(
        //     `Current Uptime is ${interaction.client.uptime} | Websocket: ${client.ws.ping}ms`
        // );

        const ms = interaction.client.uptime;
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        const duration =
            days.padStart(1, "0") +
            " " +
            "days" +
            " " +
            hrs.padStart(2, "0") +
            " " +
            "hours" +
            " " +
            min.padStart(2, "0") +
            " " +
            "minute" +
            " " +
            sec.padStart(2, "0") +
            " " +
            "second" +
            " ";

        const clientColor = interaction.guild.members.me.displayHexColor;
        const uptimeEmbed = new EmbedBuilder()
            .setTitle("🖥 System Basic Info")
            .setDescription("```" + duration + "```")
            .setColor(clientColor);

        await interaction.editReply({
            embeds: [uptimeEmbed],
        });
    },
};
