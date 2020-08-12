const commando = require('discord.js-commando');
const bot = new commando.Client();
const prefix = "!h";

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {

    if(message.content == 'ping') {
       message.channel.send('pong!');
    }
});
// Chooses image at random
if (message.content.startsWith (prefix + "random image")) {
 let imageNumber = Math.floor(Math.random()* 6) +1
     message.channel.send ( {files: ["./memes/" + imageNumber + ".png"]} )
   }

bot.on('message', (message) => {
  if(message.content == '!h memes') {
   var number = 3;
      var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
    switch (random) {
      case 1: message.channel.send ('./memes/4ckyeah.jpg'); break;
      case 2: message.channel.send ('./memes/2deep 4 u.jpg'); break;
      case 3: message.channel.send ('./memes/1365390360568.png'); break;
     
bot.login('NzQzMTIxNTc4Mzg4MjI2MTY5.XzQD5g.mSlN-k-HjJCWwMVDcZQNKQ-IkuI');
