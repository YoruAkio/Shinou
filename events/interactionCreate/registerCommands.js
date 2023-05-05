// ;
// const config = require("@root/conf");
// const areCommandsDifferent = require("@root/utils/areCommandsDifferent");
// const getApplicationCommands = require("@root/utils/getApplicationCommands");
// const getLocalCommands = require("@root/utils/getLocalCommands");

// module.exports = {
//     name: "registerCommands",

//     /**
//      *
//      * @param {import{"discord.js".Client}} client
//      */
//     kioEventRun: async (client) => {
//         try {
//             const localCommands = getLocalCommands();
//             const applicationCommands = await getApplicationCommands(
//                 client,
//                 config.BOT.TEST_SERVER_ID
//             );

//             for (const localCommand of localCommands) {
//                 const { name, description, options } = localCommand;

//                 const existingCommand = await applicationCommands.cache.find(
//                     (cmd) => cmd.name === name
//                 );

//                 if (existingCommand) {
//                     if (localCommand.deleted) {
//                         await applicationCommands.delete(existingCommand.id);
//                         console.log(`🗑 Deleted command "${name}".`);
//                         continue;
//                     }

//                     if (areCommandsDifferent(existingCommand, localCommand)) {
//                         await applicationCommands.edit(existingCommand.id, {
//                             description,
//                             options,
//                         });

//                         console.log(`🔁 Edited command "${name}".`);
//                     }
//                 } else {
//                     if (localCommand.deleted) {
//                         console.log(
//                             `⏩ Skipping registering command "${name}" as it's set to delete.`
//                         );
//                         continue;
//                     }

//                     await applicationCommands.create({
//                         name,
//                         description,
//                         options,
//                     });

//                     console.log(`👍 Registered command "${name}".`);
//                 }
//             }
//         } catch (error) {
//             console.log(`There was an error: ${error}`);
//         }
//     },
// };
