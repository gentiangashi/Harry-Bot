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
  console.log(`Logged in as ${client.user.tag}!`);
});

// Discord API reads discord message
client.on("message", (message) => {
  if(message.author.bot) return;
  
  // Displays latency in chat
  if (message.content.startsWith(config.prefix + "ping")) {
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.sendMessage("Your ping is `" + `${ping}` + " ms`");
      }
  
   // displays image at random
  if (message.content.startsWith (config.prefix + "meme")) {
    let imageNumber = Math.floor(Math.random()* numberOfImages) +1
        message.channel.send ( {files: ["../memes/" + imageNumber + ".png"]} )
      }
});
// server connects to discord api using token
client.login(config.token);
