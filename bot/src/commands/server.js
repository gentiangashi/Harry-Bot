const Discord = require(`discord.js`);
const { config } = require(`../index.js`);

module.exports = {
    name: `server`,
    description: `Displays server name + total members`,
    usage: null,
    cooldown: null,
    aliases: [`server`]
}

module.exports.run = async(client, message, args) => {
	// Displays server name + total members
	if(message.content.startsWith(config.prefix + "server")) {
		try {
		message.channel.send("**Server Name:** " + message.guild.name + "\n**Total Members:** " + message.guild.memberCount);
		} 
		catch (e) {
		console.error(e);
		message.channel.send ("**ERROR:** You need to use that command in a server.")
		}
	}
}