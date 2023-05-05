require("dotenv").config();
require("module-alias/register");

const {
    Client,
    IntentsBitField,
    ActivityType,
    Collection,
    Partials,
} = require("discord.js");
const languages = require("./languages/en.json");
const Database = require("./utils/databaseUtils");

const client = new Client({
    // Status of the bot
    presence: {
        status: "idle",
        afk: true,
        activities: [
            {
                name: "Doing something with discord stuff",
                type: ActivityType.Competing,
            },
        ],
    },

    // Required in Discord.js v14
    // https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.DirectMessageReactions,
    ],
    partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
    restRequestTimeout: 30000,
});

module.exports = client;
require("./handlers/index.js")(client);
require("@root/utils/consoleRunning.js");

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

client.colors = require("@root/conf").Colors;
client.translate = languages;

Database.connect(process.env.MONGODB_URI);
client.login(process.env.TOKEN);
