const discord = require('discord.js'); // Import the discord.js module
var client = new discord.Client(); // Create an instance of a Discord client
require('dotenv-flow').config() // Import the dotenv-flow module
var numberOfImages = 14; // Change number to however many images there are within the memes folder

// Config object
const config = {
	token: process.env.TOKEN,
	owner: process.env.OWNER,
	prefix: process.env.PREFIX
};

// Displays in command line when successfully connected
client.on('ready', () => {
	client.user.setStatus("online")
	client.user.setActivity("!h help");
	console.log(`Logged in as ${client.user.tag}!`);
});

// Discord API reads discord message
client.on("message", (message) => {
	if(message.author.bot) return;

	// Displays commands
 	if (message.content.startsWith(config.prefix + "help")) {
		const helpEmbed = new discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle("Harry's Command Guide:")
		.setThumbnail('https://i.imgur.com/PrTsFaf.png')
		.addFields(
			{ name: '!h help', value: 'Displays list of commands' },
			{ name: '!h meme', value: 'Uploads random meme' },
			{ name: '!h avatar', value: 'Displays @users avatar' },
			{ name: '!h ping', value: 'Displays bot latency' },
			{ name: '!h server', value: 'Displays server name + total members' }
		)
		.setTimestamp()
		.setFooter('Made by Unbound#5588', 'https://i.imgur.com/wSTFkRM.png');

		message.channel.send(helpEmbed);
	}

	// Displays random image
	if (message.content.startsWith (config.prefix + "meme")) {
	let imageNumber = Math.floor(Math.random()* numberOfImages) +1
		message.channel.send ( {files: ["memes/" + imageNumber + ".png"]} )
	}

	// Displays latency in chat
	if(message.content.startsWith(config.prefix + "ping")) {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
	}

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

	// Send the @user's avatar
	if (message.content.startsWith(config.prefix + "avatar")) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor(user.username)
			.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }));
		message.channel.send(avatarEmbed);
	}
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);
