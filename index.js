require('dotenv').config();

const {
    Client,
    IntentsBitField,
    ActivityType,
    Collection,
    Partials,
} = require('discord.js');
const Database = require('./utils/databaseUtils');

const client = new Client({
    // Status of the bot
    presence: {
        status: 'idle',
        afk: true,
        activities: [
            {
                name: 'Doing something with discord stuff',
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
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
    ],
    partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
    restRequestTimeout: 30000,
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

client.colors = require('./conf.js').Colors;
client.config = require('./conf.js').Bot;
client.translate = require('./languages/en.json')
client.utils = require('./utils/botUtils.js')

require('./utils/consoleRunning.js');
require('./handlers/index.js')(client);

module.exports = client;

Database.connect(process.env.MONGODB_URI);
client.login(process.env.TOKEN);