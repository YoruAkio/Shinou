const {Schema, model} = require('mongoose');

const guildSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: '!'
    },
    language: {
        type: String,
        required: true,
        default: 'en'
    }
});

module.exports = model('Guild', guildSchema);