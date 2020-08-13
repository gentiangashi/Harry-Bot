const discord = require('discord.js');
var client = new discord.Client();
require('dotenv-flow').config()
Images = 13; // Change number to however many images there are within the folder

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
  
  if (message.content.startsWith (config.prefix + "meme")) {
    let imageNumber = Math.floor(Math.random()* Images) +1
    // displays image at random
        message.channel.send ( {files: ["../memes/" + imageNumber + ".png"]} )
      }
});
// server connects to discord api using token
client.login(config.token);