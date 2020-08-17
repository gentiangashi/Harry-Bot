const Discord = require(`discord.js`);
const { config } = require(`../index.js`);

module.exports = {
    name: `ping`,
    description: `Displays bot latency`,
    usage: null,
    cooldown: null,
    aliases: [`ping`]
}

module.exports.run = async(client, message, args) => {
	// Displays latency in chat
	if(message.content.startsWith(config.prefix + "ping")) {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
	}
}