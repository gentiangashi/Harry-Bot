const discord = require('discord.js'); // Import the discord.js module
var client = new discord.Client(); // Create an instance of a Discord client
require('dotenv-flow').config() // Import the dotenv-flow module
var numberOfImages = 13; // Change number to however many images there are within the memes folder

// Config object
const config = {
	token: process.env.TOKEN,
	owner: process.env.OWNER,
	prefix: process.env.PREFIX
};

// Displays in command line when successfully connected
client.on('ready', () => {
	client.user.setStatus("online")
	client.user.setActivity("info: !h help");
	console.log(`Logged in as ${client.user.tag}!`);
});

// Discord API reads discord message
client.on("message", (message) => {
	if(message.author.bot) return;

	// Displays commands
	if(message.content.startsWith(config.prefix + "help")) {
		message.channel.send("\n*Important:*\n**!h help** - Displays list of commands\n\n*Fun:*\n**!h meme** - Uploads random meme\n**!h avatar** - Displays user's avatar URL\n\n*Statistics:*\n**!h ping** - Displays latency\n**!h server** - Displays server name and total server members");
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
		message.channel.send ("ERROR: You need to use that command in a server")
		}
	}

	// Send the user's avatar URL
	if(message.content.startsWith(config.prefix + "avatar")) {
		message.channel.send(message.author.displayAvatarURL());
	}
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);
