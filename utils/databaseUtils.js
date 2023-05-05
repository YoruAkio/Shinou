// const { Guild, User, Level } = require("models");
const mongoose = require("mongoose");

module.exports = class Database {
    /**
     * Connect to the database
     * @param {string} MONGO_URI
     */
    static async connect(MONGO_URI) {
        try {
            mongoose.set("strictQuery", false);
            await mongoose.connect(MONGO_URI, { keepAlive: true });
            console.log("🧶 Connected to DB.");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
};
