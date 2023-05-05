const { glob } = require("glob");
const { promisify } = require("util");
const fs = require("fs");
const Logger = require("@root/utils/Logger");
const globPromise = promisify(glob);
const { REST, Routes, PermissionsBitField } = require("discord.js");
const { Bot } = require("@root/conf");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((value) => {
        const file = require(value);

        if (file.name) {
            if (file.once) {
                client.once(file.name, (...args) =>
                    file.kioEventRun(client, ...args)
                );
                delete require.cache[require.resolve(value)];
                Logger.info(
                    "Event",
                    `${file.name} has been loaded as a once event`
                );
                return;
            } else {
                client.on(file.name, (...args) =>
                    file.kioEventRun(client, ...args)
                );

                delete require.cache[require.resolve(value)];
                Logger.info(
                    "Event",
                    `${file.name} has been loaded as an event`
                );
                return;
            }
        } else {
            Logger.error("Event", `${value} is not a valid event`);
        }
    });

    fs.readdirSync("./commands/messages/").forEach((dir) => {
        const files = fs
            .readdirSync(`./commands/messages/${dir}/`)
            .filter((file) => file.endsWith(".js"));

        if (!files || files.length <= 0)
            return Logger.error("Handler", `No commands provided right now`);
        files.forEach((file) => {
            let command = require(`../commands/messages/${dir}/${file}`);

            if (!command.name) {
                Logger.error("Handler", `No name provided for command ${file}`);
            }

            if (command) {
                client.commands.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias) => {
                        client.aliases.set(alias, command.name);
                    });
                }
                Logger.info(
                    "Handler",
                    `Loaded command ${command.name} with aliases ${
                        command.aliases ? command.aliases : "Not set"
                    }`
                );
            } else {
                Logger.error("Handler", `Error loading command ${file}`);
            }
        });
    });

    const slashCommands = [];

    fs.readdirSync("./commands/slash").forEach((dir) => {
        const files = fs
            .readdirSync(`./commands/slash/${dir}/`)
            .filter((file) => file.endsWith(".js"));

        if (!files || files.length <= 0)
            return Logger.error("Handler", `No commands provided right now`);
        files.forEach((file) => {
            let command = require(`../commands/slash/${dir}/${file}`);

            if (!command.name) {
                Logger.error("Handler", `No name provided for command ${file}`);
            }

            if (command) {
                client.slashCommands.set(command.name, command);
                Logger.info("Handler", `Loaded slash command ${command.name}`);

                slashCommands.push({
                    name: command.name,
                    description: command.description,
                    type: command.type || 1,
                    options: command.options ? command.options : null,
                    default_permissions: command.botPermissions
                        ? PermissionsBitField.resolve(
                              command.botPermissions
                          ).toString()
                        : null,
                    defailt_member_permissions: command.userPermissions
                        ? PermissionsBitField.resolve(
                              command.userPermissions
                          ).toString()
                        : null,
                });
            } else {
                Logger.error("Handler", `Error loading slash command ${file}`);
            }
        });
    });

    if (!process.env.CLIENT_ID) {
        Logger.error(
            "Handler",
            "No client id provided, slash commands will not be registered"
        );
        return process.exit();
    } else if (!process.env.TOKEN) {
        Logger.error(
            "Handler",
            "No token provided, slash commands will not be registered"
        );
        return process.exit();
    }
    
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    (async () => {
        Logger.info("Handler", "Started refreshing application (/) commands.");

        try {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: slashCommands,
            });
            Logger.info(
                "Handler",
                "Successfully reloaded application (/) commands."
            );
        } catch (error) {
            Logger.error("Handler", error);
        }
    })();
};
