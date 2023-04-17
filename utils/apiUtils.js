const nekos = require("nekos.life");
const neko = new nekos();
const httpUtils = require("@utils/httpUtils"); 

async function getNeko(category) {
    return (await neko[category]()).url;
}

async function getWaifu(category) {
    let imageUrl;

    if (!category) throw new Error("No category provided");

    const response = await httpUtils.getJson(
        `https://api.waifu.pics/sfw/${category}`
    );
    if (!response.success) throw new Error("API error");
    imageUrl = response.data.url;

    return imageUrl;
}

module.exports = {
    getNeko,
    getWaifu,
};
