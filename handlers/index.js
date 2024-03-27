const fs = require('fs');
const path = require('path');
const Logger = require('../utils/Logger');
const { REST, Routes, PermissionsBitField } = require('discord.js');

/**
 * @param {import('discord.js').Client} client
 */
module.exports = async client => {
    const eventsDir = path.join(__dirname, '../events/');
    const commandsDir = path.join(__dirname, '../commands/messages/');
    const startLoadTime = Date.now();

    if (!fs.existsSync(eventsDir)) {
        Logger.error('Handler', `Events directory does not exist`);
        return process.exit();
    } else if (!fs.existsSync(commandsDir)) {
        Logger.error('Handler', `Commands directory does not exist`);
        return process.exit();
    }

    let handlerLoaded = 0;
    let commandsLoaded = 0;

    for (const dir of fs.readdirSync(eventsDir)) {
        const dirPath = path.join(eventsDir, dir);
        for (const file of fs.readdirSync(dirPath)) {
            const filePath = path.join(dirPath, file);
            const files = require(filePath);

            if (files.name) {
                if (files.once) {
                    client.once(files.name, (...args) =>
                        files.kioEventRun(client, ...args),
                    );
                    // Logger.info('Handler', `Loaded event ${files.name}`);
                    handlerLoaded++;
                } else {
                    client.on(files.name, (...args) =>
                        files.kioEventRun(client, ...args),
                    );
                    // Logger.info('Handler', `Loaded event ${files.name}`);
                    handlerLoaded++;
                }
            } else {
                Logger.error('Handler', `No name provided for event ${file}`);
            }
        }
    }

    for (const dir of fs.readdirSync(commandsDir)) {
        const dirPath = path.join(commandsDir, dir);
        for (const file of fs.readdirSync(dirPath)) {
            const filePath = path.join(dirPath, file);
            const files = require(filePath);

            if (!files | (files.length <= 0))
                return console.log(`[ERROR] No commands found in ${dir}`);

            if (files.name) {
                client.commands.set(files.name, files);
                if (files.aliases && Array.isArray(files.aliases)) {
                    files.aliases.forEach(alias => {
                        client.aliases.set(alias, files.name);
                    });
                }
                // Logger.info(
                //     'Handler',
                //     `Loaded command ${files.name} ${
                //         files.aliases && files.aliases.length > 0
                //             ? `with aliases ${files.aliases.join(', ')}`
                //             : ''
                //     }`,
                // );
                commandsLoaded++;
            } else {
                Logger.error('Handler', `No name provided for command ${file}`);
            }
        }
    }

    const endLoadTime = Date.now();
    const loadTime = endLoadTime - startLoadTime;
    Logger.info('Handler', `All commands and events loaded in ${loadTime}ms, ${handlerLoaded} events and ${commandsLoaded} commands loaded`);
};
