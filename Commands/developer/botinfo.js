const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const os = require("os");
const { stripIndent } = require("common-tags");
const ClientUtils = require("@root/Utils/clientUtils");

module.exports = {
    name: "botinfo",
    description: "Get the system basic info",
    devOnly: true,

    kioRun: async (client, message, args) => {
        // STATS
        const guilds = client.guilds.cache.size;
        const channels = client.channels.cache.size;
        const users = client.guilds.cache.reduce(
            (size, g) => size + g.memberCount,
            0
        );

        // CPU
        const platform = process.platform.replace(/win32/g, "Windows");
        const architecture = os.arch();
        const cores = os.cpus().length;
        const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(
            2
        )} MB`;

        // RAM
        const botUsed = `${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
        ).toFixed(2)} MB`;
        const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
            2
        )} GB`;
        const botUsage = `${(
            (process.memoryUsage().heapUsed / os.totalmem()) *
            100
        ).toFixed(1)}%`;

        const overallUsed = `${(
            (os.totalmem() - os.freemem()) /
            1024 /
            1024 /
            1024
        ).toFixed(2)} GB`;
        const overallAvailable = `${(
            os.totalmem() /
            1024 /
            1024 /
            1024
        ).toFixed(2)} GB`;
        const overallUsage = `${Math.floor(
            ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
        )}%`;

        let desc = "";
        desc += `❒ Total guilds: ${guilds}\n`;
        desc += `❒ Total users: ${users}\n`;
        desc += `❒ Total channels: ${channels}\n`;
        desc += `❒ Websocket Ping: ${client.ws.ping} ms\n`;
        desc += "\n";

        const embed = new EmbedBuilder()
            .setTitle("Bot Information")
            .setColor(client.colors.PINK)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(desc)
            .addFields(
                {
                    name: "CPU",
                    value: stripIndent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
                    inline: true,
                },
                {
                    name: "Bot's RAM",
                    value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
                    inline: true,
                },
                {
                    name: "Overall RAM",
                    value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
                    inline: true,
                },
                {
                    name: "Node Js version",
                    value: process.versions.node,
                    inline: false,
                },
                {
                    name: "Uptime",
                    value:
                        "```" +
                        ClientUtils.timeformat(process.uptime()) +
                        "```",
                    inline: false,
                }
            );

        let components = [];
        components.push(
            new ButtonBuilder()
                .setLabel("Invite Link")
                .setURL(
                    "https://discord.com/api/oauth2/authorize?client_id=920954192523329546&scope=bot+applications.commands&permissions=1374891928950"
                )
                .setStyle(ButtonStyle.Link)
        );

        let buttonsRow = new ActionRowBuilder().addComponents(components);

        return message.reply({ embeds: [embed], components: [buttonsRow] });
    },
    kioSlashRun: async (client, interaction) => {
        await interaction.deferReply();
        // STATS
        const guilds = client.guilds.cache.size;
        const channels = client.channels.cache.size;
        const users = client.guilds.cache.reduce(
            (size, g) => size + g.memberCount,
            0
        );

        // CPU
        const platform = process.platform.replace(/win32/g, "Windows");
        const architecture = os.arch();
        const cores = os.cpus().length;
        const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(
            2
        )} MB`;

        // RAM
        const botUsed = `${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
        ).toFixed(2)} MB`;
        const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
            2
        )} GB`;
        const botUsage = `${(
            (process.memoryUsage().heapUsed / os.totalmem()) *
            100
        ).toFixed(1)}%`;

        const overallUsed = `${(
            (os.totalmem() - os.freemem()) /
            1024 /
            1024 /
            1024
        ).toFixed(2)} GB`;
        const overallAvailable = `${(
            os.totalmem() /
            1024 /
            1024 /
            1024
        ).toFixed(2)} GB`;
        const overallUsage = `${Math.floor(
            ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
        )}%`;

        let desc = "";
        desc += `❒ Total guilds: ${guilds}\n`;
        desc += `❒ Total users: ${users}\n`;
        desc += `❒ Total channels: ${channels}\n`;
        desc += `❒ Websocket Ping: ${client.ws.ping} ms\n`;
        desc += "\n";

        const embed = new EmbedBuilder()
            .setTitle("Bot Information")
            .setColor(client.colors.PINK)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(desc)
            .addFields(
                {
                    name: "CPU",
                    value: stripIndent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
                    inline: true,
                },
                {
                    name: "Bot's RAM",
                    value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
                    inline: true,
                },
                {
                    name: "Overall RAM",
                    value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
                    inline: true,
                },
                {
                    name: "Node Js version",
                    value: process.versions.node,
                    inline: false,
                },
                {
                    name: "Uptime",
                    value:
                        "```" +
                        ClientUtils.timeformat(process.uptime()) +
                        "```",
                    inline: false,
                }
            );

        let components = [];
        components.push(
            new ButtonBuilder()
                .setLabel("Invite Link")
                .setURL(
                    "https://discord.com/api/oauth2/authorize?client_id=920954192523329546&scope=bot+applications.commands&permissions=1374891928950"
                )
                .setStyle(ButtonStyle.Link)
        );

        let buttonsRow = new ActionRowBuilder().addComponents(components);

        return interaction.followUp({
            embeds: [embed],
            components: [buttonsRow],
        });
    },
};
