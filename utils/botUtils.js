const { EmbedBuilder } = require('discord.js');

module.exports = {
    errorBuilder: function (client, message, errorText, otherText) {
        if (otherText) {
            errorText =
                errorText +
                '\n<:kio_downright:1192685943371595867>・ ' +
                otherText;
        }
        const embed = new EmbedBuilder()
            .setDescription(
                '<:kio_crossmark:1192723969825054751>・' + errorText,
            )
            .setColor(client.colors.PINK)
            .setFooter({
                text: client.placeholder.commands.embed.footer,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
        return message.reply({ embeds: [embed] });
    },
    successBuilder: function (client, message, successText) {
        const embed = new EmbedBuilder()
            .setDescription(
                '<:kio_checkmark:1192723878112403508>・' + successText,
            )
            .setColor(client.colors.PINK)
            .setFooter({
                text: client.placeholder.commands.embed.footer,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
        return message.reply({ embeds: [embed] });
    },
    replacePlaceholder: function (str, values) {
        let result = str;
        for (let i = 0; i < values.length; i++) {
            result = result.replace(`%s${i + 1}`, values[i]);
        }
        return result;
    },
};
