require("dotenv").config();
require("module-alias/register");
require("@root/Utils/consoleRunning.js");

const {
    Client,
    IntentsBitField,
    ActivityType,
    Collection,
    Partials,
} = require("discord.js");
const languages = require("./Languages/en.json");
const Database = require("./Utils/databaseUtils");

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
require("./Handlers/index.js")(client);

client.commands = new Collection();
client.slashCommands = new Collection();

client.colors = require("@root/config").Colors;
client.translate = languages;

const slash = require("@utils/getLocalCommands")();
console.log(slash.map((cmd) => cmd.name));

Database.connect(process.env.MONGODB_URI);
client.login(process.env.TOKEN);
