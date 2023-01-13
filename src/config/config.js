const dotenv = require(`dotenv`).config();

var config = {
    colors: {
        green: 0x00ff00,
        yellow: 0xffa500,
        blue: 0x0099ff,
        red: 0xff0000
    },
    developer: `Unbound`,
    developerTag: `9777`,
    developerIDs: [`187706072822317056`],
    hostname: `gateway.discord.gg`,
    prefix: `!h `,
    token: process.env.DISCORD_BOT_TOKEN,
    version: `0.0.1`,
    footer: `© Harry Bot 2020`
}

config.footer += ` | v${config.version}`;
module.exports = config;
