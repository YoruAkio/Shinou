const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    economy: [
        {
            wallet: {
                type: Number,
                default: 0,
            },
            bank: {
                type: Number,
                default: 0,
            },
            lastDaily: {
                type: String,
                default: null,
            },
            lastWeekly: {
                type: String,
                default: null,
            },
            lastMonthly: {
                type: String,
                default: null,
            },
            lastWork: {
                type: String,
                default: null,
            },
        },
    ],
    leveling: [
        {
            level: {
                type: Number,
                default: 1,
            },
            xp: {
                type: Number,
                default: 0,
            },
        },
    ],
});

module.exports = model('User', userSchema);
