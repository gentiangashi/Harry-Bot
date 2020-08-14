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
		message.channel.send("**!h help** - Displays list of commands\n**!h meme** - Uploads random meme\n**!h ping** - Displays latency\n**!h server** - Displays server name and total server members");
	}

	// Displays random image
	if (message.content.startsWith (config.prefix + "meme")) {
	let imageNumber = Math.floor(Math.random()* numberOfImages) +1
		message.channel.send ( {files: ["../memes/" + imageNumber + ".png"]} )
	}

	// Displays latency in chat
	if(message.content.startsWith(config.prefix + "ping")) {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
	}

	// Displays server name + total members
	if(message.content.startsWith(config.prefix + "server")) {
		message.channel.send("Server name: N/A\nTotal Members: N/A");
	}
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);	
