const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    economy: {
        wallet: {
            type: Number,
            default: 0,
        },
        bank: {
            type: Number,
            default: 0,
        },
        lastDaily: {
            type: Date,
            default: null,
        },
        lastWeekly: {
            type: Date,
            default: null,
        },
        lastMonthly: {
            type: Date,
            default: null,
        },
        lastWork: {
            type: Date,
            default: null,
        },
    },
    // TODO: Add leveling system
    // leveling: [
    //     {
    //         level: {
    //             type: Number,
    //             default: 1,
    //         },
    //         xp: {
    //             type: Number,
    //             default: 0,
    //         },
    //     },
    // ],
});

module.exports = model('User', userSchema);
