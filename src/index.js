const discord = require('discord.js');
var client = new discord.Client();
const token = "your-token-goes-here";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// command used to call bot in server
const prefix = "!h ";

// discord api reads discord message
client.on("message", (message) => {
  if(message.author.bot) return;
  
  if (message.content.startsWith (prefix + "meme")) {
    // Change 6 to however many images there are within the folder
    let imageNumber = Math.floor(Math.random()* 13) +1
    // displays image at random
        message.channel.send ( {files: ["../memes/" + imageNumber + ".png"]} )
      }
});
// server connects to discord api using token
client.login(token);
