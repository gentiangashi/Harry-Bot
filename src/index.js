const discord = require('discord.js');
var client = new discord.Client();
require('dotenv-flow').config()
var numberOfImages = 13; // Change number to however many images there are within the memes folder

// Config object
const config = {
	token: process.env.TOKEN,
	owner: process.env.OWNER,
	prefix: process.env.PREFIX
};

// Displays in command line when successfully connected
client.on('ready', () => {
	client.user.setStatus("online");
	console.log(`Logged in as ${client.user.tag}!`);
});

// Discord API reads discord message
client.on("message", (message) => {
	if(message.author.bot) return;
  
	// Displays commands
	if(message.content.startsWith(config.prefix + "help")) {
		message.channel.send("**!h help** - Displays list of commands\n**!h meme** - Uploads random meme\n**!h ping** - Displays latency\n**!h server** - Displays server name and total server members");
	}	

	// displays random image
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
// server connects to Discord API using token
client.login(config.token);
