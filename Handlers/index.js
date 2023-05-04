const { glob } = require("glob");
const { promisify } = require("util");
const fs = require("fs");
const Logger = require("@root/Utils/Logger");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/Commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    const eventFiles = await globPromise(`${process.cwd()}/Events/**/*.js`);
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
};
