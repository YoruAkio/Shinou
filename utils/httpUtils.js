const ISO6391 = require('iso-639-1');
const sourcebin = require('sourcebin_js');
const fetch = require('node-fetch');
const { translate: gTranslate } = require('@vitalets/google-translate-api');

module.exports = class HttpUtils {
    /**
     * Returns JSON response from url
     * @param {string} url
     * @param {object} options
     */
    static async getJson(url, options) {
        try {
            // with auth
            const response = options
                ? await fetch(url, options)
                : await fetch(url);
            const json = await response.json();
            return {
                success: response.status === 200 ? true : false,
                status: response.status,
                data: json,
            };
        } catch (ex) {
            console.log(`Url: ${url}`);
            console.log(`function getJson got an error: ${ex}`);
            return {
                success: false,
            };
        }
    }

    /**
     * Returns buffer from url
     * @param {string} url
     * @param {object} options
     */
    static async getBuffer(url, options) {
        try {
            const response = options
                ? await fetch(url, options)
                : await fetch(url);
            const buffer = await response.buffer();
            if (response.status !== 200) console.log(`Status: ${response.status} | Response; ${response}`);
            return {
                success: response.status === 200 ? true : false,
                status: response.status,
                buffer,
            };
        } catch (ex) {
            console.log(`Url: ${url}`);
            console.log(`function getBuffer got an error: ${ex}`);
            return {
                success: false,
            };
        }
    }

    /**
     * Translates the provided content to the provided language code
     * @param {string} content
     * @param {string} outputCode
     */
    static async translate(content, outputCode) {
        try {
            const { text, raw } = await gTranslate(content, { to: outputCode });
            return {
                input: raw.src,
                output: text,
                inputCode: raw.src,
                outputCode,
                inputLang: ISO6391.getName(raw.src),
                outputLang: ISO6391.getName(outputCode),
            };
        } catch (ex) {
            console.log(`translate error: ${ex}`);
            console.log(`Content - ${content} OutputCode: ${outputCode}`);
        }
    }

    /**
     * Posts the provided content to the BIN
     * @param {string} content
     * @param {string} title
     */
    static async postToBin(content, title) {
        try {
            const response = await sourcebin.create(
                [
                    {
                        name: ' ',
                        content,
                        languageId: 'text',
                    },
                ],
                {
                    title,
                    description: ' ',
                },
            );
            return {
                url: response.url,
                short: response.short,
                raw: `https://cdn.sourceb.in/bins/${response.key}/0`,
            };
        } catch (ex) {
            console.log(`postToBin error: ${ex}`);
            console.log(`Content - ${content} Title: ${title}`);
        }
    }
};
