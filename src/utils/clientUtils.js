require("module-alias/register")
const { version } = require("@root/package.json");

function getBotVersion() {
    /**
     * @returns {string} The bot version.
     */
    return version;
}

module.exports = {
    getBotVersion,
};
