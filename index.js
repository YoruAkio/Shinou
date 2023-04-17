require("dotenv").config();
require("module-alias/register");
require("@utils/consoleRunning");

const { Client, IntentsBitField, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");
const languages = require("./languages/en.json");

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
    ],
});

client.translate = languages;

(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
        console.log("🧶 Connected to DB.");

        eventHandler(client);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

client.login(process.env.TOKEN);
