require("module-alias/register");
const figlet = require("figlet");
const gradient = require("gradient-string")

console.log(gradient.instagram(figlet.textSync("Hello, World!", { font: "ANSI Shadow", horizontalLayout: 'full', verticalLayout: 'full' })))

// asciiArt("Hello World!");

// const nekos = require("nekos.life");
// const neko = new nekos();
// const httpUtils = require("@utils/httpUtils");

// async function getWaifu(category) {
//     let imageUrl;

//     const response = await httpUtils.getJson(
//         "https://api.waifu.pics/sfw/waifu"
//     );
//     if (!response.success) throw new Error("API error");
//     imageUrl = response.data.url;

//     return imageUrl;
// }

// getWaifu("waifu").then((res) => console.log(res));
