const config = require("@root/config");

module.exports = {
    ECONOMY: {
        name: "Economy",
        image: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/128/coins-icon.png",
        emoji: "🪙",
    },
    FUN: {
        name: "Fun",
        image: "https://icons.iconarchive.com/icons/flameia/aqua-smiles/128/make-fun-icon.png",
        emoji: "😂",
    },
    IMAGE: {
        name: "Image",
        image: "https://icons.iconarchive.com/icons/dapino/summer-holiday/128/photo-icon.png",
        emoji: "🖼️",
    },
    INFORMATION: {
        name: "Information",
        image: "https://icons.iconarchive.com/icons/graphicloads/100-flat/128/information-icon.png",
        emoji: "🪧",
    },
    MODERATION: {
        name: "Moderation",
        enabled: config.MODERATION.ENABLED,
        image: "https://icons.iconarchive.com/icons/lawyerwordpress/law/128/Gavel-Law-icon.png",
        emoji: "🔨",
    },
    DEVELOPER: {
        name: "dEVELOPER",
        image: "https://www.pinclipart.com/picdir/middle/531-5318253_web-designing-icon-png-clipart.png",
        emoji: "🤴",
    },
    UTILITY: {
        name: "Utility",
        image: "https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-alt/128/Utilities-icon.png",
        emoji: "🛠",
    },
};
