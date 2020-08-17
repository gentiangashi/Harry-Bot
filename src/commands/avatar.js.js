const Discord = require(`discord.js`);
const { config } = require(`../index.js`);

module.exports = {
    name: `avatar`,
    description: `Displays user avatar`,
    usage: `<mention|id>`,
    cooldown: null,
    aliases: [`avatar`]
}

module.exports.run = async(client, message, args) => {
	// Send the @user's avatar
	if (message.content.startsWith(config.prefix + "avatar")) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new Discord.MessageEmbed()
			.setColor(0x0099ff)
			.setAuthor(user.username)
			.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }));
		message.channel.send(avatarEmbed);
	}
}
