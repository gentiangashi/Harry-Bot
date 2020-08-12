const discord = require('discord.js');
var client = new discord.Client();
const token = "your-token-goes-here";
// command used to call bot in server
const prefix = "h!";
// discord api reads discord message
client.on("message", (message) => {
  if(message.author.bot) return;
  // Chooses image at random
  if (message.content.startsWith (prefix + "meme")) {
    let imageNumber = Math.floor(Math.random()* 6) +1
        message.channel.send ( {files: ["../memes/" + imageNumber + ".png"]} )
      }
});
// server connects to discord api using token
client.login(token);
